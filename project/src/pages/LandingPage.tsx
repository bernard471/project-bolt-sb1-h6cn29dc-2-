import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import FeaturedLabs from '@/components/home/FeaturedLabs';
import Footer from '@/components/footer/Footer';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedCourses />
        <FeaturedLabs />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;