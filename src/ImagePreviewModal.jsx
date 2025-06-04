import React from "react";

export default function ImagePreviewModal({ image, onClose }) {
  if (!image.src) return null;

  return (
    <div
      id="imageModal"
      className="modal-overlay"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="modal-inner"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="closeImageModal"
          className="close-btn close-btn__grid"
          onClick={onClose}
          aria-label="Close image preview modal"
        >
          &times;
        </button>

        <div className="modal-img__container">
          <img
            id="modalImage"
            className="modal-img"
            src={image.src}
            alt={image.alt}
          />
        </div>
        <p id="modalCaption" className="modal-caption">
          {image.alt}
        </p>
      </div>
    </div>
  );
}
