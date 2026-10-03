import React from 'react';
import './PhotoCard.css';

export default function PhotoCard({ photo }) {
  return (
    <article className="photo-card">
      <img
        src={photo.thumbnailUrl}
        alt={`Photo ${photo.id}`}
        className="photo-card__image"
        loading="lazy"
        onError={(e) => {
          e.target.src = photo.url;
        }}
      />
      <div className="photo-card__content">
        <h3 className="photo-card__title">{photo.title}</h3>
        <div className="photo-card__meta">
          <span className="photo-card__id">ID: {photo.id}</span>
          <span className="photo-card__album">Album: {photo.albumId}</span>
        </div>
      </div>
    </article>
  );
}