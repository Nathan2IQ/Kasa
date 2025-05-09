import { useState } from 'react';
import './Slider.scss';

function Slider({ img }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? img.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === img.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="slider">
            <img src={img[currentIndex]} alt={`Photo ${currentIndex + 1} du logement`} />
            {img.length > 1 && (
                <>
                    <i className="fa-solid fa-chevron-left" onClick={handlePrev}></i>
                    <i className="fa-solid fa-chevron-right" onClick={handleNext}></i>
                </>
            )}
            <div className="slider-counter">
                {currentIndex + 1} / {img.length}
            </div>
        </div>
    );
}

export default Slider;