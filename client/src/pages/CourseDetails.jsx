import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { courses } from "../data/courses";
import hero from "../assets/CoursesImg/demo.png"
import detailsinfo from "../assets/CoursesImg/details.png"

const tagColors = {
  blue: "bg-blue-600",
  purple: "bg-purple-600",
  cyan: "bg-cyan-500",
  green: "bg-green-500",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
};

// Colors matching the OBJECTS.png exactly - left to right
const infographicColors = [
  "#F97316",  // Orange - 01
  "#3B82F6",  // Blue - 02
  "#EC4899",  // Pink - 03
  "#A855F7",  // Purple - 04
  "#06B6D4",  // Cyan/Teal - 05
];

const circleIcons = ["💡", "📊", "📣", "⚙️", "🚀"];

// Arc positions for 5 circles matching the image layout
const arcPositions = [
  { bottom: "20px", left: "5%" },      // 01 - Orange (leftmost)
  { bottom: "100px", left: "22%" },    // 02 - Blue
  { bottom: "160px", left: "50%", transform: "translateX(-50%)" }, // 03 - Pink (center top)
  { bottom: "100px", right: "22%" },   // 04 - Purple
  { bottom: "20px", right: "5%" },     // 05 - Cyan (rightmost)
];

// Number labels matching the image style
const numberLabels = ["01", "02", "03", "04", "05"];

export default function CourseDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hoverEnroll, setHoverEnroll] = useState(false);

  // Find the course by ID
  const course = courses.find(c => c.id === parseInt(id));

  if (!course) {
    return (
      <div className="min-h-screen bg-[#EEF0FC] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Course not found</h2>
          <button 
            onClick={() => navigate('/courses')}
            className="px-6 py-2 bg-[#4A6CF7] text-white rounded-lg hover:bg-[#3a5ce5]"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const renderStars = (count) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-[22px] ${i < count ? "text-yellow-400" : "text-gray-300"}`}>
        ★
      </span>
    ));

  const opportunityPct = course.opportunity || 70;

  const tagColorList = [
    tagColors.blue,
    tagColors.purple,
    tagColors.cyan,
    tagColors.green,
    tagColors.orange,
    tagColors.pink,
  ];

  return (
    <div className="min-h-screen bg-[#EEF0FC] font-['Nunito'] pb-15">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');`}</style>

      {/* Breadcrumb */}
      <div className="px-10 py-4 text-[13px] text-gray-500 flex items-center gap-1.5 cursor-pointer">
        <span className="text-gray-500 cursor-pointer hover:text-[#4A6CF7]" onClick={() => navigate('/')}>
          Homepage
        </span>
        <span className="text-gray-400 text-xs">›</span>
        <span className="text-gray-500 cursor-pointer hover:text-[#4A6CF7]" onClick={() => navigate('/courses')}>
          Courses
        </span>
        <span className="text-gray-400 text-xs">›</span>
        <span className="text-[#4A6CF7] font-semibold">{course.title}</span>
      </div>

      {/* Hero Section */}
      <div className="flex gap-10 px-10 pt-5 pb-10 items-center">
        {/* Left Column - Content */}
        <div className="flex-1 min-w-0">
          <h1 className="text-[42px] font-extrabold leading-tight mb-5 text-[#4A6CF7]">
            {course.title}
          </h1>
          <p className="text-[13.5px] text-gray-500 leading-relaxed mb-7 max-w-[500px]">
            {course.description}
          </p>

          {/* Job Roles */}
          <p className="text-base font-bold text-[#1A1A2E] mb-3.5 leading-tight">
            Industry Job Offered
            <br />
            For This Course:
          </p>
          <div className="flex flex-wrap gap-2.5 mb-7">
            {course.jobRoles.map((role, i) => (
              <button
                key={i}
                className={`${tagColorList[i % tagColorList.length]} text-white px-4 py-2 rounded-md text-[12.5px] font-semibold transition-all duration-200 hover:opacity-90 border-none cursor-pointer`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Opportunity Slider */}
          <div className="mb-8">
            <p className="text-base font-bold text-[#1A1A2E] mb-3.5 leading-tight">
              Industry Opportunities:
            </p>
            <div className="relative pb-6">
              <div className="w-full h-1.5 rounded-full bg-gray-200 relative cursor-pointer">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#4A6CF7] to-[#10B981] transition-all duration-300"
                  style={{ width: `${opportunityPct}%` }}
                />
                <div
                  className="w-[18px] h-[18px] rounded-full bg-[#10B981] border-[3px] border-white shadow-md absolute top-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: `${opportunityPct}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Low</span>
                <span>Moderate</span>
                <span>High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - PNG Image */}
        <div className="w-[400px] flex-shrink-0 flex justify-center items-center">
          <img 
            src={course.heroImage || hero } 
            alt={course.title}
            className="w-full h-auto object-contain rounded-2xl"
            onError={(e) => {
              e.target.src = "https://placehold.co/400x400/4A6CF7/white?text=Course+Illustration";
            }}
          />
        </div>
      </div>

      {/* Enroll Button - Centered */}
      <div className="flex justify-center items-center px-10 mb-15">
        <button
          className="w-[280px] py-[18px] bg-gradient-to-r from-[#4A6CF7] to-[#7C3AED] text-white text-lg font-extrabold tracking-wide border-none rounded-lg cursor-pointer text-center shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          style={{
            boxShadow: hoverEnroll
              ? "0 12px 32px rgba(74,108,247,0.45)"
              : "0 8px 24px rgba(74,108,247,0.35)",
          }}
          onMouseEnter={() => setHoverEnroll(true)}
          onMouseLeave={() => setHoverEnroll(false)}
        >
          ENROLL NOW
        </button>
      </div>

      {/* Image Section */}
      <div className="px-10 pb-15">
        <div className="flex justify-center items-center">
          <img
            src={detailsinfo}
            alt="Objects Infographic"
            className="w-full max-w-5xl object-contain rounded-2xl"
          />
        </div>
      </div>

      <style>{`
        button:hover { opacity: 0.92; }
      `}</style>
    </div>
  );
}