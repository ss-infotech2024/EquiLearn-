import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { courses, categories, COURSES_PER_PAGE } from "../data/courses";

/* ─── SVG Icons ─────────────────────────────────────────────────────────── */
const IconClock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconUsers = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconBook = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const IconChevronRight = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const IconChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconChevronRightBlue = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ─── Course Card Component ─────────────────────────────────────────────── */
function CourseCard({ course, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl flex mb-4 overflow-hidden cursor-pointer transition-all duration-200 border-2 border-transparent ${
        hovered ? 'shadow-xl -translate-y-0.5 border-blue-200' : 'shadow-md'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(course)}
    >
      <div className="w-[200px] min-h-[130px] flex-shrink-0 overflow-hidden relative">
        {course.image && !imgError ? (
          <img
            src={course.image}
            alt={course.title}
            className={`w-full h-full object-cover transition-transform duration-350 ${
              hovered ? 'scale-105' : 'scale-100'
            }`}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full min-h-[130px]" style={{ background: course.bgGradient }} />
        )}
      </div>

      <div className="flex-1 p-5 flex flex-col justify-center">
        <p className="text-[11.5px] text-gray-500 mb-1">
          by <span className="text-[#4A6CF7] font-bold">{course.provider}</span>
        </p>
        <p className="text-[17px] font-extrabold text-[#1A1A2E] mb-3 leading-tight">
          {course.title}
        </p>
        <div className="flex gap-5 flex-wrap items-center">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <IconClock />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <IconUsers />
            <span>{course.students} Students</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <IconBook />
            <span>{course.lessons} Lessons</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Category Item Component ──────────────────────────────────────────── */
function CategoryItem({ cat, active, onSelect }) {
  return (
    <div className="flex items-center justify-between py-2 cursor-pointer border-b border-gray-50" onClick={() => onSelect(cat.name)}>
      <div className="flex items-center gap-2.5">
        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
          active ? 'bg-[#4A6CF7] border-[#4A6CF7]' : 'border-gray-300'
        }`}>
          {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
        </div>
        <span className={`text-[13px] ${active ? 'text-[#4A6CF7] font-bold' : 'text-gray-700'}`}>
          {cat.name}
        </span>
      </div>
      <span className="text-xs text-gray-400 font-semibold">{cat.count}</span>
    </div>
  );
}

/* ─── Pagination Component ─────────────────────────────────────────────── */
function Pagination({ current, total, onChange }) {
  return (
    <div className="flex items-center justify-center gap-1.5 mt-9">
      <button
        className={`w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center cursor-pointer transition-all duration-150 outline-none ${
          current === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'
        }`}
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
      >
        <IconChevronLeft />
      </button>

      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          className={`w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer text-[13px] font-bold transition-all duration-150 outline-none ${
            p === current 
              ? 'bg-[#4A6CF7] border-[#4A6CF7] text-white shadow-lg shadow-blue-500/30' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        className={`w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center cursor-pointer transition-all duration-150 outline-none ${
          current === total ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'
        }`}
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
      >
        <IconChevronRightBlue />
      </button>
    </div>
  );
}

/* ─── Main Courses Component ───────────────────────────────────────────── */
export default function Courses() {
  const navigate = useNavigate();
  // null means "All categories", otherwise store the selected category name
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const selectCategory = (catName) => {
    // If the same category is clicked again, show all courses
    if (selectedCategory === catName) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(catName);
    }
    setCurrentPage(1);
  };

  const filtered = useMemo(() => {
    // If no category selected (null), show all courses
    if (selectedCategory === null) return courses;
    return courses.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / COURSES_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );

  const handleCourseClick = (course) => {
    navigate(`/course/${course.id}`);
  };

  return (
    <div className="min-h-screen bg-[#EEF0FC] font-['Nunito'] pb-15 box-border">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');`}</style>

      {/* Breadcrumb */}
      <div className="px-10 py-4 text-[13px] text-gray-500 flex items-center gap-1.5 border-b border-gray-200 box-border">
        <span className="text-gray-500 cursor-pointer hover:text-[#4A6CF7]" onClick={() => navigate('/')}>Homepage</span>
        <span className="text-gray-400 flex items-center"><IconChevronRight /></span>
        <span className="text-[#4A6CF7] font-bold">Course</span>
      </div>

      {/* Body */}
      <div className="flex gap-7 px-10 pt-8 items-start box-border">
        {/* Course List */}
        <div className="flex-1 min-w-0">
          <h1 className="text-[26px] font-extrabold text-[#1A1A2E] mb-6 mt-0 leading-tight">
            All Courses
            {selectedCategory && <span className="text-[#4A6CF7] text-xl ml-2">· {selectedCategory}</span>}
          </h1>

          {paginated.length === 0 ? (
            <div className="text-center py-15 text-gray-400 text-[15px]">
              No courses found for this category.
            </div>
          ) : (
            paginated.map((course) => (
              <CourseCard key={course.id} course={course} onClick={handleCourseClick} />
            ))
          )}

          <Pagination current={currentPage} total={totalPages} onChange={(p) => setCurrentPage(p)} />
        </div>

        {/* Sidebar */}
        <div className="w-[220px] flex-shrink-0">
          <p className="text-[15px] font-extrabold text-[#1A1A2E] mb-3.5 mt-0 leading-tight">
            Course Category
          </p>
          {/* Add an "All Courses" option */}
          <div className="flex items-center justify-between py-2 cursor-pointer border-b border-gray-50" onClick={() => selectCategory(null)}>
            <div className="flex items-center gap-2.5">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
                selectedCategory === null ? 'bg-[#4A6CF7] border-[#4A6CF7]' : 'border-gray-300'
              }`}>
                {selectedCategory === null && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <span className={`text-[13px] ${selectedCategory === null ? 'text-[#4A6CF7] font-bold' : 'text-gray-700'}`}>
                All Courses
              </span>
            </div>
            <span className="text-xs text-gray-400 font-semibold">{courses.length}</span>
          </div>
          
          {categories.map((cat) => (
            <CategoryItem
              key={cat.id}
              cat={cat}
              active={selectedCategory === cat.name}
              onSelect={selectCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}