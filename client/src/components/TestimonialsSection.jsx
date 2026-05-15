import React, { useState, useRef, useEffect } from 'react';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      quote: '"Teachings of the great explore of truth, the master-builder of human happiness. no one rejects,dislikes, or avoids pleasure itself, pleasure itself"',
      name: 'Finlay Kirk',
      role: 'Web Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 2,
      quote: '"Complete account of the system and expound the actual Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots"',
      name: 'Dannette P. Cervantes',
      role: 'Web Design',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 3,
      quote: '"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour"',
      name: 'Clara R. Altman',
      role: 'UI&UX Design',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 4,
      quote: '"The platform provides excellent resources and the instructors are very knowledgeable. I learned so much in just a few weeks."',
      name: 'Marcus Chen',
      role: 'Frontend Developer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 5,
      quote: '"Best learning experience I\'ve ever had. The courses are well-structured and the community support is amazing."',
      name: 'Sarah Johnson',
      role: 'Product Designer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    },
  ];

  // Handle scroll to update active dot
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.85; // Approximate card width + gap
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, testimonials.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [testimonials.length]);

  // Scroll to specific card when dot clicked
  const scrollToCard = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const cardWidth = container.offsetWidth * 0.85;
    container.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  return (
    <section className="w-full bg-[#f8f9ff] py-16 lg:py-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className="text-[32px] lg:text-[40px] font-bold text-[#1a1a2e] mb-4"
            style={{ fontFamily: "'Rubik', sans-serif" }}
          >
            What Student's Say
          </h2>
          <p 
            className="text-[16px] lg:text-[18px] text-gray-500 max-w-[600px] mx-auto"
            style={{ fontFamily: "'Rubik', sans-serif" }}
          >
            Lorem Ipsum is simply dummy text of the printing.
          </p>
        </div>

        {/* Testimonials Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[32%] snap-start"
            >
              <div 
                className="bg-white rounded-2xl p-8 h-full shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100"
              >
                {/* Quote */}
                <p 
                  className="text-[15px] lg:text-[16px] text-[#1a1a2e] leading-[1.8] mb-8"
                  style={{ fontFamily: "'Rubik', sans-serif" }}
                >
                  {testimonial.quote}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <h4 
                      className="text-[16px] font-semibold text-[#1a1a2e]"
                      style={{ fontFamily: "'Rubik', sans-serif" }}
                    >
                      {testimonial.name}
                    </h4>
                    <p 
                      className="text-[14px] text-gray-500"
                      style={{ fontFamily: "'Rubik', sans-serif" }}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot Navigation */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-[#525FE1] w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;

