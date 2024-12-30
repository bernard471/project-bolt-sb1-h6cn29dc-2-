import { Author, BlogPost } from '../types/blog';

export const authors: Author[] = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Security Researcher",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    bio: "Cybersecurity researcher specializing in threat intelligence and malware analysis."
  },
  {
    id: 2,
    name: "Emma Chen",
    role: "Security Engineer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    bio: "Senior security engineer with expertise in application security and penetration testing."
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding Zero Trust Architecture",
    excerpt: "Learn about the principles of Zero Trust and how to implement it in your organization.",
    content: "Zero Trust is a security concept centered on the belief that organizations should not automatically trust anything inside or outside its perimeters...",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    author: authors[0],
    publishedAt: "2024-03-15T08:00:00Z",
    readingTime: "6 min",
    category: "Analysis",
    tags: ["Zero Trust", "Security Architecture", "Enterprise Security"],
    views: 1250,
    likes: 89
  },
  {
    id: 2,
    title: "Advanced Web Application Security Testing",
    excerpt: "A comprehensive guide to modern web application security testing techniques.",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    content: "Web application security testing has evolved significantly with the emergence of modern frameworks and architectures...",
    author: authors[1],
    publishedAt: "2024-03-14T10:30:00Z",
    readingTime: "8 min",
    category: "Tutorials",
    tags: ["Web Security", "Penetration Testing", "OWASP"],
    views: 856,
    likes: 67
  }
];