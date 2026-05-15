import React from 'react'
import FAQSection from '../components/FAQSection';
import TestimonialsSection from '../components/TestimonialsSection';
import InternshipSection from '../components/InternshipSection';
import CategoriesSection from '../components/CategoriesSection';
import FeaturedCourses from '../components/FeaturedCourses';
import HowItWorks from '../components/HowItWorks';
import HeroSection from '../components/HeroSection';
function Home() {
  return (
    <>
    <HeroSection/>
    <HowItWorks/>
    <FeaturedCourses/>
    <CategoriesSection/>
    <InternshipSection/>
    <TestimonialsSection/>
      <FAQSection/>
    </>
  )
}

export default Home

