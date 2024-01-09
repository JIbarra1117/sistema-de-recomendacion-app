import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ marcas, handleMarcaChange }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const buttonRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleMarcaClick = (marca) => {
        handleMarcaChange(marca);
        closeMenu();
    };

    const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            closeMenu();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={buttonRef}>
            <div>
                <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded={isMenuOpen}
                    aria-haspopup="true"
                    onClick={toggleMenu}
                >
                    Selecciona la marca
                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {isMenuOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-1" role="none">
                        {Array.isArray(marcas) &&
                            marcas.map((marca, index) => (
                                <a
                                    key={index}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => handleMarcaClick(marca)}
                                >
                                    {marca}
                                </a>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
