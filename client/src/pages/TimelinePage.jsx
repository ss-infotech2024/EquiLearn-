import React, { useState } from 'react';

const TimelinePage = () => {
  const [expandedCourses, setExpandedCourses] = useState([2, 5]);
  const [selectedDate, setSelectedDate] = useState('2025-04-01');

  const months = [
    { name: 'JAN', days: [1, 8, 15, 22, 29] },
    { name: 'FEB', days: [1, 8, 15, 22] },
    { name: 'MAR', days: [1, 8, 15, 22] },
    { name: 'APR', days: [1, 8, 15, 22] },
    { name: 'MAY', days: [1, 8, 15, 22] },
  ];

  const courses = [
    {
      id: 1,
      title: 'Front-End Development',
      date: 'Jan 31 - Feb 4',
      details: '47 Videos - 7 Assignments',
      color: '#525FE1',
      borderColor: 'border-l-[#525FE1]',
      expanded: false,
      startOffset: 0,
      cardWidth: 58,
    },
    {
      id: 2,
      title: 'Graphic Designing',
      date: 'Jan 31 - Feb 4',
      details: '27 Videos - 9 Assignments',
      color: '#4ade80',
      borderColor: 'border-l-[#4ade80]',
      expanded: true,
      startOffset: 2,
      cardWidth: 78,
      modules: [
        { name: 'Module 1', start: 2, width: 14, status: 'completed' },
        { name: 'Module 2', start: 18, width: 8, status: 'completed' },
        { name: 'Module 3', start: 34, width: 10, status: 'completed' },
        { name: 'Module 4', start: 48, width: 22, status: 'completed' },
      ],
      assignments: [
        { name: 'Assignment 1', start: 16, width: 12, status: 'completed' },
        { name: 'Assignment 2', start: 38, width: 14, status: 'completed' },
        { name: 'Assignment 3', start: 58, width: 10, status: 'pending' },
      ],
      others: [
        { name: 'Other', start: 22, width: 50, status: 'completed' },
      ],
    },
    {
      id: 3,
      title: 'Digital Marketing',
      date: 'Jan 31 - Feb 4',
      details: '20 Videos - 2 Assignments',
      color: '#f87171',
      borderColor: 'border-l-[#f87171]',
      expanded: false,
      startOffset: 8,
      cardWidth: 48,
    },
    {
      id: 4,
      title: 'Data analytics',
      date: 'Jan 31 - Feb 4',
      details: '20 Videos - 2 Assignments',
      color: '#c084fc',
      borderColor: 'border-l-[#c084fc]',
      expanded: false,
      startOffset: 52,
      cardWidth: 45,
    },
    {
      id: 5,
      title: 'Programming',
      date: 'Jan 31 - Feb 4',
      details: '4 Events',
      color: '#facc15',
      borderColor: 'border-l-[#facc15]',
      expanded: true,
      startOffset: 68,
      cardWidth: 35,
      events: [
        { name: 'Web Banner', start: 70, width: 18, color: '#d4c441' },
        { name: 'Other marketing', start: 82, width: 15, color: '#d4c441' },
      ]
    },
  ];

  const studentActivities = {
    2: [
      { day: 1, date: 'Jan 31', type: 'video', title: 'Module 1: Introduction to Design', status: 'completed', duration: '45 min' },
      { day: 2, date: 'Feb 1', type: 'skip', title: 'No Activity', status: 'skipped' },
      { day: 3, date: 'Feb 2', type: 'skip', title: 'No Activity', status: 'skipped' },
      { day: 4, date: 'Feb 3', type: 'video', title: 'Module 2: Color Theory', status: 'completed', duration: '52 min' },
      { day: 5, date: 'Feb 4', type: 'video', title: 'Module 3: Typography Basics', status: 'completed', duration: '38 min' },
      { day: 6, date: 'Feb 5', type: 'video', title: 'Module 4: Layout Design', status: 'completed', duration: '61 min' },
      { day: 7, date: 'Feb 6', type: 'assignment', title: 'Assignment 1: Create a Poster', status: 'completed', due: 'Feb 8' },
      { day: 8, date: 'Feb 7', type: 'video', title: 'Module 5: Design Tools', status: 'in-progress', duration: '40 min' },
      { day: 9, date: 'Feb 8', type: 'skip', title: 'No Activity', status: 'skipped' },
      { day: 10, date: 'Feb 9', type: 'assignment', title: 'Assignment 2: Logo Design', status: 'pending', due: 'Feb 12' },
    ]
  };

  const toggleCourse = (id) => {
    setExpandedCourses(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const getActivityIcon = (type) => {
    if (type === 'video') return (
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>
    );
    if (type === 'assignment') return (
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    );
    if (type === 'skip') return (
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    );
    return null;
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      {/* Top Header */}
      <div className="flex items-center gap-4 px-6 py-3 border-b border-gray-200 bg-white z-20">
        <button className="flex items-center gap-2 px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          Filter
        </button>
        
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-[14px] text-gray-700 hover:bg-gray-50 transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Month
        </button>

        <div className="ml-auto flex items-center gap-3 text-[12px] text-gray-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#4ade80]"></span> Completed</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#facc15]"></span> In Progress</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#525FE1]"></span> Assignment</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-200"></span> Skipped</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Courses */}
        <div className="w-[300px] border-r border-gray-200 flex-shrink-0 overflow-y-auto bg-white z-10">
          {courses.map((course) => (
            <div 
              key={course.id}
              className={`border-b border-gray-100 ${course.borderColor} border-l-4`}
            >
              <button
                onClick={() => toggleCourse(course.id)}
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <svg 
                    viewBox="0 0 24 24" 
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedCourses.includes(course.id) ? 'rotate-90' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <div className="text-left">
                    <h4 className="text-[14px] font-semibold text-[#1a1a2e]">
                      {course.title}
                    </h4>
                    <p className="text-[12px] text-[#525FE1]">
                      {course.date}
                    </p>
                    <p className="text-[12px] text-gray-400">
                      {course.details}
                    </p>
                  </div>
                </div>
                <button className="p-1 hover:bg-gray-200 rounded">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-400" fill="currentColor">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </button>
              </button>

              {/* Activity dots when expanded */}
              {expandedCourses.includes(course.id) && studentActivities[course.id] && (
                <div className="px-4 pb-3 bg-gray-50">
                  <div className="text-[11px] text-gray-500 mb-2">Student Activity Pattern:</div>
                  <div className="flex flex-wrap gap-1">
                    {studentActivities[course.id].map((activity, idx) => (
                      <div 
                        key={idx}
                        className={`w-6 h-6 rounded flex items-center justify-center text-[10px] ${
                          activity.type === 'skip' ? 'bg-gray-200 text-gray-400' :
                          activity.type === 'assignment' ? 'bg-[#525FE1] text-white' :
                          activity.status === 'completed' ? 'bg-[#4ade80] text-white' :
                          'bg-[#facc15] text-[#1a1a2e]'
                        }`}
                        title={`Day ${activity.day}: ${activity.title}`}
                      >
                        {activity.day}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Content - Timeline Grid */}
        <div className="flex-1 overflow-x-auto overflow-y-auto bg-[#eef2ff] relative">
          {/* Month Headers */}
          <div className="flex min-w-[1200px] border-b border-gray-200 bg-white sticky top-0 z-10">
            {months.map((month) => (
              <div key={month.name} className="flex-1 flex flex-col">
                <div className="px-3 py-2 text-[12px] font-bold text-gray-600 border-r border-gray-100">
                  {month.name}
                </div>
                <div className="flex border-t border-gray-100">
                  {month.days.map((day) => (
                    <div key={day} className="flex-1 px-2 py-1 text-[11px] text-gray-400 text-center border-r border-gray-100">
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Content with Grid Background */}
          <div 
            className="relative min-w-[1200px] min-h-[600px] p-4"
            style={{
              backgroundImage: `
                linear-gradient(to right, #dbe4ff 1px, transparent 1px),
                linear-gradient(to bottom, #dbe4ff 1px, transparent 1px)
              `,
              backgroundSize: 'calc(100% / 25) 100%, 100% 140px',
            }}
          >
            {/* Current Date Line (Apr 1) - at ~62% */}
            <div className="absolute top-0 bottom-0 left-[62%] w-px bg-[#525FE1] z-10 pointer-events-none">
              <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-[#525FE1] rounded-full"></div>
            </div>

            {/* Course Cards with Timeline */}
            <div className="flex flex-col gap-6 relative z-0">
              {courses.map((course) => (
                <div key={course.id} className="relative">
                  {/* Main Course Card */}
                  <div 
                    className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${course.borderColor} mb-3`}
                    style={{ 
                      width: `${course.cardWidth}%`, 
                      marginLeft: `${course.startOffset}%` 
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-[14px] font-bold text-[#1a1a2e]">
                        {course.title}
                      </h4>
                      <button className="p-1">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-400" fill="currentColor">
                          <circle cx="12" cy="5" r="2" />
                          <circle cx="12" cy="12" r="2" />
                          <circle cx="12" cy="19" r="2" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-[12px] text-[#525FE1]">{course.date}</p>
                    <p className="text-[12px] text-gray-400">{course.details}</p>
                  </div>

                  {/* Timeline Bars - Only for expanded courses */}
                  {expandedCourses.includes(course.id) && course.modules && (
                    <div 
                      className="  "
                      style={{ marginLeft: `${course.startOffset}%`, width: `${course.cardWidth + 10}%` }}
                    >
                      {/* Row 1: Modules (Green) */}
                      <div className="flex gap-2 mb-2">
                        {course.modules.map((mod, idx) => (
                          <div
                            key={idx}
                            className="bg-[#4ade80] text-white px-3 py-1.5 rounded-md text-[11px] font-medium flex items-center gap-1 shadow-sm hover:scale-105 transition-transform cursor-pointer"
                            style={{ 
                              marginLeft: idx === 0 ? `${mod.start - course.startOffset}%` : '0',
                              width: `${mod.width}%`,
                              minWidth: '60px'
                            }}
                            title={`${mod.name} - ${mod.status}`}
                          >
                            {mod.name}
                          </div>
                        ))}
                      </div>

                      {/* Row 2: Assignments (Blue) */}
                      <div className="flex gap-2 mb-2">
                        {course.assignments.map((assign, idx) => (
                          <div
                            key={idx}
                            className={`px-3 py-1.5 rounded-md text-[11px] font-medium flex items-center gap-1 shadow-sm hover:scale-105 transition-transform cursor-pointer ${
                              assign.status === 'pending' 
                                ? 'bg-[#e8eaff] text-[#525FE1] border border-[#525FE1]' 
                                : 'bg-[#525FE1] text-white'
                            }`}
                            style={{ 
                              marginLeft: idx === 0 ? `${assign.start - course.startOffset}%` : '0',
                              width: `${assign.width}%`,
                              minWidth: '80px'
                            }}
                            title={`${assign.name} - ${assign.status}`}
                          >
                            {assign.name}
                          </div>
                        ))}
                      </div>

                      {/* Row 3: Other (Green long bar) */}
                      <div className="flex gap-2">
                        {course.others.map((other, idx) => (
                          <div
                            key={idx}
                            className="bg-[#4ade80] text-white px-3 py-1.5 rounded-md text-[11px] font-medium shadow-sm hover:scale-105 transition-transform cursor-pointer"
                            style={{ 
                              marginLeft: `${other.start - course.startOffset}%`,
                              width: `${other.width}%`,
                              minWidth: '100px'
                            }}
                          >
                            {other.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Events for Programming */}
                  {expandedCourses.includes(course.id) && course.events && (
                    <div 
                      className="flex flex-col gap-2 mt-2"
                      style={{ marginLeft: `${course.startOffset}%`, width: `${course.cardWidth}%` }}
                    >
                      {course.events.map((event, idx) => (
                        <div 
                          key={idx}
                          className="text-white px-4 py-2 rounded-lg text-[12px] font-medium shadow-sm"
                          style={{ 
                            backgroundColor: event.color,
                            marginLeft: `${event.start - course.startOffset}%`,
                            width: `${event.width}%`
                          }}
                        >
                          {event.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;