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
    <header className="sticky top-0 left-0 w-full z-10">
      <nav className="nav container mx-auto px-4 flex items-center justify-between">
        <h1 className="heading text-2xl font-bold py-5">News Pulse</h1>
        
        <ul className={`nav-ul flex flex-col md:flex-row md:items-center gap-6 md:gap-8 ${
          isMobileMenuOpen ? 'active' : ''
        }`}>
          <li>
            <Link 
              className="font-semibold transition-colors" 
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              All News
            </Link>
          </li>
          
          <li className="dropdown-li relative">
            <button
              className="font-semibold flex items-center gap-2 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowCategoryDropdown(!showCategoryDropdown);
                setShowCountryDropdown(false);
              }}
            >
              Top-Headlines
              <FontAwesomeIcon 
                className={`down-arrow-icon ${showCategoryDropdown ? 'down-arrow-icon-active' : ''}`}
                icon={faCircleArrowDown} 
              />
            </button>
            <ul className={`dropdown p-2 ${showCategoryDropdown ? 'show-dropdown' : ''}`}>
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    to={`/top-headlines/${category}`}
                    className="block px-4 py-2 capitalize transition-colors"
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
              className="font-semibold flex items-center gap-2 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowCountryDropdown(!showCountryDropdown);
                setShowCategoryDropdown(false);
              }}
            >
              Country
              <FontAwesomeIcon 
                className={`down-arrow-icon ${showCountryDropdown ? 'down-arrow-icon-active' : ''}`}
                icon={faCircleArrowDown} 
              />
            </button>
            <ul className={`dropdown p-2 ${showCountryDropdown ? 'show-dropdown' : ''}`}>
              {countries.map((country) => (
                <li key={country.iso_2_alpha}>
                  <Link
                    to={`/country/${country.iso_2_alpha}`}
                    className="flex items-center gap-3 px-4 py-2 transition-colors"
                    onClick={() => {
                      setShowCountryDropdown(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <img
                      src={country.png}
                      srcSet={`https://flagcdn.com/32x24/${country.iso_2_alpha}.png 2x`}
                      alt={`${country.countryName} flag`}
                      className="flags"
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

        <div 
          className={`ham-burger ${isMobileMenuOpen ? 'ham-open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;