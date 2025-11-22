# Blog Feature - TESLA-SJCE Website

## Overview
The blog page allows you to showcase upcoming events and newsletters with a modern, responsive design that matches the TESLA-SJCE website's color scheme (black background with gold/yellow accents). Each blog post has its own dedicated page with full content display.

## Features
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Category Filtering**: Filter between Events, Newsletters, or view all posts
- **Search Functionality**: Search posts by title, excerpt, or tags
- **Individual Post Pages**: Each blog post has a dedicated page with full content
- **Related Posts**: Shows related articles based on category
- **Social Sharing**: Share posts on Facebook, Twitter, WhatsApp, and LinkedIn
- **Email Subscription**: Newsletter subscription form in the hero section
- **Smooth Animations**: Framer Motion animations for engaging user experience
- **Modern UI**: Cards with hover effects, gradient borders, and smooth transitions

## How to Add New Blog Posts or Newsletters

### Step 1: Open the Blog Data File
Navigate to: `client/src/data/blogData.js`

### Step 2: Add Your New Post
Add a new object to the `blogPosts` array following this format:

```javascript
{
  id: 7, // Increment this number for each new post
  title: "Your Blog Title Here",
  author: "Author Name",
  date: "DD MMM YYYY", // Example: "15 Oct 2025"
  category: "Event", // Use "Event" or "Newsletter"
  tags: ["Tag1", "Tag2", "Tag3"], // Array of relevant tags
  excerpt: "A brief description of your blog post (2-3 sentences). This will appear on the card preview.",
  image: "/path/to/image.webp", // Image path from public folder
  content: "The main content paragraph that introduces your blog post. This appears at the top of the individual post page and provides context about the topic. Make it engaging and informative!"
}
```

**Important:** The `content` field is what appears in the individual blog post page. Write a compelling introduction paragraph (2-4 sentences) that gives readers context about the post. The page template will automatically add structured sections for events or newsletters.

### Example: Adding an Event Post

```javascript
{
  id: 7,
  title: "Robotics Workshop - November 2025",
  author: "Technical Team",
  date: "12 Nov 2025",
  category: "Event",
  tags: ["Robotics", "Workshop", "Hands-on"],
  excerpt: "Join us for an intensive robotics workshop where you'll learn to build and program autonomous robots. Perfect for beginners and enthusiasts alike.",
  image: "/Tesla_photos/Bento_Grid_7.webp",
  content: "Ready to dive into the world of robotics? Our comprehensive workshop is designed to give you hands-on experience with building and programming autonomous robots. Whether you're a complete beginner or have some experience, our expert instructors will guide you through every step of creating your own robot."
}
```

### Example: Adding a Newsletter

```javascript
{
  id: 8,
  title: "TESLA Monthly Newsletter - November 2025",
  author: "Editorial Team",
  date: "1 Nov 2025",
  category: "Newsletter",
  tags: ["Newsletter", "Updates", "Monthly"],
  excerpt: "This month's edition covers our latest projects, upcoming events, and spotlight on outstanding member contributions. Stay informed with all things TESLA.",
  image: "/Tesla_photos/About_us-1.webp",
  content: "Welcome to November's edition! As we approach the end of the year, our teams have been working on some incredible projects. This newsletter highlights our recent achievements, upcoming events, and introduces you to some of our standout members who have made significant contributions to TESLA-SJCE."
}
```

## Image Guidelines

### Where to Place Images
- Place blog images in: `client/public/Tesla_photos/`
- Or use existing images from the public folder

### Recommended Image Specifications
- **Format**: WebP (for better performance) or JPG/PNG
- **Dimensions**: Minimum 800x600px (landscape orientation works best)
- **File Size**: Keep under 500KB for optimal loading
- **Aspect Ratio**: 4:3 or 16:9 recommended

### Using Images in Blog Posts
```javascript
// If image is in public/Tesla_photos/
image: "/Tesla_photos/your-image.webp"

// If image is in public root
image: "/your-image.webp"
```

## Category Guidelines

### Event Posts
Use `category: "Event"` for:
- Workshops
- Seminars
- Competitions
- Tech talks
- Conferences
- Meetups

### Newsletter Posts
Use `category: "Newsletter"` for:
- Monthly digests
- Team updates
- Achievement highlights
- General announcements
- Quarterly reports

## Tags Best Practices

**Good Tags:**
- Technology names: "AI", "Robotics", "Web Development"
- Event types: "Workshop", "Seminar", "Competition"
- Topics: "Innovation", "Research", "Career"

**Keep It Simple:**
- Use 2-5 tags per post
- Make tags specific but not too narrow
- Use consistent capitalization

## File Structure

```
client/
├── src/
│   ├── pages/
│   │   ├── Blog.jsx           # Main blog listing page
│   │   └── BlogPost.jsx       # Individual blog post page
│   ├── components/
│   │   └── BlogCard.jsx       # Blog card component for listings
│   └── data/
│       └── blogData.js        # Blog posts data (EDIT THIS FILE)
└── public/
    └── Tesla_photos/          # Store blog images here
```

## Individual Blog Post Pages

When users click "Read More" on any blog card, they're taken to a dedicated page (`/blog/:id`) that includes:

### For Events:
- Full-screen hero image with overlay
- Event title, author, date, and tags
- Highlighted excerpt in a styled callout box
- Detailed sections about:
  - What to expect
  - Who should attend
  - Registration information
  - Important details (date, venue, contact)
- Related events
- Social sharing buttons

### For Newsletters:
- Full-screen hero image with overlay
- Newsletter title, author, date, and tags
- Highlighted excerpt in a styled callout box
- Detailed sections about:
  - Newsletter highlights
  - Team updates
  - Looking ahead
  - How to stay connected
- Related newsletters
- Social sharing buttons

### Navigation Features:
- **Back to Blog** button at the top
- **Related Posts** at the bottom (shows 3 posts from same category)
- **Share buttons** for social media
- **Call-to-action** section with links to Events page and Contact
- Smooth scroll-to-top when navigating between posts

## Color Scheme

The blog page uses the TESLA-SJCE color palette:
- **Background**: Black (`#000000`)
- **Cards**: Dark gradient (zinc-900 to black)
- **Primary Accent**: Yellow/Gold (`#C9A154`, `#DAA520`)
- **Text**: White with gray variations
- **Borders**: Zinc-800 with yellow hover effects

## Future Enhancements

You can easily extend the blog feature with:
1. **Individual Blog Post Pages**: Add detailed views for each post
2. **Comments Section**: Allow user engagement
3. **Blog Post Editor**: Admin interface to add posts without coding
4. **Categories Expansion**: Add more categories as needed
5. **Pagination**: When you have many posts
6. **RSS Feed**: For blog subscribers
7. **Social Sharing**: Share buttons for each post

## Testing Your Changes

After adding new posts:
1. Save `blogData.js`
2. The development server will auto-reload
3. Visit `http://localhost:5173/blog`
4. Check that your new post appears
5. **Click on the post card to view the full post page**
6. Verify the content displays correctly
7. Test the "Back to Blog" button
8. Check that related posts show up at the bottom
9. Test filtering and search functionality

## Troubleshooting

**Post not showing up?**
- Check that you incremented the `id` correctly
- Ensure all required fields are filled
- Check for missing commas in the array
- Verify image path is correct

**Image not loading?**
- Confirm image exists in public folder
- Check file path starts with `/`
- Try clearing browser cache

**Layout looks broken?**
- Verify excerpt isn't too long (keep to 2-3 sentences)
- Check that all fields have proper string quotes
- Ensure tags is an array with square brackets

## Need Help?

Contact the Web Development Team for assistance with:
- Adding complex content
- Image optimization
- Custom styling
- Technical issues

---

**Happy Blogging! 🚀**
