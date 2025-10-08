import { useLayoutEffect, useRef, useState } from 'react';

const ContentTabs = ({ tabs, activeTab, onChange, isDark = false }) => {
  const containerRef = useRef(null);
  const tabsRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, scale: 0 });

  const firstRender = useRef(true);

  useLayoutEffect(() => {
    const idx = tabs.findIndex((t) => t.id === activeTab);
    const btn = tabsRefs.current[idx];
    const container = containerRef.current;
    if (!btn || !container) return;

  const btnRect = btn.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const btnLeft = Math.round(btnRect.left - containerRect.left + container.scrollLeft);
  const btnWidth = Math.round(btnRect.width);

  // make the indicator a shorter rounded bar centered under the label
  const width = Math.max(36, Math.round(btnWidth * 0.45));
  const left = btnLeft + Math.round((btnWidth - width) / 2);

    if (firstRender.current) {
      // position and show immediately on first render
      setIndicator({ left, width, scale: 1 });
      firstRender.current = false;
      return;
    }

    // animate: move and grow with translateY + scaleX
    // start slightly lowered & small, then grow into place
    setIndicator({ left, width, scale: 0 });
    const raf = requestAnimationFrame(() => setIndicator({ left, width, scale: 1 }));

    return () => cancelAnimationFrame(raf);
  }, [activeTab, tabs]);

  return (
    <nav ref={containerRef} className="relative flex items-center gap-6 border-b border-transparent pb-1">
      <div className="flex items-center gap-6 text-base md:text-lg font-semibold">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => (tabsRefs.current[i] = el)}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative z-10 px-1 py-2 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="absolute left-0 right-0 bottom-0 pointer-events-none">
        <div
          aria-hidden
          style={{
            left: `${indicator.left}px`,
            width: `${indicator.width}px`,
            height: '3px',
            transformOrigin: 'center',
            transform: `translateY(${indicator.scale ? 0 : 6}px) scaleX(${indicator.scale ? 1 : 0.6})`,
            transition: 'left 260ms cubic-bezier(.2,.9,.2,1), width 260ms, transform 380ms cubic-bezier(.2,.9,.2,1)'
          }}
          className={`absolute rounded-full ${isDark ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-pink-500 to-purple-500'}`}
        />
      </div>
    </nav>
  );
};

export default ContentTabs;

