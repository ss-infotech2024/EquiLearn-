import React, { useState } from 'react';

const CategoriesSection = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const categories = [
    {
      id: 1,
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#525FE1]" fill="currentColor" stroke="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      title: 'Job Ready Skills',
      courses: '38 Courses',
      active: false,
    },
    {
      id: 2,
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#525FE1]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
          <path d="M6 8h.01"/>
          <path d="M10 8h.01"/>
          <path d="M14 8h.01"/>
          <path d="M18 8h.01"/>
          <path d="M8 12h8"/>
        </svg>
      ),
      title: 'Designing',
      courses: '38 Courses',
      active: false,
    },
    {
      id: 3,
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#525FE1]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
      title: 'Development',
      courses: '38 Courses',
      active: false,
    },
    {
      id: 4,
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#525FE1]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          <path d="M2 12h5"/>
          <path d="M17 12h5"/>
        </svg>
      ),
      title: 'Programing',
      courses: '38 Courses',
      active: false,
    },
  ];

  return (
    <section className="w-full bg-white py-16 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <h2 
              className="text-[32px] lg:text-[40px] font-bold text-[#1a1a2e] mb-2"
              style={{ fontFamily: "'Rubik', sans-serif" }}
            >
              Top Categories
            </h2>
            <p 
              className="text-[16px] text-gray-500"
              style={{ fontFamily: "'Rubik', sans-serif" }}
            >
              Explore our Popular Categories
            </p>
          </div>
          
          {/* All Categories Button */}
          <button 
            className="px-6 py-2.5 border-2 border-gray-300 rounded-full text-[15px] font-medium text-gray-700 hover:border-[#525FE1] hover:text-[#525FE1] hover:shadow-md transition-all duration-300"
            style={{ fontFamily: "'Rubik', sans-serif" }}
          >
            All Categories
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const isHovered = hoveredId === category.id;
            
            return (
              <div
                key={category.id}
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`flex flex-col items-center justify-center gap-7 
  rounded-[20px] border border-gray-100 p-8 
  cursor-pointer transition-all duration-300 h-60 
  shadow-[inset_1px_0_0px_0px_rgba(0,0,0,0.1),inset_-1px_0_0px_-0px_rgba(0,0,0,0.1),inset_0_5px_8px_-5px_rgba(0,0,0,0.8)]
${
                  // Base active state
                  category.active && !isHovered
                    ? 'bg-[#f5f7ff] border-[#525FE1]shadow-[inset_0_5px_8px_-5px_rgba(0,0,0,0.8)]' 
                    : 'bg-white border-gray-200'
                } ${
                  // Hover state (applies to ALL cards including active)
                  isHovered
                    ? 'border-[#525FE1] -translate-y-2 sm-10 p-6 bg-white rounded-[20px]  transition-all duration-300 ease-in-out hover:shadow-[0_15px_15px_-10px_rgba(0,0,0,0.3),-1px_0_6px_-4px_rgba(0,0,0,0.1),1px_0_8px_-4px_rgba(0,0,0,0.1),inset_0_5px_8px_-5px_rgba(0,0,0,0.8)]'
                    : ''
                }`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  category.active && !isHovered
                    ? 'bg-[#e8eaff]' 
                    : 'bg-[#f8f9ff]'
                } ${
                  isHovered ? 'bg-[#e8eaff]' : ''
                }`}>
                  {category.icon}
                </div>
                
                {/* Title */}
                <h3 
                  className={`text-[18px] font-bold transition-colors duration-300 ${
                    category.active && !isHovered
                      ? 'text-[#525FE1]' 
                      : 'text-[#1a1a2e]'
                  } ${
                    isHovered ? 'text-[#525FE1]' : ''
                  }`}
                  style={{ fontFamily: "'Rubik', sans-serif" }}
                >
                  {category.title}
                </h3>
                
                {/* Courses Count */}
                <p 
                  className="text-[14px] text-gray-500"
                  style={{ fontFamily: "'Rubik', sans-serif" }}
                >
                  {category.courses}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

