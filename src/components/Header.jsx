import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import countries from "./Countries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle = ({ theme, onToggle }) => (
  <button
    className="theme-toggle p-2 rounded-full hover:bg-gray-700 transition-colors"
    onClick={onToggle}
    aria-label={`Switch to ${theme === "dark-theme" ? "light" : "dark"} mode`}
  >
    {theme === "dark-theme" ? (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ) : (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )}
  </button>
);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark-theme");

  const dropdownRef = useRef(null);
  
  const categories = useMemo(
    () => ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"],
    []
  );

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light-theme" ? "dark-theme" : "light-theme"));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 left-0 w-full z-10">
      <nav className="nav container mx-auto px-4 flex items-center justify-between">
        <h1 className="heading text-2xl font-bold py-5">News Pulse</h1>

        <ul className={`nav-ul flex flex-col md:flex-row md:items-center gap-6 md:gap-8 ${isMobileMenuOpen ? "active" : ""}`}>
          <li>
            <Link className="font-semibold transition-colors" to="/" onClick={() => setIsMobileMenuOpen(false)}>
              All News
            </Link>
          </li>

          {/* Top-Headlines Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              className="font-semibold flex items-center gap-2 transition-colors"
              aria-expanded={activeDropdown === "category"}
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === "category" ? null : "category");
              }}
            >
              Top-Headlines
              <FontAwesomeIcon className={`down-arrow-icon ${activeDropdown === "category" ? "down-arrow-icon-active" : ""}`} icon={faCircleArrowDown} />
            </button>
            {activeDropdown === "category" && (
              <ul className="dropdown p-2">
                {categories.map(category => (
                  <li key={category}>
                    <Link
                      to={`/top-headlines/${category}`}
                      className="block px-4 py-2 capitalize transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Country Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              className="font-semibold flex items-center gap-2 transition-colors"
              aria-expanded={activeDropdown === "country"}
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === "country" ? null : "country");
              }}
            >
              Country
              <FontAwesomeIcon className={`down-arrow-icon ${activeDropdown === "country" ? "down-arrow-icon-active" : ""}`} icon={faCircleArrowDown} />
            </button>
            {activeDropdown === "country" && (
              <ul className="dropdown p-2">
                {countries.map(country => (
                  <li key={country.iso_2_alpha}>
                    <Link
                      to={`/country/${country.iso_2_alpha}`}
                      className="flex items-center gap-3 px-4 py-2 transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <img srcSet={`https://flagcdn.com/32x24/${country.iso_2_alpha}.png 2x`} alt={`${country.countryName} flag`} className="flags" />
                      <span>{country.countryName}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Theme Toggle */}
          <li>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </li>
        </ul>

        {/* Hamburger Menu */}
        <div
          className={`ham-burger ${isMobileMenuOpen ? "ham-open" : ""}`}
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
