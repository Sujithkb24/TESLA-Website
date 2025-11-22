// Blog data for TESLA-SJCE
// Add new blog posts and newsletters here

export const blogPosts = [
  {
    id: 1,
    title: "Upcoming Innovation Summit 2025",
    author: "TESLA Team",
    date: "15 Oct 2025",
    category: "Event",
    tags: ["Innovation", "Technology", "Workshop"],
    excerpt: "Join us for an exciting day of innovation and technology at our annual summit. Connect with industry leaders and explore cutting-edge solutions.",
    image: "/Tesla_photos/Bento_Grid_1.webp",
    content: "Get ready for an extraordinary experience at the Innovation Summit 2025! This flagship event brings together the brightest minds in technology, innovation, and entrepreneurship. Whether you're a student eager to learn or a professional looking to network, this summit offers unparalleled opportunities for growth and collaboration. Mark your calendars and prepare for a day filled with inspiring talks, hands-on workshops, and meaningful connections."
  },
  {
    id: 2,
    title: "Monthly Newsletter - October 2025",
    author: "Editorial Team",
    date: "10 Oct 2025",
    category: "Newsletter",
    tags: ["Newsletter", "Updates"],
    excerpt: "Stay updated with the latest happenings at TESLA-SJCE. This month's highlights include new projects, achievements, and upcoming events.",
    image: "/Tesla_photos/Bento_Grid_2.webp",
    content: "Welcome to October's edition of the TESLA-SJCE newsletter! As we move into the heart of the academic year, our teams have been working tirelessly on exciting projects and initiatives. This month has been particularly eventful with several workshops, technical sessions, and collaborative projects coming to fruition. Read on to discover what we've accomplished and what's on the horizon."
  },
  {
    id: 3,
    title: "Tech Talk: Future of AI in Education",
    author: "Dr. Rajesh Kumar",
    date: "5 Oct 2025",
    category: "Event",
    tags: ["AI", "Education", "Seminar"],
    excerpt: "Explore how artificial intelligence is revolutionizing education. Learn about the latest trends and their impact on learning methodologies.",
    image: "/Tesla_photos/Bento_Grid_3.webp",
    content: "Artificial Intelligence is transforming every aspect of our lives, and education is no exception. Join us for an enlightening tech talk where Dr. Rajesh Kumar, a renowned expert in AI and machine learning, will share insights into how AI is reshaping the educational landscape. From personalized learning experiences to intelligent tutoring systems, discover the technologies that are making education more accessible, effective, and engaging for students worldwide."
  },
  {
    id: 4,
    title: "Student Spotlight: Award Winners",
    author: "TESLA Team",
    date: "1 Oct 2025",
    category: "Newsletter",
    tags: ["Students", "Achievement"],
    excerpt: "Celebrating our students' achievements in national-level competitions. Read about their journey and success stories.",
    image: "/Tesla_photos/Bento_Grid_4.webp",
    content: "Excellence deserves recognition, and this month we're thrilled to shine a spotlight on our exceptional students who have brought laurels to TESLA-SJCE through their outstanding performances in various national-level competitions. Their dedication, innovative thinking, and technical prowess have not only won them accolades but also inspired their peers to push boundaries and strive for excellence. Let's celebrate their achievements and learn from their journeys."
  },
  {
    id: 5,
    title: "Workshop: Web Development Bootcamp",
    author: "Web Team",
    date: "28 Sep 2025",
    category: "Event",
    tags: ["Workshop", "Web Development", "Coding"],
    excerpt: "Learn modern web development from industry experts. Hands-on sessions covering React, Node.js, and full-stack development.",
    image: "/Tesla_photos/Bento_Grid_5.webp",
    content: "Ready to kickstart your journey into web development? Our intensive bootcamp is designed to take you from beginner to confident developer in just a few weeks. Led by experienced professionals from the industry, this workshop covers the complete web development stack including HTML, CSS, JavaScript, React, Node.js, and database management. With hands-on projects and real-world applications, you'll build a portfolio that showcases your skills to potential employers."
  },
  {
    id: 6,
    title: "TESLA Monthly Digest - September 2025",
    author: "Editorial Team",
    date: "25 Sep 2025",
    category: "Newsletter",
    tags: ["Newsletter", "Monthly Digest"],
    excerpt: "A comprehensive roundup of September activities, achievements, and announcements. Don't miss the highlights of this exciting month.",
    image: "/Tesla_photos/Bento_Grid_6.webp",
    content: "September has been an incredible month for TESLA-SJCE! As we welcomed new members and kicked off various initiatives for the academic year, the energy and enthusiasm across all our teams reached new heights. From successful workshop completions to collaborative projects with industry partners, and from technical achievements to community outreach programs, this month has been packed with activities that reflect our commitment to excellence and innovation. Dive into this comprehensive digest to catch up on everything that happened."
  },
  {
    id: 7,
    title: "TESLA Weekly Quiz - September 2025",
    author: "Editorial Team",
    date: "25 Sep 2025",
    category: "Newsletter",
    tags: ["Newsletter", "Weekly Quiz"],
    excerpt: "A comprehensive roundup of September activities, achievements, and announcements. Don't miss the highlights of this exciting month.",
    image: "/Tesla_photos/Bento_Grid_6.webp",
    content: "September has been an incredible month for TESLA-SJCE! As we welcomed new members and kicked off various initiatives for the academic year, the energy and enthusiasm across all our teams reached new heights. From successful workshop completions to collaborative projects with industry partners, and from technical achievements to community outreach programs, this month has been packed with activities that reflect our commitment to excellence and innovation. Dive into this comprehensive digest to catch up on everything that happened."
  },
   {
    id: 8,
    title: "TESLA Weekly Quiz - September 2025",
    author: "Editorial Team",
    date: "25 Sep 2025",
    category: "Newsletter",
    tags: ["Newsletter", "Weekly Quiz"],
    excerpt: "A comprehensive roundup of September activities, achievements, and announcements. Don't miss the highlights of this exciting month.",
    image: "/Tesla_photos/Bento_Grid_6.webp",
    content: "September has been an incredible month for TESLA-SJCE! As we welcomed new members and kicked off various initiatives for the academic year, the energy and enthusiasm across all our teams reached new heights. From successful workshop completions to collaborative projects with industry partners, and from technical achievements to community outreach programs, this month has been packed with activities that reflect our commitment to excellence and innovation. Dive into this comprehensive digest to catch up on everything that happened."
  },
   {
    id: 9,
    title: "TESLA Weekly Quiz - September 2025",
    author: "Editorial Team",
    date: "25 Sep 2025",
    category: "Newsletter",
    tags: ["Newsletter", "Weekly Quiz"],
    excerpt: "A comprehensive roundup of September activities, achievements, and announcements. Don't miss the highlights of this exciting month.",
    image: "/Tesla_photos/Bento_Grid_6.webp",
    content: "September has been an incredible month for TESLA-SJCE! As we welcomed new members and kicked off various initiatives for the academic year, the energy and enthusiasm across all our teams reached new heights. From successful workshop completions to collaborative projects with industry partners, and from technical achievements to community outreach programs, this month has been packed with activities that reflect our commitment to excellence and innovation. Dive into this comprehensive digest to catch up on everything that happened."
  }
];

// Filter functions for easy categorization
export const getEventPosts = () => blogPosts.filter(post => post.category === "Event");
export const getNewsletters = () => blogPosts.filter(post => post.category === "Newsletter");
export const getRecentPosts = (count = 3) => blogPosts.slice(0, count);
