import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from "./Footer";
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-white text-gray-900">
      <Navbar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
