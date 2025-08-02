import { useRef } from 'react';
import useDragScroll from './useDragScroll';

export default function DragScroll({ children, className = '' }) {
  const containerRef = useRef(null);
  useDragScroll(containerRef);

  return (
    <div
      ref={containerRef}
      className={`cursor-grab no-scrollbar ${className}`}
    >
      {children}
    </div>
  );
}
