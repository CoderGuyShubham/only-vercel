import React, { useRef, useEffect } from "react";

const InfiniteCarousel = ({ images, imageWidth = 80, gap = 20, speed = 0.5 }) => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const animationFrameId = useRef(null);
  const scrollPosition = useRef(0);
  const isPaused = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const scroll = scrollRef.current;

    const step = () => {
      if (!isPaused.current) {
        scrollPosition.current += speed;
        if (scrollPosition.current >= scroll.scrollWidth / 2) {
          scrollPosition.current = 0;
        }
        container.scrollLeft = scrollPosition.current;
      }
      animationFrameId.current = requestAnimationFrame(step);
    };

    animationFrameId.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId.current);
  }, [speed]);

  const handleMouseEnter = () => {
    isPaused.current = true;
  };

  const handleMouseLeave = () => {
    isPaused.current = false;
  };

  const duplicatedImages = [...images, ...images];

  return (
    <div
      ref={containerRef}
      style={{
        overflowX: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={scrollRef}
        style={{
          display: "inline-flex",
          gap: gap,
          width: "max-content",
        }}
      >
        {duplicatedImages.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            alt={`carousel-img-${index}`}
            style={{
              width: imageWidth,
              borderRadius: 8,
              userSelect: "none",
              pointerEvents: "none",
            }}
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;