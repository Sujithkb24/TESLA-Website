import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogPosts } from '../data/blogData';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the blog post by ID
  const post = blogPosts.find(p => p.id === parseInt(id));

  // If post not found, show 404
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }}>
        <Navbar />
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl mb-8" style={{ color: 'var(--color-gray)' }}>Blog post not found</p>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-3 font-semibold rounded-lg transition-all duration-300"
            style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-black)' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-light-gold)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-gold)'}
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }}>
      <Navbar />

      {/* Hero Section with Image */}
      <div className="relative pt-24 pb-12">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[60vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 transition-colors duration-300 mb-6 group"
            style={{ color: 'var(--color-gray)' }}
            onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--color-gray)'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </motion.button>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <span 
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: post.category === 'Event' ? 'var(--color-gold)' : '#3b82f6',
                color: post.category === 'Event' ? 'var(--color-black)' : 'var(--color-white)'
              }}
            >
              {post.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            {post.title}
          </motion.h1>

          {/* Meta Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mb-6"
            style={{ color: 'var(--color-gray)' }}
          >
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{post.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{post.date}</span>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 backdrop-blur-sm text-sm rounded-full"
                style={{
                  backgroundColor: 'rgba(17, 17, 17, 0.8)',
                  color: 'var(--color-gold)',
                  border: '1px solid rgba(201, 161, 84, 0.3)'
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          {/* Excerpt */}
          <div 
            className="p-6 rounded-r-lg mb-8"
            style={{
              background: 'linear-gradient(to right, rgba(201, 161, 84, 0.1), rgba(218, 165, 32, 0.1))',
              borderLeft: '4px solid var(--color-gold)'
            }}
          >
            <p className="text-xl italic leading-relaxed" style={{ color: 'var(--color-white)' }}>
              {post.excerpt}
            </p>
          </div>

          {/* Main Content */}
          <div className="leading-relaxed space-y-6" style={{ color: 'var(--color-gray)' }}>
            {/* You can add more detailed content here */}
            <p className="text-lg">
              {post.content}
            </p>

            {/* Placeholder content structure for demonstration */}
            {post.category === 'Event' ? (
              <>
                <h2 className="text-3xl font-bold mt-8 mb-4" style={{ color: 'var(--color-white)' }}>Event Details</h2>
                <p>
                  This event promises to be an exciting opportunity for all participants to learn, 
                  network, and grow their skills. Whether you're a beginner or an experienced professional, 
                  there's something for everyone.
                </p>

                <h3 className="text-2xl font-semibold mt-6 mb-3" style={{ color: 'var(--color-white)' }}>What to Expect</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Interactive workshops and hands-on sessions</li>
                  <li>Networking opportunities with industry professionals</li>
                  <li>Latest insights and trends in the field</li>
                  <li>Q&A sessions with expert speakers</li>
                  <li>Certificates of participation</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-6 mb-3" style={{ color: 'var(--color-white)' }}>Who Should Attend</h3>
                <p>
                  This event is perfect for students, professionals, and enthusiasts who are passionate 
                  about technology and innovation. No prior experience is required for most sessions, 
                  making it accessible to everyone.
                </p>

                <h3 className="text-2xl font-semibold mt-6 mb-3" style={{ color: 'var(--color-white)' }}>Registration</h3>
                <p>
                  Registration is now open! Secure your spot early as seats are limited. 
                  Check our Events page or contact us for more details on how to register.
                </p>

                <div 
                  className="rounded-lg p-6 mt-8"
                  style={{
                    backgroundColor: 'var(--color-dark-gray)',
                    border: '1px solid rgba(201, 161, 84, 0.3)'
                  }}
                >
                  <h4 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-gold)' }}>Important Information</h4>
                  <p className="mb-2" style={{ color: 'var(--color-gray)' }}><strong>Date:</strong> {post.date}</p>
                  <p className="mb-2" style={{ color: 'var(--color-gray)' }}><strong>Venue:</strong> SJCE Campus (Details TBA)</p>
                  <p style={{ color: 'var(--color-gray)' }}><strong>Contact:</strong> Check our Contact page for inquiries</p>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mt-8 mb-4" style={{ color: 'var(--color-white)' }}>In This Newsletter</h2>
                <p>
                  Welcome to this edition of the TESLA newsletter! We're excited to share the latest 
                  updates, achievements, and upcoming events with our community.
                </p>

                <h3 className="text-2xl font-semibold mt-6 mb-3" style={{ color: 'var(--color-white)' }}>Highlights</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Recent project completions and success stories</li>
                  <li>Member achievements and recognitions</li>
                  <li>Upcoming events and workshops</li>
                  <li>Technical insights and learning resources</li>
                  <li>Community updates and announcements</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-6 mb-3" style={{ color: 'var(--color-white)' }}>Team Updates</h3>
                <p>
                  Our teams have been hard at work on various exciting projects. From innovative 
                  technical solutions to successful event organization, every member of TESLA 
                  contributes to our collective success.
                </p>

                <h3 className="text-2xl font-semibold mt-6 mb-3" style={{ color: 'var(--color-white)' }}>Looking Ahead</h3>
                <p>
                  The coming months are packed with exciting opportunities for learning and growth. 
                  Stay tuned for announcements about workshops, competitions, and collaborative projects. 
                  Make sure to check our Events page regularly for updates.
                </p>

                <div 
                  className="rounded-lg p-6 mt-8"
                  style={{
                    backgroundColor: 'var(--color-dark-gray)',
                    border: '1px solid rgba(59, 130, 246, 0.3)'
                  }}
                >
                  <h4 className="text-xl font-semibold mb-3" style={{ color: '#3b82f6' }}>Stay Connected</h4>
                  <p style={{ color: 'var(--color-gray)' }}>
                    Want to receive newsletters directly in your inbox? Subscribe on our Blog page 
                    to never miss an update. Follow us on social media for real-time announcements 
                    and behind-the-scenes content.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Call to Action */}
          <div 
            className="rounded-xl p-8 mt-12"
            style={{
              background: 'linear-gradient(to right, var(--color-dark-gray), var(--color-black))',
              border: '1px solid rgba(201, 161, 84, 0.3)'
            }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-white)' }}>Get Involved</h3>
            <p className="mb-6" style={{ color: 'var(--color-gray)' }}>
              Interested in learning more or participating in our events? 
              We'd love to hear from you!
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/events')}
                className="px-6 py-3 font-semibold rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
                style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-black)' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-light-gold)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-gold)'}
              >
                View All Events
              </button>
              <button
                onClick={() => {
                  const footer = document.getElementById('footer');
                  if (footer) footer.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 font-semibold rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-dark-gray)',
                  color: 'var(--color-white)',
                  border: '1px solid rgba(75, 85, 99, 0.5)'
                }}
                onMouseEnter={(e) => e.target.style.borderColor = 'rgba(201, 161, 84, 0.5)'}
                onMouseLeave={(e) => e.target.style.borderColor = 'rgba(75, 85, 99, 0.5)'}
              >
                Contact Us
              </button>
            </div>
          </div>
        </motion.article>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(75, 85, 99, 0.5)' }}
        >
          <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-white)' }}>Share this post</h3>
          <div className="flex gap-4">
            <button 
              className="p-3 rounded-lg transition-colors duration-300"
              style={{ backgroundColor: 'var(--color-dark-gray)', color: 'var(--color-white)' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1877f2'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-dark-gray)'}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button 
              className="p-3 rounded-lg transition-colors duration-300"
              style={{ backgroundColor: 'var(--color-dark-gray)', color: 'var(--color-white)' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1da1f2'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-dark-gray)'}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </button>
            <button 
              className="p-3 rounded-lg transition-colors duration-300"
              style={{ backgroundColor: 'var(--color-dark-gray)', color: 'var(--color-white)' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#25d366'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-dark-gray)'}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </button>
            <button 
              className="p-3 rounded-lg transition-colors duration-300"
              style={{ backgroundColor: 'var(--color-dark-gray)', color: 'var(--color-white)' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0077b5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-dark-gray)'}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16"
          >
            <h3 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-white)' }}>Related {post.category === 'Event' ? 'Events' : 'Newsletters'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  onClick={() => {
                    navigate(`/blog/${relatedPost.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group cursor-pointer rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--color-dark-gray)',
                    border: '1px solid rgba(75, 85, 99, 0.5)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(201, 161, 84, 0.5)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)'}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm mb-2" style={{ color: 'var(--color-gray)' }}>{relatedPost.date}</p>
                    <h4 
                      className="text-lg font-semibold transition-colors duration-300 line-clamp-2"
                      style={{ color: 'var(--color-white)' }}
                      onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'}
                      onMouseLeave={(e) => e.target.style.color = 'var(--color-white)'}
                    >
                      {relatedPost.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
