import { useRef, useEffect, useState, } from 'react';
import useDragScroll from './useDragScroll';

export default function DragScroll({ children, className = '' }) {
  const [scrollProgress, setScrollProgress] = useState(0)

  const containerRef = useRef(null);
  useDragScroll(containerRef);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
      const maxScroll = scrollWidth - clientWidth
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
      setScrollProgress(progress)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <div
        ref={containerRef}
        className={`cursor-grab no-scrollbar ${className}`}
      >
        {children}

      </div>
      <div className="flex justify-center mt-4">
        <div className="w-2/5 h-1 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-pink-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </>

  );
}
