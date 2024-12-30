import React from 'react';

interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

const sections: FooterSection[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Courses', href: '#courses' },
      { label: 'Labs', href: '#labs' },
      { label: 'Community', href: '#community' },
      { label: 'Blog', href: '#blog' },
      { label: 'Certification', href: '#certification' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Partners', href: '#partners' },
      { label: 'Contact', href: '#contact' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#docs' },
      { label: 'Help Center', href: '#help' },
      { label: 'Learning Paths', href: '#paths' },
      { label: 'Newsletter', href: '#newsletter' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'Security', href: '#security' }
    ]
  }
];

const FooterLinks: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {sections.map((section) => (
        <div key={section.title}>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            {section.title}
          </h3>
          <ul className="space-y-3">
            {section.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterLinks;