import React, { useState } from 'react';

const FeaturedCourses = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const courses = [
    {
      id: 1,
      image: 'co1.jpeg',
      title: 'MSCIT Basic To Advanced',
      duration: '2Weeks',
      students: '156 Students',
    },
    {
      id: 2,
      image: 'co2.jpeg',
      title: 'Digital Marketing',
      duration: '2Weeks',
      students: '156 Students',
    },
    {
      id: 3,
      image: 'co3.jpeg',
      title: 'Tally ERP',
      duration: '2Weeks',
      students: '156 Students',
    },
    {
      id: 4,
      image: 'co4.jpeg',
      title: 'Video Editing',
      duration: '2Weeks',
      students: '156 Students',
    },
    {
      id: 5,
      image: 'co5.jpeg',
      title: 'Programming In C++',
      duration: '2Weeks',
      students: '156 Students',
    },
    {
      id: 6,
      image: 'co6.jpeg',
      title: 'Web Designing',
      duration: '2Weeks',
      students: '156 Students',
    },
  ];

  return (
    <section className="w-full bg-white py-16 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <h2
              className="text-[32px] lg:text-[40px] font-bold text-[#1a1a2e] mb-2"
              style={{ fontFamily: "'Rubik', sans-serif" }}
            >
              Featured Courses
            </h2>
            <p
              className="text-[16px] text-gray-500"
              style={{ fontFamily: "'Rubik', sans-serif" }}
            >
              Explore our Popular Courses
            </p>
          </div>

          <button
            className="px-6 py-2.5 border-2 border-gray-300 rounded-full text-[15px] font-medium text-gray-700 hover:border-[#525FE1] hover:text-[#525FE1] transition-all duration-300"
            style={{ fontFamily: "'Rubik', sans-serif" }}
          >
            All Courses
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const isHovered = hoveredId === course.id;

            return (
              <div
                key={course.id}
                onMouseEnter={() => setHoveredId(course.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`
                  flex flex-col bg-white cursor-pointer
                  rounded-[24px] transition-all duration-300
                  shadow-[5px_0_0px_-2px_rgba(0,0,0,0.1),-1px_0_0px_2px_rgba(0,0,0,0.1),0_4px_0px_-0px_rgba(0,0,0,0.2)]
                  ${isHovered
                    ? 'shadow-[0_12px_40px_rgba(82,95,225,0.18),0_4px_12px_rgba(82,95,225,0.10)] -translate-y-2'
                    : ''
                  }
                `}
              >
                {/* Image — overflow-hidden only here so card shadow is not clipped */}
                <div className="w-full h-[210px] overflow-hidden rounded-t-[24px] bg-[#f3f0ff]">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="px-5 py-4 flex flex-col gap-3">

                  {/* Title */}
                  <h3
                    className={`text-[17px] font-bold transition-colors duration-300 ${
                      isHovered ? 'text-[#525FE1]' : 'text-[#1a1a2e]'
                    }`}
                    style={{ fontFamily: "'Rubik', sans-serif" }}
                  >
                    {course.title}
                  </h3>

                  {/* Meta + Button */}
                  <div className="flex items-center justify-between gap-2">

                    {/* Duration + Students */}
                    <div className="flex items-center gap-4">

                      {/* Duration */}
                      <div className="flex items-center gap-1.5">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#525FE1]" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                            10-4.48 10-10S17.52 2 12 2zm0 18c-4.41
                            0-8-3.59-8-8s3.59-8 8-8 8 3.59 8
                            8-3.59 8-8 8zm.5-13H11v6l5.25
                            3.15.75-1.23-4.5-2.67V7z"/>
                        </svg>
                        <span
                          className="text-[13px] text-gray-500"
                          style={{ fontFamily: "'Rubik', sans-serif" }}
                        >
                          {course.duration}
                        </span>
                      </div>

                      {/* Students */}
                      <div className="flex items-center gap-1.5">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#525FE1]" fill="currentColor">
                          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12
                            3zM5 13.18v4L12 21l7-3.82v-4L12
                            17l-7-3.82z"/>
                        </svg>
                        <span
                          className="text-[13px] text-gray-500"
                          style={{ fontFamily: "'Rubik', sans-serif" }}
                        >
                          {course.students}
                        </span>
                      </div>
                    </div>

                    {/* Start Course button */}
                    <button
                      className="px-4 py-2 rounded-full text-[13px] font-semibold bg-[#BBC7FA] text-[#1a1a2e] hover:bg-[#a8b5f0] transition-colors duration-300 whitespace-nowrap"
                      style={{ fontFamily: "'Rubik', sans-serif" }}
                    >
                      Start Course
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCourses;