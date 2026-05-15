import React, { useState } from 'react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [expandedCert, setExpandedCert] = useState(2);

  const tabs = [
    { name: 'Profile', icon: '👤' },
    { name: 'Emails (3)', icon: '✉️' },
    { name: 'Gallery (40)', icon: '🖼️' },
    { name: 'Messages (39)', icon: '💬' },
    { name: 'Skills (2)', icon: '🎮' },
  ];

  const certifications = [
    { id: 1, title: 'Front End Development', expanded: false },
    { id: 2, title: 'Front End Development', expanded: false },
    { id: 3, title: 'Front End Development', expanded: true },
    { id: 4, title: 'Front End Development', expanded: false },
  ];

  const skills = [
    { name: 'Java', level: 20 },
    { name: 'Java', level: 60 },
    { name: 'Java', level: 40 },
    { name: 'Java', level: 90 },
  ];

  const profileSkills = ['Media', 'Video Editing', 'Graphic Designing', 'Marketing', 'Marketing'];
  const softSkills = ['Public Speaking', 'Leadership'];
  const otherSkills = ['other', 'other', 'other'];

  return (
    <div className="w-full min-h-screen bg-[#e8eaff] p-4 lg:p-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Profile Card */}
          <div className="bg-white rounded-[20px] p-6 flex flex-col items-center">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full border-4 border-[#525FE1] overflow-hidden mb-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h3 
              className="text-[18px] font-bold text-[#1a1a2e] mb-1"
              style={{ fontFamily: "'Rubik', sans-serif" }}
            >
              Kaivalya Pardeshi
            </h3>
            <p 
              className="text-[14px] text-gray-500 mb-1"
              style={{ fontFamily: "'Rubik', sans-serif" }}
            >
              2nd Year Student, Btech
            </p>
            <p 
              className="text-[14px] text-gray-500"
              style={{ fontFamily: "'Rubik', sans-serif" }}
            >
              Nagpur
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-[20px] p-4 flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                  activeTab === tab.name 
                    ? 'bg-[#f0f4ff] text-[#525FE1]' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                style={{ fontFamily: "'Rubik', sans-serif" }}
              >
                <span className="text-[18px]">{tab.icon}</span>
                <span className="text-[14px] font-medium">{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Quote Card */}
          <div className="bg-white rounded-[20px] p-5">
            <p 
              className="text-[14px] text-gray-600 leading-relaxed"
              style={{ fontFamily: "'Rubik', sans-serif" }}
            >
              <span className="text-[#525FE1] font-bold text-[16px]">"</span>
              I am used to with online service and I usually do my online shopping from Instagram
            </p>
          </div>
        </div>

        {/* Center Content */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Breadcrumb */}
         

          {/* Main Profile Card */}
          <div className="bg-white rounded-[20px] p-6 lg:p-8">
             <div className="flex items-center gap-2 text-[14px] mb-2">
            <span className="text-gray-500" style={{ fontFamily: "'Rubik', sans-serif" }}>Home</span>
            <span className="text-gray-400">&gt;</span>
            <span className="text-[#525FE1] font-medium" style={{ fontFamily: "'Rubik', sans-serif" }}>Profile</span>
          </div>
            <h2 
              className="text-[28px] font-bold text-[#1a1a2e] mb-4"
              style={{ fontFamily: "'Rubik', sans-serif" }}
            >
              Kaivalya Pardeshi
            </h2>

            {/* Status Badge */}
            <div className="bg-[#f0f4ff] rounded-xl px-4 py-2 mb-6 inline-block">
              <span 
                className="text-[14px] text-[#525FE1] font-medium"
                style={{ fontFamily: "'Rubik', sans-serif" }}
              >
                Second Year Student, RBU
              </span>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#fff5f0] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-[20px] font-bold text-[#1a1a2e]" style={{ fontFamily: "'Rubik', sans-serif" }}>78 Days</p>
                  <p className="text-[12px] text-gray-500" style={{ fontFamily: "'Rubik', sans-serif" }}>of Streak</p>
                </div>
                <div className="w-10 h-10 bg-[#ff8c69] rounded-lg flex items-center justify-center">
                  <span className="text-white text-[18px]">🔥</span>
                </div>
              </div>
              <div className="bg-[#fff9e6] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-[20px] font-bold text-[#1a1a2e]" style={{ fontFamily: "'Rubik', sans-serif" }}>17 Skill</p>
                  <p className="text-[12px] text-gray-500" style={{ fontFamily: "'Rubik', sans-serif" }}>Industry ready professional</p>
                </div>
                <div className="w-10 h-10 bg-[#ffd93d] rounded-lg flex items-center justify-center">
                  <span className="text-[18px]">⚒️</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-[14px] text-gray-500 w-24" style={{ fontFamily: "'Rubik', sans-serif" }}>Email</span>
                <span className="text-[14px] text-[#1a1a2e]" style={{ fontFamily: "'Rubik', sans-serif" }}>example.email@gamil.com</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[14px] text-gray-500 w-24" style={{ fontFamily: "'Rubik', sans-serif" }}>Phone No.</span>
                <span className="text-[14px] text-[#1a1a2e]" style={{ fontFamily: "'Rubik', sans-serif" }}>+91 8446771510</span>
              </div>
            </div>

            {/* Social Platforms */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="text-[14px] text-gray-500" style={{ fontFamily: "'Rubik', sans-serif" }}>Other Platforms</span>
              <button className="px-4 py-2 bg-[#1a1a2e] text-white rounded-full text-[12px] font-medium">GitHub</button>
              <button className="px-4 py-2 bg-[#525FE1] text-white rounded-full text-[12px] font-medium">LinkedIn</button>
              <button className="px-4 py-2 bg-[#1a1a2e] text-white rounded-full text-[12px] font-medium">LeetCode</button>
              <button className="px-4 py-2 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-full text-[12px] font-medium">Instagram</button>
              <button className="px-4 py-2 border border-[#525FE1] text-[#525FE1] rounded-full text-[12px] font-medium">+Add Platform</button>
            </div>

            {/* Instagram Icon */}
            <div className="flex justify-end mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </div>
            </div>

            {/* About */}
            <div className="mb-6">
              <h4 className="text-[16px] font-bold text-[#1a1a2e] mb-2" style={{ fontFamily: "'Rubik', sans-serif" }}>About</h4>
              <p className="text-[14px] text-gray-500 leading-relaxed" style={{ fontFamily: "'Rubik', sans-serif" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
              </p>
              <p className="text-[14px] text-gray-500 leading-relaxed" style={{ fontFamily: "'Rubik', sans-serif" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
              </p>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h4 className="text-[16px] font-bold text-[#1a1a2e] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>Skills</h4>
              <div className="flex flex-wrap gap-2">
                {profileSkills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 border border-[#525FE1] text-[#525FE1] rounded-full text-[13px] font-medium"
                    style={{ fontFamily: "'Rubik', sans-serif" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="mb-6">
              <h4 className="text-[16px] font-bold text-[#1a1a2e] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>Soft Skills</h4>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 border border-[#525FE1] text-[#525FE1] rounded-full text-[13px] font-medium"
                    style={{ fontFamily: "'Rubik', sans-serif" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Other */}
            <div>
              <h4 className="text-[16px] font-bold text-[#1a1a2e] mb-3" style={{ fontFamily: "'Rubik', sans-serif" }}>Other</h4>
              <div className="flex flex-wrap gap-2">
                {otherSkills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 border border-[#525FE1] text-[#525FE1] rounded-full text-[13px] font-medium"
                    style={{ fontFamily: "'Rubik', sans-serif" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Certifications */}
          <div className="bg-white rounded-[20px] p-6">
            <h3 
              className="text-[18px] font-bold text-[#1a1a2e] mb-4"
              style={{ fontFamily: "'Rubik', sans-serif" }}
            >
              Certifications
            </h3>
            
            <div className="flex flex-col gap-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedCert(expandedCert === cert.id ? null : cert.id)}
                    className="w-full flex items-center gap-3 p-3 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#e8eaff] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#525FE1]" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <span 
                      className="text-[14px] font-medium text-[#1a1a2e] flex-grow text-left"
                      style={{ fontFamily: "'Rubik', sans-serif" }}
                    >
                      {cert.title}
                    </span>
                    <svg 
                      viewBox="0 0 24 24" 
                      className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${expandedCert === cert.id ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  
                  {expandedCert === cert.id && (
                    <div className="p-4 bg-gray-50 border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-2 text-[12px] text-gray-600 mb-3">
                        <div>
                          <p className="text-gray-400">Start Date:</p>
                          <p className="font-medium">4 Apr 25</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Duration:</p>
                          <p className="font-medium">78 Days</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Assignments:</p>
                          <p className="font-medium">23</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Projects:</p>
                          <p className="font-medium">2</p>
                        </div>
                      </div>
                      <button className="text-[12px] text-[#525FE1] font-medium mb-3">View Timeline</button>
                      <div className="bg-white rounded-lg p-2 border border-gray-200">
                        <img 
                          src="https://via.placeholder.com/200x140?text=CERTIFICATE" 
                          alt="Certificate" 
                          className="w-full h-auto rounded"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skills Progress */}
          <div className="bg-white rounded-[20px] p-6">
            <h3 
              className="text-[18px] font-bold text-[#1a1a2e] mb-4"
              style={{ fontFamily: "'Rubik', sans-serif" }}
            >
              Skills
            </h3>
            
            <div className="flex flex-col gap-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span 
                      className="text-[14px] font-medium text-[#1a1a2e]"
                      style={{ fontFamily: "'Rubik', sans-serif" }}
                    >
                      {skill.name}
                    </span>
                  </div>
                  <div className="relative h-2 bg-gray-200 rounded-full">
                    <div 
                      className="absolute left-0 top-0 h-full bg-[#525FE1] rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-gray-400">Beginner</span>
                    <span className="text-[10px] text-gray-400">Expert</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

