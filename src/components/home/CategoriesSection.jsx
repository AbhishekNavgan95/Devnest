import React from 'react'
import Container from '../common/Container'
import AI from '@/assets/categories/ai.png'
import backend from '@/assets/categories/backend.png'
import career from '@/assets/categories/career.png'
import dsa from '@/assets/categories/dsa.png'
import devops from '@/assets/categories/devops.png'
import frontend from '@/assets/categories/frontend.png'
import mobile from '@/assets/categories/mobile.png'
import system from '@/assets/categories/system.png'
import uiux from '@/assets/categories/ui.png'
import web from '@/assets/categories/web.png'

const categories = [
    {
        name: "Web Development",
        topics: ["HTML & CSS", "JavaScript", "React.js", "Next.js", "MERN Stack"],
        image: web
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
        image: dsa
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
        image: backend
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
        image: devops
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
        image: system
    },
    {
        name: "Open Source & Community",
        topics: [
            "How to Contribute",
            "Good First Issues",
        ],
        image: career
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
        image: AI
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
        image: mobile
    },
    {
        name: "UI/UX Design",
        topics: [
            "Figma Basics",
            "Wireframing",
            "Prototyping",
            "User Research",
            "Design Systems",
        ],
        image: uiux
    },
    {
        name: "Frontend Development",
        topics: [
            "HTML & CSS",
            "JavaScript",
            "React.js",
            "Next.js",
            "MERN Stack",
        ],
        image: frontend
    }
]

const CategoriesSection = () => {
    return (
        <Container>
            <h3 className='text-4xl font-medium'>Learning Categories, Curated for You</h3>
            <div className='grid grid-cols-5 gap-4 mt-8'>
                {
                    categories.map((category, index) => (
                        <div
                            key={index}
                            className="relative flex items-center justify-center px-4 py-6 overflow-hidden border border-dark-700 bg-white rounded-sm shadow-sm transition-shadow duration-200 group hover:shadow-dark-800 cursor-pointer"
                        >
                            {/* Image Layer */}
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-16 h-16 absolute inset-0 m-auto transition-all duration-300 opacity-100 group-hover:opacity-0"
                            />

                            {/* Text Layer */}
                            <h4 className="opacity-0 group-hover:opacity-100 font-medium transition-all duration-300 z-10 text-center">
                                {category.name}
                            </h4>
                        </div>
                    ))
                }
            </div>
        </Container >
    )
}

export default CategoriesSection