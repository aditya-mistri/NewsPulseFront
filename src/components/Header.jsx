import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import countries from "./Countries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';

const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button
      className="theme-toggle p-2 rounded-full hover:bg-gray-700 transition-colors"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'dark-theme' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark-theme' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark-theme');

  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
    "politics"
  ];

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light-theme" ? "dark-theme" : "light-theme");
  };

  const closeAllDropdowns = () => {
    setShowCountryDropdown(false);
    setShowCategoryDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-li')) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 left-0 w-full z-10 bg-white dark:bg-gray-900">
      <nav className="nav container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="heading text-2xl font-bold">News Pulse</h1>
          
          {/* Hamburger menu - now visible on mobile */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-around">
              <span className={`h-0.5 w-full bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-full bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 w-full bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
          
          {/* Navigation menu */}
          <div className={`
            absolute top-16 left-0 right-0 
            md:relative md:top-0 
            bg-white dark:bg-gray-900 
            md:flex md:items-center
            transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? 'block' : 'hidden md:block'}
            shadow-lg md:shadow-none
          `}>
            <ul className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 p-4 md:p-0">
              <li>
                <Link 
                  className="block py-2 px-4 md:px-0 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md md:hover:bg-transparent" 
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All News
                </Link>
              </li>
              
              <li className="dropdown-li relative">
                <button
                  className="w-full text-left py-2 px-4 md:px-0 font-semibold flex items-center justify-between md:justify-start gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md md:hover:bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCategoryDropdown(!showCategoryDropdown);
                    setShowCountryDropdown(false);
                  }}
                >
                  Top-Headlines
                  <FontAwesomeIcon 
                    className={`transition-transform duration-200 ${showCategoryDropdown ? 'rotate-180' : ''}`}
                    icon={faCircleArrowDown} 
                  />
                </button>
                <ul className={`
                  dropdown 
                  absolute left-0 md:left-auto 
                  w-full md:w-48 
                  mt-1 
                  bg-white dark:bg-gray-900 
                  shadow-lg 
                  rounded-md 
                  overflow-hidden
                  transition-all duration-200 ease-in-out
                  ${showCategoryDropdown ? 'opacity-100 visible' : 'opacity-0 invisible'}
                `}>
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        to={`/top-headlines/${category}`}
                        className="block px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => {
                          setShowCategoryDropdown(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              
              <li className="dropdown-li relative">
                <button
                  className="w-full text-left py-2 px-4 md:px-0 font-semibold flex items-center justify-between md:justify-start gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md md:hover:bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCountryDropdown(!showCountryDropdown);
                    setShowCategoryDropdown(false);
                  }}
                >
                  Country
                  <FontAwesomeIcon 
                    className={`transition-transform duration-200 ${showCountryDropdown ? 'rotate-180' : ''}`}
                    icon={faCircleArrowDown} 
                  />
                </button>
                <ul className={`
                  dropdown 
                  absolute left-0 md:left-auto 
                  w-full md:w-64 
                  mt-1 
                  bg-white dark:bg-gray-900 
                  shadow-lg 
                  rounded-md 
                  overflow-hidden
                  max-h-96 overflow-y-auto
                  transition-all duration-200 ease-in-out
                  ${showCountryDropdown ? 'opacity-100 visible' : 'opacity-0 invisible'}
                `}>
                  {countries.map((country) => (
                    <li key={country.iso_2_alpha}>
                      <Link
                        to={`/country/${country.iso_2_alpha}`}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => {
                          setShowCountryDropdown(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <img
                          src={country.png}
                          srcSet={`https://flagcdn.com/32x24/${country.iso_2_alpha}.png 2x`}
                          alt={`${country.countryName} flag`}
                          className="w-6 h-4 object-cover"
                        />
                        <span>{country.countryName}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              
              <li>
                <ThemeToggle theme={theme} onToggle={toggleTheme} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;