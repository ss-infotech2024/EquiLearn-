import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { courses } from "../data/courses";

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
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
    { label: "Loops & Core Concepts",      range: [2, 4] },
    { label: "Advanced Concepts",           range: [4, 6] },
    { label: "Projects & Real-World",       range: [6, 8] },
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

/* ─── Icons ──────────────────────────────────────────────────────────────── */
const ChevronIcon = ({ open }) => (
  <svg
    width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
  >
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
  <div
    style={{
      width: 20, height: 20, borderRadius: 5, flexShrink: 0,
      border: done ? "2px solid #4A6CF7" : locked ? "2px solid #E5E7EB" : "2px solid #D1D5DB",
      background: done ? "#4A6CF7" : "white",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all 0.2s",
    }}
  >
    {done && (
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" />
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

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function CourseContent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === parseInt(id));

  /* ── Module & Lecture Data ── */
  const modules = course ? buildModules(course) : [];
  const allLectures = modules.filter((m) => m.type === "module").flatMap((m) => m.lectures);

  /* ── State ── */
  const [currentLecture, setCurrentLecture] = useState(allLectures[0] || null);
  const [completed, setCompleted]           = useState(new Set());
  const [expandedModules, setExpandedModules] = useState(new Set([0]));
  const [playerReady, setPlayerReady]       = useState(false);
  const [watchPercent, setWatchPercent]     = useState(0);

  const playerRef         = useRef(null);
  const playerDivRef      = useRef(null);
  const currentLectureRef = useRef(currentLecture);
  const watchTimerRef     = useRef(null);

  /* keep ref in sync */
  useEffect(() => {
    currentLectureRef.current = currentLecture;
    setWatchPercent(0);
  }, [currentLecture]);

  /* ── YouTube IFrame API ─────────────────────────────────────────────────── */
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

  /* ── Select Lecture ── */
  const selectLecture = useCallback(
    (lecture) => {
      if (lecture.id === currentLectureRef.current?.id) return;
      setCurrentLecture(lecture);
      if (playerRef.current?.loadVideoById) {
        playerRef.current.loadVideoById(extractVideoId(lecture.videoUrl));
      }
    },
    []
  );

  const toggleModule = (mId) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      next.has(mId) ? next.delete(mId) : next.add(mId);
      return next;
    });
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
    <div
      className="min-h-screen bg-[#EEF0FC]"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');`}</style>

      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-1.5 text-[13px] text-gray-500">
        <span className="cursor-pointer hover:text-[#4A6CF7]" onClick={() => navigate("/")}>Homepage</span>
        <span className="text-gray-300">›</span>
        <span className="cursor-pointer hover:text-[#4A6CF7]" onClick={() => navigate("/courses")}>Courses</span>
        <span className="text-gray-300">›</span>
        <span className="cursor-pointer hover:text-[#4A6CF7]" onClick={() => navigate(`/course/${course.id}`)}>{course.title}</span>
        <span className="text-gray-300">›</span>
        <span className="text-[#4A6CF7] font-bold">Course Content</span>
      </div>

      {/* ── Progress Bar ─────────────────────────────────────────────────── */}
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

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="flex p-6 gap-6" style={{ minHeight: "calc(100vh - 120px)" }}>

        {/* ── Left: Video Panel ─────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-5 min-w-0">

          {/* Video Container with smaller frame and margins */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Smaller Video Container (4:3 ratio for smaller frame) */}
            <div className="relative bg-black w-full" style={{ paddingTop: "56.25%", maxHeight: 450 }}>
              <div ref={playerDivRef} className="absolute inset-0 w-full h-full" />

              {/* Loading overlay */}
              {!playerReady && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0d1a]">
                  <div
                    className="w-10 h-10 rounded-full border-3 border-[#4A6CF7] border-t-transparent mb-2"
                    style={{ animation: "spin 0.9s linear infinite" }}
                  />
                  <p className="text-white text-xs font-semibold opacity-70">Loading video…</p>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
              )}

              {/* Watch progress bar at bottom of video */}
              {playerReady && !isCurrentDone && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <div
                    className="h-full bg-[#4A6CF7] transition-all duration-500"
                    style={{ width: `${watchPercent}%` }}
                  />
                </div>
              )}
            </div>

            {/* Lecture Info with padding */}
            <div className="p-5">
              <p className="text-[11px] font-bold text-[#4A6CF7] uppercase tracking-widest mb-1">
                {currentModule?.title}
              </p>
              <h2 className="text-[18px] font-extrabold text-[#1A1A2E] leading-tight mb-3">
                {currentIndex + 1}. {currentLecture?.title}
              </h2>

              {/* Status badge */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {isCurrentDone ? (
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "#ECFDF5", color: "#059669", border: "1px solid #A7F3D0" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Lecture Completed
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "#FFFBEB", color: "#D97706", border: "1px solid #FCD34D" }}
                  >
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Watch full video to complete
                  </span>
                )}

                {!isCurrentDone && watchPercent > 0 && (
                  <span className="text-[10px] text-gray-400 font-semibold">
                    {watchPercent}% watched
                  </span>
                )}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  className="px-4 py-1.5 rounded-lg text-[12px] font-bold border-2 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={currentIndex > 0 ? { borderColor: "#4A6CF7", color: "#4A6CF7" } : { borderColor: "#E5E7EB", color: "#9CA3AF" }}
                >
                  ← Previous
                </button>
                <button
                  onClick={goNext}
                  disabled={currentIndex === allLectures.length - 1}
                  className="px-4 py-1.5 rounded-lg text-[12px] font-bold border-2 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed text-white"
                  style={
                    currentIndex < allLectures.length - 1
                      ? { background: "#4A6CF7", borderColor: "#4A6CF7" }
                      : { background: "#9CA3AF", borderColor: "#9CA3AF" }
                  }
                >
                  Next →
                </button>
              </div>
            </div>
          </div>

          {/* About section with margin */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="text-[14px] font-extrabold text-[#1A1A2E] mb-2">About This Course</h3>
            <p className="text-[12.5px] text-gray-500 leading-relaxed mb-4">{course.description}</p>

            <div className="flex gap-4 flex-wrap">
              {[
                { label: "Provider",  value: course.provider },
                { label: "Duration",  value: course.duration },
                { label: "Students",  value: course.students },
                { label: "Lessons",   value: course.lessons },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl px-3 py-2 text-center min-w-[70px]">
                  <p className="text-[14px] font-extrabold text-[#4A6CF7]">{value}</p>
                  <p className="text-[9px] text-gray-400 font-semibold mt-0.5 uppercase tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Course Content Sidebar ────────────────────────────── */}
        <div
          className="flex-shrink-0 bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden"
          style={{ width: 360 }}
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
            <h3 className="text-[14px] font-extrabold text-[#1A1A2E]">Course Content</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${completionPct}%`,
                    background: "linear-gradient(to right, #4A6CF7, #10B981)",
                  }}
                />
              </div>
              <span className="text-[10px] text-gray-400 font-semibold whitespace-nowrap">
                {completed.size}/{allLectures.length}
              </span>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            {modules.map((item) => {
              /* ── Module Block ── */
              if (item.type === "module") {
                const isOpen = expandedModules.has(item.id);
                const doneCount = item.lectures.filter((l) => completed.has(l.id)).length;
                const allDone = doneCount === item.lectures.length;

                return (
                  <div key={item.id} className="border-b border-gray-100">
                    {/* Module header */}
                    <button
                      onClick={() => toggleModule(item.id)}
                      className="w-full px-5 py-3 flex items-start justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 pr-2 min-w-0">
                        <p className="text-[12px] font-extrabold text-[#1A1A2E] leading-snug">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-gray-400 font-semibold">
                            {item.lectures.length} Lectures
                          </span>
                          {allDone ? (
                            <span className="text-[9px] font-bold text-green-500">✓ All done</span>
                          ) : doneCount > 0 ? (
                            <span className="text-[9px] font-bold text-[#4A6CF7]">{doneCount}/{item.lectures.length} done</span>
                          ) : null}
                        </div>
                      </div>
                      <span className="text-gray-400 mt-0.5 flex-shrink-0">
                        <ChevronIcon open={isOpen} />
                      </span>
                    </button>

                    {/* Lectures list */}
                    {isOpen && (
                      <div style={{ background: "#F9FAFB" }}>
                        {item.lectures.map((lecture, idx) => {
                          const isActive = lecture.id === currentLecture?.id;
                          const isDone   = completed.has(lecture.id);

                          return (
                            <button
                              key={lecture.id}
                              onClick={() => selectLecture(lecture)}
                              className="w-full flex items-center gap-2.5 px-5 py-2.5 text-left transition-all duration-150"
                              style={{
                                borderLeft: isActive ? "3px solid #4A6CF7" : "3px solid transparent",
                                background: isActive ? "#EEF2FF" : "transparent",
                              }}
                            >
                              <PlayCircle active={isActive} />

                              <div className="flex-1 min-w-0">
                                <p
                                  className="text-[11.5px] font-semibold leading-snug truncate"
                                  style={{ color: isActive ? "#4A6CF7" : isDone ? "#6B7280" : "#374151" }}
                                >
                                  {idx + 1}. {lecture.title}
                                </p>
                                {isActive && (
                                  <p className="text-[9px] font-bold mt-0.5" style={{ color: "#4A6CF7" }}>
                                    ▶ Now Playing
                                  </p>
                                )}
                                {isDone && !isActive && (
                                  <p className="text-[9px] font-bold mt-0.5" style={{ color: "#10B981" }}>
                                    ✓ Completed
                                  </p>
                                )}
                                {!isDone && !isActive && (
                                  <p className="text-[9px] text-gray-400 font-semibold mt-0.5">
                                    Watch to unlock
                                  </p>
                                )}
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

              /* ── Assignment Block ── */
              if (item.type === "assignment") {
                const isOpen = expandedModules.has(item.id);
                return (
                  <div key={item.id} className="border-b border-gray-100">
                    <button
                      onClick={() => toggleModule(item.id)}
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
                                className="flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded transition-colors"
                                style={{ background: "#EEF2FF", color: "#4A6CF7", border: "1px solid #C7D2FE" }}
                              >
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                                </svg>
                                View
                              </button>
                              <button
                                className="flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded transition-colors"
                                style={{ background: "#F0FDF4", color: "#16A34A", border: "1px solid #BBF7D0" }}
                              >
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
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
              }

              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}