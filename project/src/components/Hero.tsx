import React from 'react';
import { Shield, ArrowRight, BookOpen, Users, Award, Target } from 'lucide-react';
import Stats from './home/Stats';

const Hero = () => {
  const scrollToCourses = () => {
    const coursesSection = document.getElementById('courses');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQ4YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnptMC0xMmMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] animate-[drift_30s_linear_infinite]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-600/20 text-cyan-400 text-sm">
              <Shield className="w-4 h-4" />
              Trusted by 10,000+ cybersecurity professionals
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Master <span className="text-cyan-400">Cybersecurity</span> Skills
              <br />From Beginner to Expert
            </h1>
            
            <p className="text-lg text-gray-300 max-w-xl">
              Join our comprehensive platform featuring expert-led courses, hands-on labs,
              and a thriving community of cybersecurity professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToCourses}
                className="group px-8 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Start Learning 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={scrollToCourses}
                className="px-8 py-3 border border-cyan-600 text-cyan-400 hover:bg-cyan-600/10 rounded-lg font-semibold transition-colors"
              >
                View Courses
              </button>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors">
                <BookOpen className="w-8 h-8 text-cyan-500 mb-3" />
                <h3 className="text-xl font-semibold mb-2">80+ Courses</h3>
                <p className="text-gray-400">Comprehensive learning paths</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors">
                <Target className="w-8 h-8 text-cyan-500 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Hands-on Labs</h3>
                <p className="text-gray-400">Practice in real environments</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors">
                <Users className="w-8 h-8 text-cyan-500 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-400">Connect with experts</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors">
                <Award className="w-8 h-8 text-cyan-500 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Certification</h3>
                <p className="text-gray-400">Industry-recognized certificates</p>
              </div>
            </div>
          </div>
        </div>

        <Stats />
      </div>
    </div>
  );
};

export default Hero;