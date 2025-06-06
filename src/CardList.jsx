import React from "react";
import Card from "./Card";

export default function CardList({ cards, onToggleLike, onImageClick }) {
  return (
    <div id="card-container" className="card-container">
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          onToggleLike={() => onToggleLike(index)}
          onImageClick={() => onImageClick(card.image, card.title)}
        />
      ))}
    </div>
  );
}
