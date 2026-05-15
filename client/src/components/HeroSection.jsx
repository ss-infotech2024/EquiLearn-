import React from 'react';

const HeroSection = () => {
  return (
    <section className="w-full bg-gray-50 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Side - Content */}
          <div className="w-full lg:w-[50%] flex flex-col gap-6">
            {/* Starburst Icon */}
           

            {/* Title */}
            <div className="mb-4">
                <img 
                  src="hero1.jpeg" 
                  alt="Headline" 
                  className="w-full max-w-[400px] h-auto"
                />
              </div>

            {/* Description */}
            <p 
              className="text-[15px] lg:text-[16px] text-gray-500 leading-relaxed max-w-[480px]"
              style={{ fontFamily: "'Rubik', sans-serif" }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.....
            </p>

            {/* CTA Button */}
            <div className="mt-2">
              <button 
                className="bg-[#BBC7FA] text-[#1a1a2e] px-8 py-3.5 rounded-xl text-[15px] font-bold uppercase tracking-wide hover:bg-[#a8b5f0] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                style={{ fontFamily: "'Rubik', sans-serif" }}
              >
                START LEARNING
              </button>
            </div>
          </div>

          {/* Right Side - Illustration with Images */}
          <div className="w-full lg:w-[50%] flex-shrink-0">
            <div className="relative flex flex-col items-center justify-center">
              
              {/* Headline Image */}
              {/* <div className="mb-4">
                <img 
                  src="headline.png" 
                  alt="Headline" 
                  className="w-full max-w-[200px] h-auto"
                />
              </div> */}

              {/* Main Hero Image */}
              <div className="relative">
                
                
                <img 
                  src="hero2.jpeg" 
                  alt="Start Learning" 
                  className="w-full max-w-[550px] h-auto relative z-10"
                />
              </div>

              {/* Paragraph Image */}
              {/* <div className="mt-4">
                <img 
                  src="paragraph.png" 
                  alt="Paragraph" 
                  className="w-full max-w-[300px] h-auto opacity-60"
                />
              </div> */}

             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

