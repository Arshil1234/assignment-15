import React, { useState, useEffect } from 'react';
import PhotoCard from './PhotoCard';
import './PhotoGallery.css';

export default function PhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/photos');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const limited = data.slice(0, 100);
      setPhotos(limited);
      setFilteredPhotos(limited);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch photos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    const filtered = photos.filter((photo) =>
      photo.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPhotos(filtered);
  };

  if (loading) {
    return (
      <div className="photo-gallery">
        <div className="photo-gallery__loader" role="status" aria-live="polite">
          <div className="photo-gallery__spinner" />
          <p>Loading photos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="photo-gallery">
        <div className="photo-gallery__error" role="alert">
          <h3>Error Loading Photos</h3>
          <p>{error}</p>
          <button onClick={fetchPhotos}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="photo-gallery">
      <div className="photo-gallery__search">
        <input
          type="search"
          placeholder="Search photos by title..."
          value={query}
          onChange={handleSearch}
          className="photo-gallery__search-input"
          aria-label="Search photos by title"
        />
        <span className="photo-gallery__count">
          Showing {filteredPhotos.length} of {photos.length} photos
        </span>
      </div>
      <div className="photo-gallery__grid">
        {filteredPhotos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
}