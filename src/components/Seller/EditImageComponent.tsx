import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalFooter, Button, ModalBody } from "@nextui-org/react";
import ImageCropper, { CroppedAreaPixels } from './ImageCropper';
import getCroppedImg from '../../utils/getCropper';

interface ImageModalProps {
    imageSrc: string | null;
    isOpen: boolean;
    onClose: () => void;
    onCropped: (image: string | null) => void; 
}

const ImageEditModal: React.FC<ImageModalProps> = ({ imageSrc, isOpen, onClose, onCropped }) => {
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [isCropping, setIsCropping] = useState(false);

    const handleCropComplete = (croppedArea: CroppedAreaPixels) => {
        setCroppedAreaPixels(croppedArea);
    };

    const handleCropChange = (croppedImage: string | null) => {
        setCroppedImage(croppedImage);
    };

    const handleConfirmCrop = async () => {
        if (croppedAreaPixels && imageSrc) {
            try {
                const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels); 
                setCroppedImage(croppedImg);
                onCropped(croppedImg); // Pass the cropped image to the parent
                setCroppedAreaPixels(null); // Reset cropped area
                setIsCropping(false); // Exit cropping mode
            } catch (error) {
                console.error("Error cropping the image: ", error);
            }
        }
    };

    const handleCropImage = () => {
        setCroppedImage(null); // Reset cropped image for new cropping session
        setIsCropping(true); // Enter cropping mode
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent style={{ maxWidth: '600px', maxHeight: '80%', width: '100%', height: '80%' }}>
                <ModalHeader className="flex flex-col gap-1">Image Preview</ModalHeader>
                <ModalBody style={{ overflowY: 'auto' }} className="flex justify-center items-center w-full">
                    {isCropping && imageSrc ? (
                        <ImageCropper
                            image={imageSrc}
                            onCropComplete={handleCropComplete}
                            onClose={() => setIsCropping(false)}
                            onChange={handleCropChange} 
                        />
                    ) : (
                        croppedImage ? (
                            <img src={croppedImage} alt="Cropped" className="max-w-full max-h-full object-contain" />
                        ) : (
                            imageSrc && <img src={imageSrc} alt="edit" className="max-w-full max-h-full object-contain" />
                        )
                    )}
                </ModalBody>
                <ModalFooter className="flex justify-between">
                    {isCropping ? (
                        <>
                            <Button color="primary" variant="light" onPress={handleConfirmCrop}>
                                Confirm Crop
                            </Button>
                            <Button color="danger" variant="light" onPress={() => setIsCropping(false)}>
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="primary" variant="light" onPress={handleCropImage}>
                                Crop Image
                            </Button>
                            <Button color="secondary" variant="light">
                                Remove Background
                            </Button>
                        </>
                    )}
                    <Button color="danger" variant="light" onPress={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ImageEditModal;
