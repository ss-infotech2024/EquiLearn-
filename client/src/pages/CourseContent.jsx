import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { courses } from "../data/courses";

/* ─── Icons ──────────────────────────────────────────────────────────────── */
const ChevronIcon = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const PlayCircle = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill={active ? "#4A6CF7" : "#E5E7EB"} />
    <polygon points="10,8 17,12 10,16" fill="white" />
  </svg>
);

const CheckBox = ({ done, locked }) => (
  <div style={{
    width: 20, height: 20, borderRadius: 5, flexShrink: 0,
    border: done ? "2px solid #4A6CF7" : locked ? "2px solid #E5E7EB" : "2px solid #D1D5DB",
    background: done ? "#4A6CF7" : "white",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all 0.2s",
  }}>
    {done && (
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
    {!done && locked && (
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2.5">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )}
  </div>
);

const FileIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A6CF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const EyeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ChatIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

/* ─── Toast Component ─────────────────────────────────────────────────────── */
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-[100] animate-[toastIn_0.3s_ease-out]">
      <div className={`px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-[13px] font-bold ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-[#4A6CF7] text-white'
      }`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        {message}
      </div>
    </div>
  );
};

/* ─── Assignment Submission Modal ───────────────────────────────────────── */
const AssignmentModal = ({ isOpen, onClose, assignmentTitle, courseTitle }) => {
  const [submissionText, setSubmissionText] = useState('');
  const [file, setFile] = useState(null); // Changed from array to single file
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      setIsExiting(false);
      setSubmissionText('');
      setFile(null); // Reset single file
      setIsSubmitting(false);
    }, 200);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0]; // Only take first file
    if (droppedFile) setFile(droppedFile);
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0]; // Only take first file
    if (selectedFile) setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = () => {
    if (!submissionText.trim() && !file) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      handleClose();
    }, 1500);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-start justify-center pt-12 ${isExiting ? '[&_.modal-overlay]:animate-[fadeOut_0.2s_ease-in_forwards] [&_.modal-content]:animate-[slideDown_0.2s_ease-in_forwards]' : ''}`}>
      {/* Overlay */}
      <div className="modal-overlay absolute inset-0 bg-black/40 backdrop-blur-sm animate-[fadeIn_0.25s_ease-out]" onClick={handleClose} />
      
      {/* Modal Content */}
      <div className="modal-content relative bg-white rounded-2xl shadow-2xl w-full max-w-[700px] mx-4 max-h-[85vh] overflow-y-auto animate-[slideUp_0.3s_ease-out]">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 py-5 border-b border-gray-100 flex items-start justify-between">
          <div>
            <h2 className="text-[22px] font-extrabold text-[#1A1A2E]">Assignment Submission</h2>
            <p className="text-[14px] text-gray-500 mt-1 font-semibold">{assignmentTitle}</p>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Objective */}
          <div className="bg-[#F8FAFF] rounded-xl p-4 border border-[#E0E7FF]">
            <h3 className="text-[13px] font-extrabold text-[#4A6CF7] mb-2 uppercase tracking-wider">Objective</h3>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              Create a visually appealing and user-friendly landing page for EquiLearn, an EdTech platform that provides industry-level courses and internships at an affordable price. The webpage should highlight EquiLearn's key features, benefits, and credibility.
            </p>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-[13px] font-extrabold text-[#1A1A2E] mb-3 uppercase tracking-wider">Instructions</h3>
            <div className="space-y-3 text-[12.5px] text-gray-600 leading-relaxed">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A6CF7] text-white flex items-center justify-center text-[10px] font-extrabold">1</span>
                <div>
                  <span className="font-bold text-[#1A1A2E]">Page Structure:</span>
                  <ul className="mt-1 space-y-1 ml-4 list-disc text-gray-500">
                    <li>Header: Include the EquiLearn logo, navigation menu (Home, Courses, Internships, Pricing, Testimonials, Contact Us), and a sign-up/login button.</li>
                    <li>Hero Section: A compelling headline (e.g., "Learn. Prove. Succeed."), a brief description of EquiLearn, and a call-to-action button (e.g., "Start Learning for ₹99/month").</li>
                    <li>About EquiLearn: A short paragraph explaining what EquiLearn is, why it's unique, and how it benefits students.</li>
                    <li>Course Offerings: Display different course categories (e.g., Programming, No-Code, AWS, Video Editing, Design) with brief descriptions and icons.</li>
                    <li>QR-Coded Certificate System: Explain how EquiLearn tracks learning progress and ensures credibility with QR-based certification.</li>
                    <li>Internships & Job Opportunities: Showcase how EquiLearn connects learners with top companies and ensures job readiness.</li>
                    <li>Student Testimonials: Add real or sample testimonials to build trust.</li>
                    <li>Pricing Section: Clearly mention the ₹99/month pricing model with details on certification and exam fees.</li>
                    <li>Footer: Include social media links, contact information, and additional resources.</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A6CF7] text-white flex items-center justify-center text-[10px] font-extrabold">2</span>
                <div>
                  <span className="font-bold text-[#1A1A2E]">Design Requirements:</span>
                  <ul className="mt-1 space-y-1 ml-4 list-disc text-gray-500">
                    <li>Use modern UI/UX principles for a clean and professional look.</li>
                    <li>Ensure mobile responsiveness for an optimal experience on all devices.</li>
                    <li>Use EquiLearn's brand colors (Blue & Light Green) for consistency.</li>
                    <li>Implement a user-friendly layout with clear navigation.</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A6CF7] text-white flex items-center justify-center text-[10px] font-extrabold">3</span>
                <div>
                  <span className="font-bold text-[#1A1A2E]">Bonus (Optional):</span>
                  <ul className="mt-1 space-y-1 ml-4 list-disc text-gray-500">
                    <li>Add an interactive job map using GIS technology to display job/internship locations.</li>
                    <li>Include a chatbot or FAQ section to assist users.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Guidelines */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-[12px] font-extrabold text-[#1A1A2E] mb-2 uppercase tracking-wider">Submission Guidelines</h3>
            <div className="space-y-1.5 text-[12px] text-gray-600">
              <p><span className="font-bold text-[#1A1A2E]">Deliverables:</span> A fully functional HTML/CSS page or a Figma/Adobe XD wireframe.</p>
              <p><span className="font-bold text-[#1A1A2E]">Deadline:</span> <span className="text-[#4A6CF7] font-bold">Feb 12, 2025</span></p>
              <p><span className="font-bold text-[#1A1A2E]">Evaluation Criteria:</span> Creativity, functionality, responsiveness, and overall user experience.</p>
            </div>
            <p className="text-[12px] text-[#4A6CF7] font-bold mt-3">🚀 Start designing the future of learning with EquiLearn!</p>
          </div>

          {/* Your Submission */}
          <div>
            <h3 className="text-[14px] font-extrabold text-[#1A1A2E] mb-3">Your Submission</h3>
            
            {/* Text area - NO PLACEHOLDER */}
            <textarea
              className="w-full rounded-xl p-4 text-[13px] text-gray-700 resize-none border-2 border-gray-200 focus:border-[#4A6CF7] focus:shadow-[0_0_0_3px_rgba(74,108,247,0.1)] focus:outline-none transition-all duration-200"
              rows="4"
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
            />

            

            {/* Single File Display */}
            {file && (
              <div className="mt-3 flex items-center gap-3 bg-[#F8FAFF] rounded-lg px-3 py-2 border border-[#E0E7FF]">
                <FileIcon />
                <span className="text-[12px] text-gray-700 font-semibold flex-1 truncate">{file.name}</span>
                <span className="text-[10px] text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
                <button
                  onClick={removeFile}
                  className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || (!submissionText.trim() && !file)}
            className="px-10 py-3 bg-[#4A6CF7] text-white rounded-xl text-[14px] font-extrabold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(74,108,247,0.4)] active:translate-y-0 active:shadow-[0_1px_4px_rgba(74,108,247,0.3)] transition-all duration-200 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              'SUBMIT'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Feedback Modal ─────────────────────────────────────────────────────── */
const FeedbackModal = ({ isOpen, onClose, assignmentTitle }) => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      setIsExiting(false);
      setFeedback('');
      setIsSubmitting(false);
    }, 200);
  };

  const handleSubmit = () => {
    if (!feedback.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      handleClose();
    }, 1200);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-start justify-center pt-20 ${isExiting ? '[&_.modal-overlay]:animate-[fadeOut_0.2s_ease-in_forwards] [&_.modal-content]:animate-[slideDown_0.2s_ease-in_forwards]' : ''}`}>
      {/* Overlay */}
      <div className="modal-overlay absolute inset-0 bg-black/40 backdrop-blur-sm animate-[fadeIn_0.25s_ease-out]" onClick={handleClose} />
      
      {/* Modal Content */}
      <div className="modal-content relative bg-white rounded-2xl shadow-2xl w-full max-w-[500px] mx-4 animate-[slideUp_0.3s_ease-out]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-[20px] font-extrabold text-[#1A1A2E]">Feedback</h2>
            <p className="text-[13px] text-gray-500 mt-0.5 font-semibold">{assignmentTitle}</p>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <textarea
            className="w-full rounded-xl p-4 text-[13px] text-gray-700 resize-none border-2 border-gray-200 focus:border-[#4A6CF7] focus:shadow-[0_0_0_3px_rgba(74,108,247,0.1)] focus:outline-none transition-all duration-200"
            rows="6"
            placeholder="Share your thoughts about this assignment. What did you learn? What was challenging? Any suggestions for improvement?"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <p className="text-[11px] text-gray-400 mt-2 text-right">{feedback.length}/500 characters</p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-5 py-2.5 rounded-xl text-[13px] font-bold text-gray-600 border border-gray-200 hover:bg-[#EEF2FF] hover:border-[#4A6CF7] hover:text-[#4A6CF7] transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !feedback.trim()}
            className="px-6 py-2.5 bg-[#4A6CF7] text-white rounded-xl text-[13px] font-extrabold disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(74,108,247,0.4)] active:translate-y-0 active:shadow-[0_1px_4px_rgba(74,108,247,0.3)] transition-all duration-200 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              'Send Feedback'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Assignment Item in Sidebar ────────────────────────────────────────── */
const AssignmentItem = ({ item, isOpen, onToggle, onView, onFeedback }) => {
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={onToggle}
        className="w-full px-5 py-3 flex items-start justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <div>
          <p className="text-[12px] font-extrabold text-[#1A1A2E]">{item.title}</p>
          <p className="text-[10px] text-gray-400 font-semibold mt-0.5">{item.tasks} tasks</p>
        </div>
        <span className="text-gray-400 mt-0.5">
          <ChevronIcon open={isOpen} />
        </span>
      </button>

      {isOpen && (
        <div style={{ background: "#F9FAFB", padding: "0 20px 12px" }}>
          {Array.from({ length: item.tasks }, (_, i) => (
            <div
              key={i}
              className="flex items-center gap-2 py-2.5 border-b border-gray-100 last:border-0"
            >
              <FileIcon />
              <span className="text-[11px] text-gray-700 flex-1 font-semibold">
                Assignment details
              </span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => onView(item.title)}
                  className="flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded transition-all duration-200 hover:scale-105"
                  style={{ background: "#EEF2FF", color: "#4A6CF7", border: "1px solid #C7D2FE" }}
                >
                  <EyeIcon />
                  View
                </button>
                <button
                  onClick={() => onFeedback(item.title)}
                  className="flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded transition-all duration-200 hover:scale-105"
                  style={{ background: "#F0FDF4", color: "#16A34A", border: "1px solid #BBF7D0" }}
                >
                  <ChatIcon />
                  Feedback
                </button>
              </div>
              <CheckBox done={false} locked />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Main CourseContent Component ──────────────────────────────────────── */
export default function CourseContent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === parseInt(id));

  /* ── State ── */
  const [currentLecture, setCurrentLecture] = useState(null);
  const [completed, setCompleted] = useState(new Set());
  const [expandedModules, setExpandedModules] = useState(new Set([0]));
  const [playerReady, setPlayerReady] = useState(false);
  const [watchPercent, setWatchPercent] = useState(0);
  
  // Modal states
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [activeAssignmentTitle, setActiveAssignmentTitle] = useState('');
  
  // Toast state
  const [toast, setToast] = useState(null);

  const playerRef = useRef(null);
  const playerDivRef = useRef(null);
  const currentLectureRef = useRef(currentLecture);
  const watchTimerRef = useRef(null);

  /* keep ref in sync */
  useEffect(() => {
    currentLectureRef.current = currentLecture;
    setWatchPercent(0);
  }, [currentLecture]);

  /* ── Helpers ── */
  function extractVideoId(url = "") {
    const m = url.match(/(?:embed\/|v=|youtu\.be\/)([^?&]+)/);
    return m ? m[1] : "";
  }

  function buildModules(course) {
    const chapters = course.videoChapters || [];
    let lid = 0;
    const items = [];

    const groups = [
      { label: `Basics of ${course.title}`, range: [0, 2] },
      { label: "Loops & Core Concepts", range: [2, 4] },
      { label: "Advanced Concepts", range: [4, 6] },
      { label: "Projects & Real-World", range: [6, 8] },
    ];

    groups.forEach(({ label, range }, idx) => {
      const lectures = chapters.slice(...range).map((title) => ({
        id: lid++,
        title,
        videoUrl: course.youtubeUrl,
      }));
      items.push({
        type: "module",
        id: idx,
        title: `Module ${idx + 1}: ${label}`,
        lectures,
      });
      if (idx === 1)
        items.push({ type: "assignment", id: "a1", title: "Assignment 1", tasks: 2 });
      if (idx === 3)
        items.push({ type: "assignment", id: "a2", title: "Assignment 2", tasks: 2 });
    });

    return items;
  }

  const modules = course ? buildModules(course) : [];
  const allLectures = modules.filter((m) => m.type === "module").flatMap((m) => m.lectures);

  /* ── YouTube IFrame API ── */
  const startWatchTimer = useCallback(() => {
    clearInterval(watchTimerRef.current);
    watchTimerRef.current = setInterval(() => {
      const p = playerRef.current;
      if (!p || typeof p.getCurrentTime !== "function") return;
      const cur = p.getCurrentTime();
      const dur = p.getDuration();
      if (dur > 0) {
        const pct = Math.round((cur / dur) * 100);
        setWatchPercent(pct);
      }
    }, 800);
  }, []);

  const stopWatchTimer = useCallback(() => {
    clearInterval(watchTimerRef.current);
  }, []);

  useEffect(() => {
    if (!course) return;

    const initPlayer = () => {
      if (!playerDivRef.current) return;
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      playerRef.current = new window.YT.Player(playerDivRef.current, {
        videoId: extractVideoId(currentLectureRef.current?.videoUrl || ""),
        playerVars: { rel: 0, modestbranding: 1, autoplay: 0 },
        events: {
          onReady: () => setPlayerReady(true),
          onStateChange: (event) => {
            const YT = window.YT;
            if (event.data === YT.PlayerState.PLAYING) {
              startWatchTimer();
            } else if (
              event.data === YT.PlayerState.PAUSED ||
              event.data === YT.PlayerState.BUFFERING
            ) {
              stopWatchTimer();
            } else if (event.data === YT.PlayerState.ENDED) {
              stopWatchTimer();
              const lec = currentLectureRef.current;
              if (lec) {
                setCompleted((prev) => new Set([...prev, lec.id]));
              }
              setWatchPercent(100);
              showToast('Lecture completed! 🎉');
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);
      }
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        initPlayer();
      };
    }

    return () => {
      stopWatchTimer();
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Actions ── */
  const selectLecture = useCallback((lecture) => {
    if (lecture.id === currentLectureRef.current?.id) return;
    setCurrentLecture(lecture);
    if (playerRef.current?.loadVideoById) {
      playerRef.current.loadVideoById(extractVideoId(lecture.videoUrl));
    }
  }, []);

  const toggleModule = (mId) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      next.has(mId) ? next.delete(mId) : next.add(mId);
      return next;
    });
  };

  const handleViewAssignment = (title) => {
    setActiveAssignmentTitle(title);
    setAssignmentModalOpen(true);
  };

  const handleFeedback = (title) => {
    setActiveAssignmentTitle(title);
    setFeedbackModalOpen(true);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  /* ── Derived ── */
  const currentIndex = allLectures.findIndex((l) => l.id === currentLecture?.id);
  const currentModule = modules.find(
    (m) => m.type === "module" && m.lectures?.some((l) => l.id === currentLecture?.id)
  );
  const completionPct = allLectures.length
    ? Math.round((completed.size / allLectures.length) * 100)
    : 0;
  const isCurrentDone = currentLecture ? completed.has(currentLecture.id) : false;

  const goNext = () => {
    if (currentIndex < allLectures.length - 1) selectLecture(allLectures[currentIndex + 1]);
  };
  const goPrev = () => {
    if (currentIndex > 0) selectLecture(allLectures[currentIndex - 1]);
  };

  /* ── Not Found ── */
  if (!course) {
    return (
      <div className="min-h-screen bg-[#EEF0FC] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-600 mb-4">Course not found</p>
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-2 bg-[#4A6CF7] text-white rounded-lg font-semibold"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  /* ── Render ── */
  return (
    <div className="min-h-screen bg-[#EEF0FC]" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');`}</style>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Modals */}
      <AssignmentModal
        isOpen={assignmentModalOpen}
        onClose={() => {
          setAssignmentModalOpen(false);
          showToast('Assignment submitted successfully! ✅');
        }}
        assignmentTitle={activeAssignmentTitle}
        courseTitle={course.title}
      />
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => {
          setFeedbackModalOpen(false);
          showToast('Feedback sent successfully! 💬');
        }}
        assignmentTitle={activeAssignmentTitle}
      />

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-1.5 text-[13px] text-gray-500">
        <span className="cursor-pointer hover:text-[#4A6CF7]" onClick={() => navigate("/")}>Homepage</span>
        <span className="text-gray-300">›</span>
        <span className="cursor-pointer hover:text-[#4A6CF7]" onClick={() => navigate("/courses")}>Courses</span>
        <span className="text-gray-300">›</span>
        <span className="cursor-pointer hover:text-[#4A6CF7]" onClick={() => navigate(`/course/${course.id}`)}>{course.title}</span>
        <span className="text-gray-300">›</span>
        <span className="text-[#4A6CF7] font-bold">Course Content</span>
      </div>

      {/* ── Progress Bar ── */}
      <div className="bg-white px-6 py-3 flex items-center gap-4 shadow-sm border-b border-gray-100">
        <span className="text-[13px] font-extrabold text-[#1A1A2E] truncate max-w-xs">
          {course.title}
        </span>
        <div className="flex-1 max-w-sm h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${completionPct}%`,
              background: "linear-gradient(to right, #4A6CF7, #10B981)",
            }}
          />
        </div>
        <span className="text-[13px] font-bold text-[#4A6CF7] whitespace-nowrap">
          {completionPct}% complete
        </span>
        <div className="ml-auto flex items-center gap-2 text-[12px] text-gray-500 font-semibold">
          <span className="w-5 h-5 rounded-full bg-[#4A6CF7] text-white flex items-center justify-center text-[10px] font-extrabold">
            {completed.size}
          </span>
          / {allLectures.length} lectures
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex p-6 gap-6" style={{ minHeight: "calc(100vh - 120px)" }}>

        {/* ── Left: Video Panel ── */}
        <div className="flex-1 flex flex-col gap-5 min-w-0">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative bg-black w-full" style={{ paddingTop: "56.25%", maxHeight: 450 }}>
              <div ref={playerDivRef} className="absolute inset-0 w-full h-full" />
              {!playerReady && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0d1a]">
                  <div className="w-10 h-10 rounded-full border-3 border-[#4A6CF7] border-t-transparent mb-2 animate-spin" />
                  <p className="text-white text-xs font-semibold opacity-70">Loading video…</p>
                </div>
              )}
              {playerReady && !isCurrentDone && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <div className="h-full bg-[#4A6CF7] transition-all duration-500" style={{ width: `${watchPercent}%` }} />
                </div>
              )}
            </div>

            <div className="p-5">
              <p className="text-[11px] font-bold text-[#4A6CF7] uppercase tracking-widest mb-1">
                {currentModule?.title}
              </p>
              <h2 className="text-[18px] font-extrabold text-[#1A1A2E] leading-tight mb-3">
                {currentIndex + 1}. {currentLecture?.title}
              </h2>

              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {isCurrentDone ? (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "#ECFDF5", color: "#059669", border: "1px solid #A7F3D0" }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Lecture Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "#FFFBEB", color: "#D97706", border: "1px solid #FCD34D" }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Watch full video to complete
                  </span>
                )}
                {!isCurrentDone && watchPercent > 0 && (
                  <span className="text-[10px] text-gray-400 font-semibold">{watchPercent}% watched</span>
                )}
              </div>

              <div className="flex gap-3">
                <button onClick={goPrev} disabled={currentIndex === 0}
                  className="px-4 py-1.5 rounded-lg text-[12px] font-bold border-2 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={currentIndex > 0 ? { borderColor: "#4A6CF7", color: "#4A6CF7" } : { borderColor: "#E5E7EB", color: "#9CA3AF" }}>
                  ← Previous
                </button>
                <button onClick={goNext} disabled={currentIndex === allLectures.length - 1}
                  className="px-4 py-1.5 rounded-lg text-[12px] font-bold border-2 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed text-white"
                  style={currentIndex < allLectures.length - 1 ? { background: "#4A6CF7", borderColor: "#4A6CF7" } : { background: "#9CA3AF", borderColor: "#9CA3AF" }}>
                  Next →
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="text-[14px] font-extrabold text-[#1A1A2E] mb-2">About This Course</h3>
            <p className="text-[12.5px] text-gray-500 leading-relaxed mb-4">{course.description}</p>
            <div className="flex gap-4 flex-wrap">
              {[
                { label: "Provider", value: course.provider },
                { label: "Duration", value: course.duration },
                { label: "Students", value: course.students },
                { label: "Lessons", value: course.lessons },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl px-3 py-2 text-center min-w-[70px]">
                  <p className="text-[14px] font-extrabold text-[#4A6CF7]">{value}</p>
                  <p className="text-[9px] text-gray-400 font-semibold mt-0.5 uppercase tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Course Content Sidebar ── */}
        <div className="flex-shrink-0 bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden" style={{ width: 360 }}>
          <div className="px-5 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
            <h3 className="text-[14px] font-extrabold text-[#1A1A2E]">Course Content</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${completionPct}%`, background: "linear-gradient(to right, #4A6CF7, #10B981)" }} />
              </div>
              <span className="text-[10px] text-gray-400 font-semibold whitespace-nowrap">{completed.size}/{allLectures.length}</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {modules.map((item) => {
              if (item.type === 'module') {
                const isOpen = expandedModules.has(item.id);
                const doneCount = item.lectures.filter(l => completed.has(l.id)).length;
                const allDone = doneCount === item.lectures.length;

                return (
                  <div key={item.id} className="border-b border-gray-100">
                    <button onClick={() => toggleModule(item.id)}
                      className="w-full px-5 py-3 flex items-start justify-between text-left hover:bg-gray-50 transition-colors">
                      <div className="flex-1 pr-2 min-w-0">
                        <p className="text-[12px] font-extrabold text-[#1A1A2E] leading-snug">{item.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-gray-400 font-semibold">{item.lectures.length} Lectures</span>
                          {allDone ? (
                            <span className="text-[9px] font-bold text-green-500">✓ All done</span>
                          ) : doneCount > 0 ? (
                            <span className="text-[9px] font-bold text-[#4A6CF7]">{doneCount}/{item.lectures.length} done</span>
                          ) : null}
                        </div>
                      </div>
                      <span className="text-gray-400 mt-0.5 flex-shrink-0"><ChevronIcon open={isOpen} /></span>
                    </button>

                    {isOpen && (
                      <div style={{ background: "#F9FAFB" }}>
                        {item.lectures.map((lecture, idx) => {
                          const isActive = lecture.id === currentLecture?.id;
                          const isDone = completed.has(lecture.id);
                          return (
                            <button key={lecture.id} onClick={() => selectLecture(lecture)}
                              className="w-full flex items-center gap-2.5 px-5 py-2.5 text-left transition-all duration-150"
                              style={{ borderLeft: isActive ? "3px solid #4A6CF7" : "3px solid transparent", background: isActive ? "#EEF2FF" : "transparent" }}>
                              <PlayCircle active={isActive} />
                              <div className="flex-1 min-w-0">
                                <p className="text-[11.5px] font-semibold leading-snug truncate"
                                  style={{ color: isActive ? "#4A6CF7" : isDone ? "#6B7280" : "#374151" }}>
                                  {idx + 1}. {lecture.title}
                                </p>
                                {isActive && <p className="text-[9px] font-bold mt-0.5" style={{ color: "#4A6CF7" }}>▶ Now Playing</p>}
                                {isDone && !isActive && <p className="text-[9px] font-bold mt-0.5" style={{ color: "#10B981" }}>✓ Completed</p>}
                                {!isDone && !isActive && <p className="text-[9px] text-gray-400 font-semibold mt-0.5">Watch to unlock</p>}
                              </div>
                              <CheckBox done={isDone} locked={!isDone && !isActive} />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              if (item.type === 'assignment') {
                return (
                  <AssignmentItem
                    key={item.id}
                    item={item}
                    isOpen={expandedModules.has(item.id)}
                    onToggle={() => toggleModule(item.id)}
                    onView={handleViewAssignment}
                    onFeedback={handleFeedback}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}