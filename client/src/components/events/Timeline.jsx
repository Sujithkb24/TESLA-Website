import React, { useRef, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import TimelineItem from "./TimelineItem";

function Timeline({ items, scrollProgress }) {
  const [itemPositions, setItemPositions] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const timelineRef = useRef(null);

  // Track window size for mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile scroll listener for highlighting
  useEffect(() => {
    if (!isMobile) return;

    let ticking = false;

    const handleMobileScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (itemPositions.length < 2 || !timelineRef.current) {
            ticking = false;
            return;
          }

          const containerRect = timelineRef.current.getBoundingClientRect();
          const viewportCenter = window.innerHeight / 2;
          let nearestImage = -1;
          let minDistance = Infinity;
          
          itemPositions.forEach((pos, index) => {
            if (!pos.bounds) return; // Skip items without bounds (like header)
            
            // Calculate actual viewport position
            const absoluteTop = containerRect.top + pos.bounds.top;
            const absoluteBottom = containerRect.top + pos.bounds.bottom;
            const itemCenterInViewport = (absoluteTop + absoluteBottom) / 2;
            
            const distance = Math.abs(itemCenterInViewport - viewportCenter);
            
            if (distance < minDistance) {
              minDistance = distance;
              // On mobile there's no header in positions array, so use direct index
              // On desktop positions[0] is header, so items start at index 1
              nearestImage = index;
            }
          });

          console.log('Mobile scroll - Active index:', nearestImage);
          setActiveImageIndex(nearestImage);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleMobileScroll, { passive: true });
    handleMobileScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleMobileScroll);
  }, [isMobile, itemPositions]);

  useEffect(() => {
    // Get positions of all timeline items (images) including header
    const updatePositions = () => {
      if (timelineRef.current) {
        const positions = [];
        
        // First, get all event images to know where the first one is
        const timelineItems = timelineRef.current.querySelectorAll('[data-timeline-item]');
        
        if (timelineItems.length > 0) {
          // Get the first event's position to align the header start point
          const firstItem = timelineItems[0];
          const firstRect = firstItem.getBoundingClientRect();
          const containerRect = timelineRef.current.getBoundingClientRect();
          const firstImageCenterX = firstRect.left - containerRect.left + firstRect.width / 2;
          
          // Now get the header position
          const header = document.querySelector('[data-timeline-header]');
          if (header) {
            const headerRect = header.getBoundingClientRect();
            
            // Start point: bottom of header, aligned with first event's X position
            const headerBottom = headerRect.bottom - containerRect.top;
            
            positions.push({
              x: firstImageCenterX,
              y: headerBottom,
              isHeader: true
            });
          }
          
          // Add all event images
          timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const containerRect = timelineRef.current.getBoundingClientRect();
            
            // Get center point and bounds of each image
            const relativeTop = rect.top - containerRect.top;
            const relativeLeft = rect.left - containerRect.left;
            
            positions.push({
              x: relativeLeft + rect.width / 2,
              y: relativeTop + rect.height / 2,
              isEven: index % 2 === 0,
              // Store bounds for accurate detection
              bounds: {
                left: relativeLeft,
                right: relativeLeft + rect.width,
                top: relativeTop,
                bottom: relativeTop + rect.height
              }
            });
          });
        }
        
        setItemPositions(positions);
      }
    };

    updatePositions();
    
    // Use ResizeObserver for more efficient updates
    const resizeObserver = new ResizeObserver(() => {
      updatePositions();
    });
    
    if (timelineRef.current) {
      resizeObserver.observe(timelineRef.current);
    }
    
    // Delay to ensure images are loaded
    const timeouts = [
      setTimeout(updatePositions, 100),
      setTimeout(updatePositions, 500),
      setTimeout(updatePositions, 1000)
    ];
    
    return () => {
      resizeObserver.disconnect();
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [items]);

  // Calculate path with vertical and horizontal segments (L-shaped connections)
  const calculateConnectingPath = () => {
    if (itemPositions.length < 2) return "";
    
    // Start from the header bottom (first position)
    let path = `M ${itemPositions[0].x} ${itemPositions[0].y}`;
    
    // Draw vertical line down to first event
    path += ` L ${itemPositions[1].x} ${itemPositions[1].y}`;
    
    // Draw L-shaped connections between remaining events (starting from index 2)
    for (let i = 2; i < itemPositions.length; i++) {
      const prev = itemPositions[i - 1];
      const current = itemPositions[i];
      
      // Calculate midpoint Y between the two events
      const midY = (prev.y + current.y) / 2;
      
      // Draw vertical line down to midpoint
      path += ` L ${prev.x} ${midY}`;
      // Draw horizontal line to current X position
      path += ` L ${current.x} ${midY}`;
      // Draw vertical line to current event
      path += ` L ${current.x} ${current.y}`;
    }
    
    return path;
  };

  // Calculate total path length and ball position
  const calculateBallPosition = () => {
    if (itemPositions.length < 2) {
      return { x: 0, y: 0, nearestImage: -1 };
    }
    
    if (isMobile) {
      // Mobile: Simple highlighting based on viewport center
      if (!timelineRef.current) {
        return { x: 0, y: 0, nearestImage: -1 };
      }
      
      const containerRect = timelineRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      let nearestImage = -1;
      let minDistance = Infinity;
      
      itemPositions.forEach((pos, index) => {
        if (index === 0 || !pos.bounds) return; // Skip header
        
        // Calculate actual viewport position
        const absoluteTop = containerRect.top + pos.bounds.top;
        const absoluteBottom = containerRect.top + pos.bounds.bottom;
        const itemCenterInViewport = (absoluteTop + absoluteBottom) / 2;
        
        const distance = Math.abs(itemCenterInViewport - viewportCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          nearestImage = index - 1;
        }
      });
      
      return { x: 0, y: 0, nearestImage };
    }
      

    
    // Desktop: Build segments array starting with vertical line from header to first event
    const segments = [];
    
    // First segment: vertical line from header bottom to first event
    segments.push({
      start: { x: itemPositions[0].x, y: itemPositions[0].y },
      end: { x: itemPositions[1].x, y: itemPositions[1].y },
      imageIndex: 0 // First event
    });
    
    // Then add L-shaped paths between remaining events
    for (let i = 2; i < itemPositions.length; i++) {
      const prev = itemPositions[i - 1];
      const current = itemPositions[i];
      const midY = (prev.y + current.y) / 2;
      
      // Vertical segment 1: from prev to midY
      segments.push({
        start: { x: prev.x, y: prev.y },
        end: { x: prev.x, y: midY },
        imageIndex: i - 2 // Adjust for header offset
      });
      
      // Horizontal segment: from prev.x to current.x at midY
      segments.push({
        start: { x: prev.x, y: midY },
        end: { x: current.x, y: midY },
        imageIndex: -1
      });
      
      // Vertical segment 2: from midY to current
      segments.push({
        start: { x: current.x, y: midY },
        end: { x: current.x, y: current.y },
        imageIndex: i - 1 // Adjust for header offset
      });
    }
    
    // Calculate lengths
    let totalLength = 0;
    const segmentLengths = segments.map(seg => {
      const dx = seg.end.x - seg.start.x;
      const dy = seg.end.y - seg.start.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      totalLength += length;
      return length;
    });
    
    // Clamp scroll progress to 0-1 range (comes as decimal from TimelineContainer)
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    const targetDistance = clampedProgress * totalLength;
    
    // Find position along path with precise interpolation
    let accumulatedLength = 0;
    for (let i = 0; i < segments.length; i++) {
      const segmentEnd = accumulatedLength + segmentLengths[i];
      
      if (targetDistance <= segmentEnd || i === segments.length - 1) {
        // Clamp segment progress to 0-1
        const segmentProgress = segmentLengths[i] > 0 
          ? Math.max(0, Math.min(1, (targetDistance - accumulatedLength) / segmentLengths[i]))
          : 0;
        
        const seg = segments[i];
        
        // Linear interpolation - always stays on the line
        const x = seg.start.x + (seg.end.x - seg.start.x) * segmentProgress;
        const y = seg.start.y + (seg.end.y - seg.start.y) * segmentProgress;
        
        // Check if ball is inside any event image bounds (skip index 0 which is the header)
        let nearestImage = -1;
        
        itemPositions.forEach((pos, index) => {
          // Skip the header (index 0)
          if (index === 0 || !pos.bounds) return;
          
          // Check if ball is within the image's rectangular bounds
          if (x >= pos.bounds.left && x <= pos.bounds.right &&
              y >= pos.bounds.top && y <= pos.bounds.bottom) {
            // Adjust index to match event items (subtract 1 because header is at index 0)
            nearestImage = index - 1;
          }
        });
        
        return { x, y, nearestImage };
      }
      
      accumulatedLength = segmentEnd;
    }
    
    // Fallback: return last position
    const last = itemPositions[itemPositions.length - 1];
    return { x: last.x, y: last.y, nearestImage: itemPositions.length - 2 }; // -2 because of header offset
  };

  // Memoize ball position to avoid infinite re-renders
  const ballPos = useMemo(() => {
    const position = calculateBallPosition();
    return position;
  }, [itemPositions, scrollProgress, isMobile]);

  // Update active image index based on ball position
  useEffect(() => {
    if (ballPos.nearestImage !== undefined && ballPos.nearestImage !== activeImageIndex) {
      setActiveImageIndex(ballPos.nearestImage);
    }
  }, [ballPos.nearestImage, activeImageIndex]); // Only update when nearestImage or current activeImageIndex changes

  return (
    <div ref={timelineRef} className="relative max-w-7xl mx-auto">
      {/* White Line Connecting Event Images - ONLY ON DESKTOP */}
      {itemPositions.length > 0 && (
        <svg 
          className="hidden md:block absolute left-0 pointer-events-none z-0" 
          style={{ 
            width: '100%',
            height: '100%',
            top: '0',
            overflow: 'visible'
          }}
        >
          <defs>
            <filter id="lineGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Main connecting line */}
          <path
            d={calculateConnectingPath()}
            fill="none"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#lineGlow)"
          />
        </svg>
      )}

      {/* Red Ball following the line - ONLY ON DESKTOP */}
      {itemPositions.length > 0 && (
        <div 
          className="hidden md:block absolute pointer-events-none"
          style={{
            left: `${ballPos.x}px`,
            top: `${ballPos.y}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 5,
            willChange: 'transform, left, top'
          }}
        >
          <div className="relative">
            {/* Red ball core - made bigger */}
            <div className="w-12 h-12 bg-red-500 rounded-full shadow-lg relative">
              {/* Subtle outer glow */}
              <div className="absolute inset-0 rounded-full bg-red-500 opacity-60 blur-sm scale-150"></div>
            </div>
          </div>
        </div>
      )}



      {/* Timeline items */}
      <div className="relative z-10">
        {items.map((item, index) => (
          <TimelineItem
            key={index}
            item={item}
            isEven={index % 2 === 0}
            index={index}
            totalItems={items.length}
            isActive={activeImageIndex === index}
          />
        ))}
      </div>
    </div>
  );
}

Timeline.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
  scrollProgress: PropTypes.number.isRequired,
};

export default Timeline;
