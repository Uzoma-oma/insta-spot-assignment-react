import React, { useState, useEffect } from "react";
import CardList from "./CardList";
import NewPostModal from "./NewPostModal";
import EditProfileModal from "./EditProfileModal";
import ImagePreviewModal from "./ImagePreviewModal";
import ProfileHeader from "./ProfileHeader";

import logo from "./assets/Logo/Logo.svg";
import add from "./assets/Icons/Icon_add.svg";

import avatar from "./assets/images/Avatar.png";
import { initialCards } from "./data";

export default function App() {
  const [cards, setCards] = useState(initialCards);
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState({ src: "", alt: "" });
  const [profile, setProfile] = useState({
    name: "Bessie Coleman",
    profession: "Civil Aviator",
    imageSrc: avatar,
  });

  const toggleLike = (index) => {
    setCards((prevCards) => {
      const updated = [...prevCards];
      updated[index].liked = !updated[index].liked;
      return updated;
    });
  };

  const openImagePreview = (src, alt) => {
    setPreviewImage({ src, alt });
    setIsImagePreviewOpen(true);
  };

  const closeImagePreview = () => setIsImagePreviewOpen(false);

  const addNewCard = (title, file) => {
    if (!title || !file) return;
    const imgUrl = URL.createObjectURL(file);
    const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
    setCards((prev) => [
      ...prev,
      { image: imgUrl, title: capitalizedTitle, liked: false },
    ]);
    setIsNewPostOpen(false);
  };

  const updateProfile = (newName, newProfession, newImageFile) => {
    const toTitleCase = (str) =>
      str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );

    setProfile((prev) => ({
      name: newName ? toTitleCase(newName) : prev.name,
      profession: newProfession ? toTitleCase(newProfession) : prev.profession,
      imageSrc: newImageFile
        ? URL.createObjectURL(newImageFile)
        : prev.imageSrc,
    }));
    setIsEditProfileOpen(false);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsNewPostOpen(false);
        setIsEditProfileOpen(false);
        setIsImagePreviewOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="app-container">
      <header>
        <nav className="navbar">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </nav>
      </header>

      <main className="container">
        <section className="hero-section">
          <figure className="avatar-container">
            <div className="avatar__img-container">
              <img
                id="profileImage"
                className="avatar"
                src={profile.imageSrc}
                alt="avatar"
              />
            </div>
            <figcaption className="avatar-info">
              <div className="avatar-text">
                <h2 className="truncate" id="profileName">
                  {profile.name}
                </h2>
                <p className="truncate" id="profileProfession">
                  {profile.profession}
                </p>
              </div>
              <button
                className="edit-profile-btn"
                onClick={() => setIsEditProfileOpen(true)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 18 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: "6px" }}
                >
                  <rect
                    x="13.0676"
                    y="4.5451"
                    width="11.6506"
                    height="3.21396"
                    transform="rotate(135 13.0676 4.5451)"
                    fill="#212121"
                  />
                  <path
                    d="M14.2036 1.13628C14.8312 1.76384 14.8312 2.78132 14.2036 3.40889L13.6354 3.97704L11.3628 1.70443L11.931 1.13628C12.5586 0.508714 13.576 0.508714 14.2036 1.13628Z"
                    fill="#212121"
                  />
                  <path
                    d="M1.54021 13.1538L2.55674 10.5108L4.82935 12.7834L2.18637 13.8C1.782 13.9555 1.38468 13.5582 1.54021 13.1538Z"
                    fill="#212121"
                  />
                </svg>
                Edit Profile
              </button>
            </figcaption>
          </figure>

          <button
            id="newPostBtn"
            className="newPostBtn"
            onClick={() => setIsNewPostOpen(true)}
          >
            <span>
              <img src={add} alt="add" />
            </span>
            <span>New Post</span>
          </button>
        </section>

        <hr className="hero-divider" />

        <CardList
          cards={cards}
          onToggleLike={toggleLike}
          onImageClick={openImagePreview}
        />

        {isNewPostOpen && (
          <NewPostModal
            onClose={() => setIsNewPostOpen(false)}
            onAddPost={addNewCard}
          />
        )}

        {isEditProfileOpen && (
          <EditProfileModal
            profile={profile}
            onClose={() => setIsEditProfileOpen(false)}
            onSave={updateProfile}
          />
        )}

        {isImagePreviewOpen && (
          <ImagePreviewModal image={previewImage} onClose={closeImagePreview} />
        )}
      </main>

      <div className="container">
        <hr className="hero-divider" />
      </div>

      <footer className="site-footer">2023 &copy; Spots</footer>
    </div>
  );
}
