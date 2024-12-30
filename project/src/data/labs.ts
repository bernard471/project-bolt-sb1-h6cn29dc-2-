import { Lab } from '../types/lab';

export const labs: Lab[] = [
  {
    id: 1,
    title: "Network Traffic Analysis",
    description: "Learn to analyze network packets using Wireshark to identify potential security threats and malicious activities.",
    difficulty: "Easy",
    duration: "45 mins",
    points: 100,
    topics: ["Network Security", "Traffic Analysis"],
    prerequisites: ["Basic Networking"],
    tools: ["Wireshark"]
  },
  {
    id: 2,
    title: "Web Application Vulnerabilities",
    description: "Identify and exploit common web vulnerabilities in a safe environment. Practice SQL injection, XSS, and CSRF attacks.",
    difficulty: "Medium",
    duration: "1.5 hours",
    points: 250,
    topics: ["Web Security", "Penetration Testing"],
    prerequisites: ["Basic Web Development", "HTTP Protocol"],
    tools: ["Burp Suite", "OWASP ZAP"]
  },
  {
    id: 3,
    title: "Incident Response Simulation",
    description: "Handle a simulated security breach and practice incident response procedures in a realistic environment.",
    difficulty: "Hard",
    duration: "2 hours",
    points: 500,
    topics: ["Incident Response", "Digital Forensics"],
    prerequisites: ["Network Security", "System Administration"],
    tools: ["Volatility", "Wireshark", "Log Analysis Tools"]
  }
];