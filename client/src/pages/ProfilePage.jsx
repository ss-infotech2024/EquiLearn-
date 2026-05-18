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
                  <span className="text-white text-[18px]"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.5" d="M15.7949 5H13.7949C11.9093 5 10.9665 5 10.3807 5.58579C9.79492 6.17157 9.79492 7.11438 9.79492 9V11V12.5H19.7949V11V9C19.7949 7.11438 19.7949 6.17157 19.2091 5.58579C18.6233 5 17.6805 5 15.7949 5Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2304 8.78311C15.3352 8.29495 14.2533 8.29495 13.358 8.78311L8.56381 11.3973C7.59982 11.9229 7 12.9332 7 14.0312V18.9688C7 20.0668 7.59982 21.0771 8.56381 21.6027L13.358 24.2169C14.2533 24.705 15.3352 24.705 16.2304 24.2169L21.0246 21.6027C21.9886 21.0771 22.5885 20.0668 22.5885 18.9688V14.0312C22.5885 12.9332 21.9886 11.9229 21.0246 11.3973L16.2304 8.78311ZM14.7944 13.5C14.5104 13.5 14.3204 13.8408 13.9404 14.5225L13.8421 14.6989C13.7341 14.8926 13.6801 14.9894 13.5959 15.0533C13.5117 15.1172 13.4069 15.141 13.1972 15.1884L13.0063 15.2316C12.2684 15.3986 11.8994 15.482 11.8117 15.7643C11.7239 16.0466 11.9754 16.3407 12.4785 16.929L12.6086 17.0812C12.7516 17.2483 12.823 17.3319 12.8552 17.4353C12.8873 17.5387 12.8765 17.6502 12.8549 17.8733L12.8353 18.0763C12.7592 18.8612 12.7212 19.2536 12.951 19.4281C13.1808 19.6025 13.5262 19.4435 14.2171 19.1254L14.3959 19.0431C14.5922 18.9527 14.6904 18.9075 14.7944 18.9075C14.8985 18.9075 14.9967 18.9527 15.193 19.0431L15.3717 19.1254C16.0626 19.4435 16.4081 19.6025 16.6379 19.4281C16.8677 19.2536 16.8297 18.8612 16.7536 18.0763L16.7339 17.8733C16.7123 17.6502 16.7015 17.5387 16.7337 17.4353C16.7658 17.3319 16.8373 17.2483 16.9802 17.0812L17.1104 16.929C17.6135 16.3407 17.865 16.0466 17.7772 15.7643C17.6894 15.482 17.3205 15.3986 16.5826 15.2316L16.3917 15.1884C16.182 15.141 16.0771 15.1172 15.993 15.0533C15.9088 14.9894 15.8548 14.8926 15.7468 14.6989L15.6485 14.5225C15.2685 13.8408 15.0785 13.5 14.7944 13.5Z" fill="white"/>
</svg></span>
                </div>
              </div>
              <div className="bg-[#fff9e6] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-[20px] font-bold text-[#1a1a2e]" style={{ fontFamily: "'Rubik', sans-serif" }}>17 Skill</p>
                  <p className="text-[12px] text-gray-500" style={{ fontFamily: "'Rubik', sans-serif" }}>Industry ready professional</p>
                </div>
                <div className="w-10 h-10 bg-[#ffd93d] rounded-lg flex items-center justify-center">
                  <span className="text-[18px]"> <img src="icon1.jpeg" alt="" /></span>
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

