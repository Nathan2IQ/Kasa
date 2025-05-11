import './Dropdown.scss';
import { useState } from 'react';

function Dropdown({ title, content }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`dropdown ${isOpen ? 'dropdown--open' : ''}`}>
            <div className='dropdown__title' onClick={toggleDropdown}>
                <h2>{title}</h2>
                <i className={`fa-solid fa-chevron-up ${isOpen ? 'rotate' : ''}`}></i>
            </div>
            <div className={`dropdown__content ${isOpen ? 'dropdown--open' : ''}`}>
                {Array.isArray(content) ? (
                    <ul>{content}</ul>
                ) : (
                    <p>{content}</p>
                )}
            </div>
        </div>
    );
}

export default Dropdown;