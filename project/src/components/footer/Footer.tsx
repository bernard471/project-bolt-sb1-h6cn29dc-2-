import React from 'react';
import { Shield } from 'lucide-react';
import FooterLinks from './FooterLinks';
import FooterNewsletter from './FooterNewsletter';
import FooterSocial from './FooterSocial';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-8 h-8 text-cyan-500" />
              <span className="text-xl font-bold text-white">DK Cyber</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              Empowering cybersecurity professionals with comprehensive training,
              hands-on labs, and a supportive community.
            </p>
            <FooterSocial />
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <FooterLinks />
              <FooterNewsletter />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {currentYear} DK Cyber. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <a href="#privacy" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;