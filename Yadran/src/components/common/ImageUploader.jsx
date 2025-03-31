import React, { useState, useRef } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { X, Upload } from 'react-bootstrap-icons';
import './styles/ImageUploader.css';

const ImageUploader = ({ imagenes = [], onChange, multiple = false }) => {
    const fileInputRef = useRef(null);
    const [arrastrando, setArrastrando] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setArrastrando(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setArrastrando(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!arrastrando) {
            setArrastrando(true);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setArrastrando(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    };

    const handleFiles = (files) => {
        const fileList = Array.from(files);

        // Filtrar solo archivos de imagen
        const imageFiles = fileList.filter(file => file.type.startsWith('image/'));

        if (imageFiles.length === 0) return;

        const nuevasImagenes = [...imagenes];

        imageFiles.forEach(file => {
            const reader = new FileReader();

            reader.onload = (e) => {
                // Si no es múltiple, reemplazamos las imágenes
                if (!multiple) {
                    onChange([e.target.result]);
                } else {
                    // Si es múltiple, agregamos a las existentes
                    nuevasImagenes.push(e.target.result);
                    onChange([...nuevasImagenes]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    const eliminarImagen = (index) => {
        const nuevasImagenes = [...imagenes];
        nuevasImagenes.splice(index, 1);
        onChange(nuevasImagenes);
    };

    return (
        <div className="image-uploader">
            <div
                className={`upload-dropzone ${arrastrando ? 'dragging' : ''}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple={multiple}
                    style={{ display: 'none' }}
                />
                <div className="text-center">
                    <Upload size={32} className="upload-icon" />
                    <p className="upload-text mb-0">
                        {arrastrando
                            ? 'Suelte las imágenes aquí'
                            : 'Haga clic o arrastre para subir imágenes'}
                    </p>
                </div>
            </div>

            {imagenes.length > 0 && (
                <div className="uploaded-images mt-3">
                    <Row xs={2} sm={3} md={4} lg={6} className="g-2">
                        {imagenes.map((src, index) => (
                            <Col key={index}>
                                <Card className="image-card">
                                    <div className="image-container">
                                        <Card.Img variant="top" src={src} alt={`Imagen ${index + 1}`} />
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="delete-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                eliminarImagen(index);
                                            }}
                                        >
                                            <X size={16} />
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
