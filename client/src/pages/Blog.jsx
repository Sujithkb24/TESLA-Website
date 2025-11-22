import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import { blogPosts, getEventPosts, getNewsletters } from '../data/blogData';

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on active filter and search query
  const getFilteredPosts = () => {
    let filtered = blogPosts;

    // Apply category filter
    if (activeFilter === 'events') {
      filtered = getEventPosts();
    } else if (activeFilter === 'newsletters') {
      filtered = getNewsletters();
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  };

  const filteredPosts = getFilteredPosts();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }}>
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(201, 161, 84, 0.1)' }}></div>
            <div className="absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(218, 165, 32, 0.05)' }}></div>
          </div>

          {/* Header Content */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center mb-12"
          >
            {/* <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{ 
                backgroundColor: 'rgba(201, 161, 84, 0.2)', 
                border: '1px solid rgba(201, 161, 84, 0.5)',
                color: 'var(--color-gold)'
              }}
            >
              Blog
            </motion.span>
             */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6" style={{ color: 'var(--color-white)' }}>
              The Journal
            </h1>
            
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--color-gray)' }}>
              Event Updates, Newsletters, and Industry News
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative z-10 mb-12"
          >
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blogs, events, newsletters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-12 rounded-xl focus:outline-none transition-colors duration-300"
                  style={{ 
                    backgroundColor: 'var(--color-dark-gray)', 
                    border: '1px solid rgba(75, 85, 99, 0.5)',
                    color: 'var(--color-white)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(75, 85, 99, 0.5)'}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ color: 'var(--color-gray)' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setActiveFilter('all')}
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg"
                style={{
                  backgroundColor: activeFilter === 'all' ? 'var(--color-gold)' : 'var(--color-dark-gray)',
                  color: activeFilter === 'all' ? 'var(--color-black)' : 'var(--color-gray)'
                }}
              >
                All Posts
              </button>
              <button
                onClick={() => setActiveFilter('events')}
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg"
                style={{
                  backgroundColor: activeFilter === 'events' ? 'var(--color-gold)' : 'var(--color-dark-gray)',
                  color: activeFilter === 'events' ? 'var(--color-black)' : 'var(--color-gray)'
                }}
              >
                Events
              </button>
              <button
                onClick={() => setActiveFilter('newsletters')}
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg"
                style={{
                  backgroundColor: activeFilter === 'newsletters' ? 'var(--color-gold)' : 'var(--color-dark-gray)',
                  color: activeFilter === 'newsletters' ? 'var(--color-black)' : 'var(--color-gray)'
                }}
              >
                Newsletters
              </button>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="relative z-10 text-center mb-8"
          >
            <p style={{ color: 'var(--color-gray)' }}>
              Showing <span className="font-semibold" style={{ color: 'var(--color-gold)' }}>{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'post' : 'posts'}
            </p>
          </motion.div>

          {/* Blog Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ color: 'var(--color-gray)' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-gray)' }}>No posts found</h3>
                <p style={{ color: 'var(--color-gray)' }}>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
