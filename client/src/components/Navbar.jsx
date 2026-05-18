import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpeg'; 
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', href: '/', active: location.pathname === '/' },
    { label: 'My Learnings', href: '/my-learnings', active: location.pathname === '/my-learnings' },
    { label: 'Courses', href: '/courses', active: location.pathname === '/courses' },
    { label: 'Talent Pool', href: '/talent-pool', active: location.pathname === '/talent-pool' },
    { label: 'Contact Us', href: '/contact', active: location.pathname === '/contact' },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline">
            <img src={logo} alt="EquiLearn Logo" className="w-full h-7" />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center gap-10 list-none">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.href}
                  className={`no-underline text-base transition-colors duration-300 hover:text-[#525FE1] ${
                    link.active 
                      ? 'font-bold text-[#525FE1]' 
                      : 'font-normal text-[#1a1a2e]'
                  }`}
                  style={{ fontFamily: "'Rubik', sans-serif" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Language Dropdown */}
            <div 
              className="hidden sm:flex items-center gap-1.5 cursor-pointer text-sm font-medium text-[#1a1a2e] px-2.5 py-1.5 rounded-md hover:bg-gray-50 transition-colors duration-300 select-none relative"
              style={{ fontFamily: "'Rubik', sans-serif" }}
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <span>Eng</span>
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="w-3 h-3 transition-transform duration-300"
                style={{ transform: isLangOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
              
              {/* Language Dropdown Menu */}
              {isLangOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-[120px] z-50">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors">English</button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors">Spanish</button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors">French</button>
                </div>
              )}
            </div>

            {/* Search Icon */}
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors duration-300 bg-transparent border-none cursor-pointer"
              aria-label="Search"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 stroke-[#1a1a2e] fill-none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* User Icon */}
            <Link 
              to="/profile"
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full hover:bg-gray-50 transition-colors duration-300 bg-transparent border-none cursor-pointer"
              aria-label="User Account"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 stroke-[#1a1a2e] fill-none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
            
            {/* Mobile Hamburger Menu */}
            <button 
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full hover:bg-gray-50 transition-colors duration-300 bg-transparent border-none cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <span 
                className={`block w-5 h-0.5 bg-[#1a1a2e] rounded-sm transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`} 
              />
              <span 
                className={`block w-5 h-0.5 bg-[#1a1a2e] rounded-sm transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`} 
              />
              <span 
                className={`block w-5 h-0.5 bg-[#1a1a2e] rounded-sm transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`} 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-6 pt-2 border-t border-gray-100">
          <ul className="flex flex-col gap-4 list-none">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.href}
                  className={`block no-underline text-base py-2 transition-colors duration-300 hover:text-[#525FE1] ${
                    link.active 
                      ? 'font-bold text-[#525FE1]' 
                      : 'font-normal text-[#1a1a2e]'
                  }`}
                  style={{ fontFamily: "'Rubik', sans-serif" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Mobile Language Selector */}
          <div className="sm:hidden mt-4 pt-4 border-t border-gray-100">
            <div 
              className="flex items-center gap-1.5 cursor-pointer text-sm font-medium text-[#1a1a2e] select-none"
              style={{ fontFamily: "'Rubik', sans-serif" }}
            >
              <span>Eng</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;