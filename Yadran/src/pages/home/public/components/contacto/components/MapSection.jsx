import React from 'react';
import MapComponent from '../MapComponent';

const MapSection = () => {
    return (
        <div className="map-container mb-5 animate-on-scroll fade-in-up">
            <MapComponent
                center={[9.97563816077454, -84.84938567754479]} // Coordenadas de Puntarenas, Costa Rica
                zoom={18} // Aumenta el zoom
                markerTitle="Hotel Yadran"
            />
        </div>
    );
};

export default MapSection;