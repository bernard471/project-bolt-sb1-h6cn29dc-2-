import { Course } from '../types/course';

export const courses: Course[] = [
  {
    id: 1,
    title: "Introduction to Cybersecurity",
    description: "Learn the fundamentals of cybersecurity, including basic concepts, terminology, and best practices for protecting digital assets.",
    level: "Beginner",
    duration: "6 hours",
    durationCategory: "4-8 hours",
    topics: ["Network Security", "Web Security"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    createdAt: "2024-03-15",
    popularity: 95,
    chapters: [
      {
        id: 101,
        title: "Understanding Cybersecurity Basics",
        duration: "1 hour",
        description: "Core concepts and terminology in cybersecurity"
      },
      {
        id: 102,
        title: "Common Security Threats",
        duration: "2 hours",
        description: "Overview of malware, phishing, and social engineering"
      },
      {
        id: 103,
        title: "Basic Security Practices",
        duration: "3 hours",
        description: "Essential security measures for personal and professional use"
      }
    ]
  },
  {
    id: 2,
    title: "Network Security Essentials",
    description: "Master the essential concepts of network security, protocols, and threat detection techniques.",
    level: "Intermediate",
    duration: "8 hours",
    durationCategory: "8+ hours",
    topics: ["Network Security", "Incident Response"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    createdAt: "2024-03-10",
    popularity: 88,
    chapters: [
      {
        id: 201,
        title: "Network Protocols and Security",
        duration: "2 hours",
        description: "Deep dive into TCP/IP, SSL/TLS, and secure protocols"
      },
      {
        id: 202,
        title: "Firewall Configuration",
        duration: "3 hours",
        description: "Setting up and managing network firewalls"
      },
      {
        id: 203,
        title: "Intrusion Detection Systems",
        duration: "3 hours",
        description: "Implementing and monitoring IDS/IPS solutions"
      }
    ]
  },
  {
    id: 3,
    title: "Advanced Penetration Testing",
    description: "Learn advanced techniques for identifying and exploiting security vulnerabilities in systems and applications.",
    level: "Advanced",
    duration: "12 hours",
    durationCategory: "8+ hours",
    topics: ["Web Security", "Malware Analysis"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    createdAt: "2024-03-01",
    popularity: 75,
    chapters: [
      {
        id: 301,
        title: "Advanced Exploitation Techniques",
        duration: "4 hours",
        description: "Advanced vulnerability discovery and exploitation"
      },
      {
        id: 302,
        title: "Web Application Security Testing",
        duration: "4 hours",
        description: "Testing and exploiting web application vulnerabilities"
      },
      {
        id: 303,
        title: "Post-Exploitation and Reporting",
        duration: "4 hours",
        description: "Post-exploitation techniques and professional reporting"
      }
    ]
  }
];