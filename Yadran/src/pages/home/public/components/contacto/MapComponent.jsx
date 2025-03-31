import React from 'react';
import './styles/MapComponent.css';

const MapComponent = ({ center, zoom, markerTitle }) => {
  // Convertir coordenadas a formato de OpenStreetMap
  const [lat, lon] = center;

  return (
    <div className="map-container-wrapper">
      <iframe
        title={markerTitle}
        width="100%"
        height="450"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.01}%2C${lat - 0.01}%2C${lon + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lon}`}
        className="openstreetmap-iframe"
      ></iframe>
      <div className="map-overlay"></div>
      <div className="map-info-card">
        <h6>{markerTitle}</h6>
        <p>
          Al Final del Paseo de los Turistas, Puntarenas, Costa Rica
        </p>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`}
          target="_blank"
          rel="noopener noreferrer"
          className="directions-link"
        >
          <i className="bi bi-signpost-2 me-1"></i>
          Cómo llegar
        </a>
      </div>
    </div>
  );
};

export default MapComponent;