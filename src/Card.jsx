import React, { useState } from "react";

export default function Card({ card, onImageClick }) {
  const [liked, setLiked] = useState(false); // Local like state

  const handleToggleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <div className="each-card">
      <div className="cardImg-div">
        <img
          src={card.image}
          alt={card.title}
          className="card-img"
          onClick={onImageClick}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="text-icon">
        <p>{card.title}</p>
        <svg
          className={`heart-icon ${liked ? "liked" : "like"}`}
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="30"
          fill={liked ? "red" : "gray"}
          viewBox="0 0 256 256"
          onClick={handleToggleLike}
          style={{ cursor: "pointer" }}
        >
          <path d="M223,57a58.07,58.07,0,0,0-81.92-.1L128,69.05,114.91,56.86A58,58,0,0,0,33,139l89.35,90.66a8,8,0,0,0,11.4,0L223,139a58,58,0,0,0,0-82Zm-11.35,70.76L128,212.6,44.3,127.68a42,42,0,0,1,59.4-59.4l.2.2,18.65,17.35a8,8,0,0,0,10.9,0L152.1,68.48l.2-.2a42,42,0,1,1,59.36,59.44Z" />
        </svg>
      </div>
    </div>
  );
}
