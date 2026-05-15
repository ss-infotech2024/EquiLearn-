import React from 'react';

const HowItWorks = () => {

  return (
    <section className="w-full bg-white py-16 lg:py-20 ">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 rounded-2xl shadow-[0_4px_0px_0px_rgba(0,0,0,0.2),2px_2px_0px_0px_rgba(0,0,0,0.05),-2px_2px_0px_0px_rgba(0,0,0,0.05)] border-t border-t-white">

        <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-1">
          
          {/* Left Side - Illustration */}
          <div className="w-full lg:w-[50%] flex-shrink-0 py-10">
            <div className="relative flex justify-center items-center">
              <img 
                src="howitwork1.jpeg" 
                alt="How It Works" 
                className="w-full max-w-[500px] h-auto"
              />
            </div>
          </div>

          {/* Right Side - Steps */}
         <div className="w-full lg:w-[50%] flex-shrink-0 py-10">
            <div className="relative flex justify-center items-center">
              <img 
                src="enroll.jpeg" 
                alt="How It Works" 
                className="w-full max-w-[500px] h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

