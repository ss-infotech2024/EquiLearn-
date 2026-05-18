import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';

import Profile from './pages/ProfilePage';
import TimelinePage from './pages/TimelinePage';

import CourseContent from './pages/CourseContent';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetails />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="timeline" element={<TimelinePage />} />

            {/* Route now includes :id so CourseContent knows which course to load */}
            <Route path="/course/:id/content" element={<CourseContent />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;