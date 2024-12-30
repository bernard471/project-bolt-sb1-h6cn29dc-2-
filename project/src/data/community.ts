import { Post, User } from '../types/community';

export const users: User[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Expert",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    reputation: 1250,
    joinedDate: "2023-09-15"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Professional",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    reputation: 850,
    joinedDate: "2023-11-20"
  }
];

export const posts: Post[] = [
  {
    id: 1,
    title: "Best practices for secure API authentication?",
    content: "I'm building a REST API and want to implement secure authentication. What are the current best practices for API authentication and authorization?",
    category: "Question",
    author: users[0],
    createdAt: "2024-03-15T10:30:00Z",
    likes: 24,
    replies: 8,
    views: 156,
    tags: ["API Security", "Authentication", "Best Practices"]
  },
  {
    id: 2,
    title: "Upcoming Cybersecurity Conference 2024",
    content: "Join us for the annual cybersecurity conference featuring expert speakers, workshops, and networking opportunities.",
    category: "Event",
    author: users[1],
    createdAt: "2024-03-14T15:45:00Z",
    likes: 45,
    replies: 12,
    views: 320,
    tags: ["Conference", "Networking", "Professional Development"]
  }
];