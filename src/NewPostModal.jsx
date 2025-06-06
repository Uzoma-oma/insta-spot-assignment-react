import React, { useEffect, useRef, useState } from "react";

import close from "./assets/Icons/Icon_close.svg"

export default function NewPostModal() {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const postTitleRef = useRef(null);
  const imageUploadRef = useRef(null);
  const uploadBtnRef = useRef(null);
  const titleErrorRef = useRef(null);
  

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  // Handle modal opening from outside via "newPostBtn" ID
  useEffect(() => {
    const newPostBtn = document.getElementById("newPostBtn");
    const modal = modalRef.current;
    const closeBtn = closeBtnRef.current;

    if (!newPostBtn || !modal || !closeBtn) return;

    newPostBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    const handleOutsideClick = (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      newPostBtn.removeEventListener("click", () => {});
      closeBtn.removeEventListener("click", () => {});
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Validation + Button Toggle
  useEffect(() => {
    const titleInput = title.trim();
    const minLength = parseInt(postTitleRef.current?.minLength || 8, 10);
    const isValid = titleInput.length >= minLength && file;

    if (!titleInput) {
      titleErrorRef.current.textContent = "Title is required.";
    } else if (titleInput.length < minLength) {
      titleErrorRef.current.textContent = `Title must be at least ${minLength} characters.`;
    } else {
      titleErrorRef.current.textContent = "";
    }

    if (uploadBtnRef.current) {
      uploadBtnRef.current.disabled = !isValid;
      uploadBtnRef.current.style.opacity = isValid ? 1 : 0.6;
      uploadBtnRef.current.style.cursor = isValid ? "pointer" : "not-allowed";
    }
  }, [title, file]);

  const handleUpload = (e) => {
    e.preventDefault();

    if (!file || !title.trim()) return;

    const cardHTML = `
      <div class="card">
        <img src="${URL.createObjectURL(file)}" alt="${title}" style="width:100%; border-radius:12px;" />
        <p>${capitalize(title)}</p>
      </div>
    `;

    const container = document.getElementById("card-container");
    if (container) {
      container.insertAdjacentHTML("beforeend", cardHTML);
    }

    setTitle("");
    setFile(null);
    if (imageUploadRef.current) imageUploadRef.current.value = "";
    modalRef.current.style.display = "none";
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <dialog id="newPostModal" className="newPostModal" ref={modalRef}>
      <div className="newPostModal__wrapper">
        <div className="newPostModal-content">
          <div className="overlayHeader">
            <h3>New post</h3>
            <button
              id="newPostcloseBtn"
              className="newPostcloseBtn"
              ref={closeBtnRef}
            >
              <span>
                <img src={close} alt="close" />
              </span>
            </button>
          </div>

          <form onSubmit={handleUpload}>
            <div className="overlayBody">
              <div className="form-group">
                <label htmlFor="postTitle">Post title</label>
                <input
                  type="text"
                  id="postTitle"
                  placeholder="Input title"
                  minLength={8}
                  maxLength={20}
                  required
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  ref={postTitleRef}
                />
                <span
                  id="titleError"
                  className="error-message"
                  ref={titleErrorRef}
                ></span>
              </div>

              <div className="form-group">
                <label htmlFor="uploadImage">Upload Image</label>
                <input
                  type="file"
                  id="imageUpload"
                  ref={imageUploadRef}
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className="overlayButton">
                <button
                  className="upload-btn"
                  type="submit"
                  ref={uploadBtnRef}
                >
                  Upload post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
