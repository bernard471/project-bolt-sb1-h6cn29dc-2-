import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Shield, User, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'courses', label: 'Courses', path: '/courses' },
    { id: 'labs', label: 'Labs', path: '/labs' },
    { id: 'mentorship', label: 'Mentorship', path: '/mentorship' },
    { id: 'community', label: 'Community', path: '/community' },
    { id: 'blog', label: 'Blog', path: '/blog' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-slate-900 text-white py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => handleNavigation('/')}
          >
            <Shield className="w-8 h-8 text-cyan-500" />
            <span className="text-xl font-bold">DK Cyber</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className="hover:text-cyan-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button 
              className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors"
              onClick={() => handleNavigation('/auth')}
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className="block w-full text-left py-2 hover:text-cyan-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button 
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors w-full"
              onClick={() => handleNavigation('/auth')}
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;