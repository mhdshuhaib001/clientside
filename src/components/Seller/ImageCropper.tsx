import React, { useEffect, useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

export type CroppedAreaPixels = {
    width: number;
    height: number;
    x: number;
    y: number;
};

type ImageCropperProps = {
    image: string;
    onCropComplete: (croppedAreaPixels: CroppedAreaPixels) => void;
    onClose: () => void;
    onChange: (croppedImage: string | null) => void; 
};

const ImageCropper: React.FC<ImageCropperProps> = ({ image, onCropComplete, onClose, onChange }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    // Reset crop state when image changes
    useEffect(() => {
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
        setCroppedImage(null);
    }, [image]);

    const handleCropComplete = useCallback(( croppedAreaPixels: CroppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
        onCropComplete(croppedAreaPixels);
    }, [onCropComplete]);

    const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newZoom = parseFloat(event.target.value);
        setZoom(newZoom);
    };

    const getCroppedImage = async () => {
        if (!croppedAreaPixels) return;

        const canvas = document.createElement('canvas');
        const imageElement = document.createElement('img');
        imageElement.src = image;
        await new Promise((resolve) => {
            imageElement.onload = resolve;
        });

        const { x, y, width, height } = croppedAreaPixels;
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(imageElement, x, y, width, height, 0, 0, width, height);
        const croppedImage = canvas.toDataURL();
        setCroppedImage(croppedImage);
        onChange(croppedImage); // Pass cropped image to parent
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px', backgroundColor: 'black' }}>
            <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                onCropChange={setCrop}
                onCropComplete={handleCropComplete}
                onZoomChange={setZoom}
                style={{
                    containerStyle: {
                        width: '100%',
                        height: '80%',
                        backgroundColor: '#fff',
                    },
                }}
                cropShape="rect"
                showGrid={false}
            />
            <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '5px', zIndex: 10 }}>
                <label>
                    Zoom:
                    <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={handleZoomChange}
                    />
                </label>
            </div>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={onClose} style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>Close</button>
                <button onClick={getCroppedImage} style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Crop</button>
            </div>
            {croppedImage && (
                <div style={{ marginTop: '5px' }}>
                    <h4>Cropped Image Preview:</h4>
                    <img src={croppedImage} alt="Cropped" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            )}
        </div>
    );
};

export default ImageCropper;
