import React, { useEffect, useRef, useState } from "react";

export default function EditProfileModal({ profile, onClose, onSave }) {
  const [name, setName] = useState(profile.name || "");
  const [profession, setProfession] = useState(profile.profession || "");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(profile.imageSrc || "");

  const modalRef = useRef(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    // Reset modal state when profile changes
    setName(profile.name || "");
    setProfession(profile.profession || "");
    setImagePreview(profile.imageSrc || "");
    setImageFile(null);
  }, [profile]);

  useEffect(() => {
    // Focus first input and handle ESC key to close
    nameInputRef.current?.focus();
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const capitalized = (str) =>
      str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
    onSave(capitalized(name.trim()), capitalized(profession.trim()), imageFile);
  };

  return (
    <dialog
      id="modalOverlay"
      className="modal-overlay"
      ref={modalRef}
      open
      onClick={handleOverlayClick}
    >
      <div className="modal-content">
        <div className="ep-overlayHeader">
          <h3>Edit Profile</h3>
          <button id="closeModalBtn" className="close-btn" onClick={onClose}>
            <span>
              <img src="../src/assets/Icons/Icon_close.svg" alt="close" />
            </span>
          </button>
        </div>

        <form onSubmit={handleSave}>
          <div className="ep-overlayBody">
            <div className="ep-form-group">
              <label htmlFor="userName">Full Name</label>
              <input
                type="text"
                id="userName"
                name="username"
                placeholder="Input full name"
                minLength={8}
                maxLength={54}
                required
                value={name}
                ref={nameInputRef}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="ep-form-group">
              <label htmlFor="professionInput">Profession</label>
              <input
                type="text"
                id="professionInput"
                name="profession"
                placeholder="Input profession"
                minLength={8}
                maxLength={100}
                required
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </div>

            <div className="ep-form-group">
              <label htmlFor="imageInput">Upload Image</label>
              <input
                type="file"
                id="imageInput"
                name="profileImage"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="ep-form-group">
              <label>Image Preview</label>
              {imagePreview && (
                <img
                  id="imagePreview"
                  src={imagePreview}
                  alt="Preview"
                  style={{ display: "block", maxWidth: "80px", marginTop: "10px" }}
                />
              )}
            </div>

            <div className="ep-overlayButton">
              <button type="submit" className="save-changes-btn">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
}
