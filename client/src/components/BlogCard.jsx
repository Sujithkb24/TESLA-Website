import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ post, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${post.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={handleClick}
      className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
      style={{
        background: 'linear-gradient(to bottom right, var(--color-dark-gray), var(--color-black))',
        border: '1px solid rgba(75, 85, 99, 0.5)'
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(201, 161, 84, 0.5)'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)'}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span 
            className="px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-md"
            style={{
              backgroundColor: post.category === 'Event' ? 'var(--color-gold)' : '#3b82f6',
              color: post.category === 'Event' ? 'var(--color-black)' : 'var(--color-white)'
            }}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center text-sm mb-3 gap-3" style={{ color: 'var(--color-gray)' }}>
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {post.author}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {post.date}
          </span>
        </div>

        {/* Title */}
        <h3 
          className="text-xl font-bold mb-3 transition-colors duration-300"
          style={{ color: 'var(--color-white)' }}
          onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--color-white)'}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm mb-4 line-clamp-3" style={{ color: 'var(--color-gray)' }}>
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs rounded-full transition-colors duration-300"
              style={{
                backgroundColor: 'var(--color-dark-gray)',
                color: 'var(--color-gold)',
                border: '1px solid rgba(201, 161, 84, 0.3)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read More Button */}
        <div className="flex items-center font-semibold transition-colors duration-300" style={{ color: 'var(--color-gold)' }}>
          <span>Read More</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
        style={{ background: 'linear-gradient(to right, var(--color-gold), var(--color-light-gold))' }}
      ></div>
    </motion.div>
  );
};

export default BlogCard;
