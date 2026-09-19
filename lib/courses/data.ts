import type { Course } from "./types";

// Real, freely-available public course videos (freeCodeCamp and other well-known
// educators). Swap any `videoUrl` below with your own YouTube link — the player
// will fetch the video id via lib/courses/youtube.ts and play inline.
export const seedCourses: Course[] = [
  {
    id: "web-foundations",
    slug: "web-foundations-html-css",
    title: "Web Foundations: HTML & CSS",
    category: "web-development",
    level: "Beginner",
    description:
      "Learn how every website on the internet is built. You will master HTML for structure and CSS for style, then combine them to create beautiful, responsive pages.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-10",
    lessons: [
      {
        id: "html-structure",
        title: "HTML – The Structure of the Web",
        description:
          "A complete tour of HTML5: tags, text, links, images, forms and how to build a web page from scratch.",
        videoUrl: "https://www.youtube.com/watch?v=kUMe1FH4CHE",
        durationMinutes: 247,
      },
      {
        id: "css-styling",
        title: "CSS – Styling It Beautifully",
        description:
          "Selectors, colors, layout, flexbox, grid and modern design techniques to make pages shine.",
        videoUrl: "https://www.youtube.com/watch?v=OXGznpKZ_sA",
        durationMinutes: 668,
      },
      {
        id: "html-crash-course",
        title: "HTML Crash Course",
        description:
          "A fast, focused refresher covering the essentials of HTML and how the web actually works.",
        videoUrl: "https://www.youtube.com/watch?v=qz0aGYrrlhU",
        durationMinutes: 69,
      },
      {
        id: "css-zero-to-hero",
        title: "CSS Zero to Hero",
        description:
          "Apply everything with real projects and learn advanced topics like animations and responsive design.",
        videoUrl: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
        durationMinutes: 360,
      },
    ],
  },
  {
    id: "python-basics",
    slug: "python-programming-basics",
    title: "Python Programming from Scratch",
    category: "python",
    level: "Beginner",
    description:
      "The most beginner-friendly programming language on earth. Write your first programs, build fun projects and think like a programmer.",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-12",
    lessons: [
      {
        id: "python-fundamentals",
        title: "Python Fundamentals",
        description:
          "Variables, strings, user input, functions, classes and your first programs — from zero to a solid foundation.",
        videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
        durationMinutes: 267,
      },
      {
        id: "python-projects",
        title: "Python Beginner Projects",
        description:
          "Code a rock-paper-scissors game and more, line by line, to turn concepts into real code.",
        videoUrl: "https://www.youtube.com/watch?v=eWRfhZUzrAc",
        durationMinutes: 280,
      },
    ],
  },
  {
    id: "javascript-fundamentals",
    slug: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    category: "web-development",
    level: "Beginner",
    description:
      "Bring web pages to life. Learn the language that powers interactivity on the web and unlocks modern frontend frameworks.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-14",
    lessons: [
      {
        id: "js-full-course",
        title: "Learn JavaScript – Full Course for Beginners",
        description:
          "134 bite-sized lessons covering variables, functions, loops, arrays, objects and DOM manipulation.",
        videoUrl: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
        durationMinutes: 207,
      },
    ],
  },
  {
    id: "ml-everybody",
    slug: "introduction-to-machine-learning",
    title: "Introduction to Machine Learning",
    category: "ai",
    level: "Beginner",
    description:
      "An accessible tour of machine learning for absolute beginners. Learn the math and logic behind the models and code them with TensorFlow.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-16",
    lessons: [
      {
        id: "ml-for-everybody",
        title: "Machine Learning for Everybody",
        description:
          "Supervised and unsupervised learning, K-Nearest Neighbors, Naive Bayes, neural networks and more — all beginner friendly.",
        videoUrl: "https://www.youtube.com/watch?v=i_LwzRVP7bg",
        durationMinutes: 120,
      },
    ],
  },
  {
    id: "full-stack-roadmap",
    slug: "full-stack-web-development",
    title: "Full-Stack Web Development",
    category: "web-development",
    level: "Intermediate",
    description:
      "Go end-to-end: build a frontend with HTML, CSS and JavaScript, then add a backend API and database to ship a complete web app.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-18",
    lessons: [
      {
        id: "full-stack-course",
        title: "Full Stack Web Development for Beginners",
        description:
          "HTML, CSS, JavaScript, Node.js and MongoDB — build a movie app with a reviews API from scratch.",
        videoUrl: "https://www.youtube.com/watch?v=nu_pCVPKzTk",
        durationMinutes: 449,
      },
    ],
  },
  {
    id: "web-design-figma",
    slug: "web-design-with-figma",
    title: "Digital Design with Figma",
    category: "design",
    level: "Beginner",
    description:
      "Design like a pro. Master Figma from interface basics to professional, high-fidelity prototypes and a production-ready portfolio.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-20",
    lessons: [
      {
        id: "figma-full-course",
        title: "Learn Figma in 6 Hours",
        description:
          "Figma tools, style guides, wireframes, components, Auto Layout and real projects like travel and food-delivery apps.",
        videoUrl: "https://www.youtube.com/watch?v=mT_Jjn8RJdo",
        durationMinutes: 360,
      },
    ],
  },
  {
    id: "git-github",
    slug: "git-and-github-beginners",
    title: "Git & GitHub for Beginners",
    category: "digital-literacy",
    level: "Beginner",
    description:
      "Version control is the superpower every developer needs. Learn Git from the ground up and collaborate confidently on GitHub.",
    image:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-22",
    lessons: [
      {
        id: "learn-git-full",
        title: "Learn Git – Full Course for Beginners",
        description:
          "Commits, branches, merging, rebasing and pushing to GitHub — everything you need to manage code like a professional.",
        videoUrl: "https://www.youtube.com/watch?v=zTjRZNkhiEU",
        durationMinutes: 240,
      },
      {
        id: "git-github-crash",
        title: "Git & GitHub Crash Course",
        description:
          "A modern refresher on workflows, pull requests and open-source collaboration.",
        videoUrl: "https://www.youtube.com/watch?v=mAFoROnOfHs",
        durationMinutes: 60,
      },
    ],
  },
];