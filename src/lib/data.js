import image1 from "../assets/profiles/image1.png";
import image2 from "../assets/profiles/image2.png";
import image3 from "../assets/profiles/image3.png";
import image4 from "../assets/profiles/image4.png";
import image5 from "../assets/profiles/image5.png";
import image6 from "../assets/profiles/image6.png";
import image7 from "../assets/profiles/image7.png";
import image8 from "../assets/profiles/image8.png";
import image9 from "../assets/profiles/image9.png";
import { FaRegUserCircle } from "react-icons/fa";
import { FaListUl } from "react-icons/fa6";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { GrGroup } from "react-icons/gr";
import { IoCodeSlash } from "react-icons/io5";
import { LuFolderHeart } from "react-icons/lu";

export const categories = [
  {
    name: "Web Development",
    topics: ["HTML & CSS", "JavaScript", "React.js", "Next.js", "MERN Stack"],
  },
  {
    name: "Data Structures & Algorithms",
    topics: [
      "Arrays & Strings",
      "Linked Lists",
      "Trees & Graphs",
      "Dynamic Programming",
      "Time & Space Complexity",
    ],
  },
  {
    name: "Backend Development",
    topics: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Authentication & JWT",
      "Database Integration (MongoDB, SQL)",
    ],
  },
  {
    name: "DevOps & Deployment",
    topics: [
      "Git & GitHub",
      "CI/CD Pipelines",
      "Docker Basics",
      "Vercel/Netlify/Render",
      "GitHub Actions",
    ],
  },
  {
    name: "Interview Prep",
    topics: [
      "System Design Basics",
      "Behavioral Questions",
      "Resume & Portfolio Tips",
      "Coding Rounds",
      "HR Round Mock",
    ],
  },
  {
    name: "Open Source & Community",
    topics: [
      "How to Contribute",
      "Good First Issues",
      "Hacktoberfest",
      "Devnest Projects",
      "Community Guidelines",
    ],
  },
  {
    name: "AI & Machine Learning",
    topics: [
      "Python for ML",
      "Pandas & NumPy",
      "Supervised Learning",
      "Neural Networks",
      "Real-world Projects",
    ],
  },
  {
    name: "Mobile App Dev",
    topics: [
      "React Native",
      "Flutter Basics",
      "Firebase Integration",
      "Navigation & State",
      "Publishing Apps",
    ],
  },
];

export const aboutUsReviews = [
  // ~20 words
  {
    image: image1,
    name: "John Doe",
    review:
      "This platform changed my learning game. The courses are clear, practical, and easy to follow. Great experience overall.",
    role: "student",
  },
  {
    image: image6,
    name: "Emily Johnson",
    review:
      "Being part of this platform as an instructor has been rewarding. I can easily track student engagement, update course content, and respond to questions without switching between tools.",
    role: "instructor",
  },
  {
    image: image8,
    name: "Hannah Lee",
    review:
      "I started as a beginner student and, thanks to this platform, eventually became confident enough to teach my own content. The journey has been empowering. The tools, the team, and the learners here all create a positive ecosystem that encourages you to keep learning, growing, and sharing knowledge in return.",
    role: "instructor",
  },
  {
    image: image9,
    name: "Mohammed Zaid",
    review:
      "Helpful instructors and quality content made my learning easy and enjoyable. The hands-on approach really helped me understand concepts.",
    role: "student",
  },

  // ~40 words
  {
    image: image2,
    name: "Sarah Malik",
    review:
      "As an instructor, managing my lessons here is a breeze. The editor, analytics, and student feedback tools are intuitive and fast. I feel like I can truly focus on delivering great content without worrying about the platform.",
    role: "instructor",
  },
  {
    image: image7,
    name: "Ravi Kapoor",
    review:
      "The projects helped me gain real confidence. I finished two full-stack courses and built a portfolio I now share with potential employers. It’s more than a course site—it’s a career starter if used well.",
    role: "student",
  },
  {
    image: image5,
    name: "Carlos Mendes",
    review:
      "I like how each course builds on the last. The instructors explain even complex things in a way that clicks. The platform’s design and pace really keep me motivated, even after long days at work.",
    role: "student",
  },

  // ~60 words
  {
    image: image3,
    name: "Amit Ranjan",
    review:
      "This platform exceeded all my expectations. I joined with no prior tech knowledge, and within weeks, I built my own React application and even deployed it. What makes it special is the combination of real projects, mentorship, and clear video instructions. You actually build confidence as you go, and it doesn’t feel like typical online learning at all.",
    role: "student",
  },

  {
    image: image4,
    name: "Lisa Wong",
    review:
      "Uploading my course was smooth. The dashboard is simple and effective. Great support from the team throughout the journey.",
    role: "instructor",
  },
];

export const phoneCodes = [
  "+1", // USA, Canada
  "+7", // Russia, Kazakhstan
  "+20", // Egypt
  "+27", // South Africa
  "+30", // Greece
  "+31", // Netherlands
  "+32", // Belgium
  "+33", // France
  "+34", // Spain
  "+36", // Hungary
  "+39", // Italy
  "+40", // Romania
  "+41", // Switzerland
  "+43", // Austria
  "+44", // United Kingdom
  "+45", // Denmark
  "+46", // Sweden
  "+47", // Norway
  "+48", // Poland
  "+49", // Germany
  "+51", // Peru
  "+52", // Mexico
  "+53", // Cuba
  "+54", // Argentina
  "+55", // Brazil
  "+56", // Chile
  "+57", // Colombia
  "+58", // Venezuela
  "+60", // Malaysia
  "+61", // Australia
  "+62", // Indonesia
  "+63", // Philippines
  "+64", // New Zealand
  "+65", // Singapore
  "+66", // Thailand
  "+81", // Japan
  "+82", // South Korea
  "+84", // Vietnam
  "+86", // China
  "+90", // Turkey
  "+91", // India
  "+92", // Pakistan
  "+93", // Afghanistan
  "+94", // Sri Lanka
  "+95", // Myanmar
  "+98", // Iran
  "+211", // South Sudan
  "+212", // Morocco
  "+213", // Algeria
  "+216", // Tunisia
  "+218", // Libya
  "+220", // Gambia
  "+221", // Senegal
  "+234", // Nigeria
  "+254", // Kenya
  "+255", // Tanzania
  "+256", // Uganda
  "+260", // Zambia
  "+263", // Zimbabwe
];

export const queryTypes = [
  "General Inquiry",
  "Technical Support",
  "Billing & Payments",
  "Feedback & Suggestions",
  "Partnership Request",
  "Report a Bug",
  "Account Issues",
];

export const commonDashboardRoutes = [
  {
    title: "Community",
    route: "/dashboard/community",
    icon: GrGroup,
  },
  {
    title: "CodeSpace",
    route: "/dashboard/codespace",
    icon: IoCodeSlash,
  },
];

export const userRoutes = {
  Student: [
    {
      title: "Profile",
      route: "/dashboard/profile",
      icon: FaRegUserCircle,
    },
    {
      title: "Enrolled Courses",
      route: "/dashboard/enrolled-courses",
      icon: FaListUl,
    },
    {
      title: "Wishlist",
      route: "/dashboard/wishlist",
      icon: LuFolderHeart,
    },
  ],
  Admin: [],
  Instructor: [
    {
      title: "Profile",
      route: "/dashboard/profile",
      icon: FaRegUserCircle,
    },
    {
      title: "My Courses",
      route: "/dashboard/courses",
      icon: FaListUl,
    },
    {
      title: "Craete new Course",
      route: "/dashboard/create",
      icon: MdOutlineCreateNewFolder,
    },
    {
      title: "Analytics",
      route: "/dashboard/analytics",
      icon: TbBrandGoogleAnalytics,
    },
  ],
};
