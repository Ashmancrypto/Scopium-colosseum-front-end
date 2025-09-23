import { motion, useMotionValue } from "motion/react";
import { useState } from "react";

const SPRING_OPTIONS = {
  type: "spring",
  mass: 1.5,
  stiffness: 400,
  damping: 40,
};

export default function CardCarouselDots({
  cards,
  cardVw = 70,
  dots = true,
  threshold = 25,
  hideOnDesktop = true,
  dotsDark = true,
  customGap = 5,

}) {
  const DRAG_BUFFER = threshold;
  const [cardIndex, setCardIndex] = useState(0);
  const dragX = useMotionValue(0);
  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && cardIndex < cards.length - 1) {
      setCardIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && cardIndex > 0) {
      setCardIndex((pv) => pv - 1);
    }
  };
  return (
    <div className={`${hideOnDesktop ? "sm:hidden" : ""}`}>
      <div
        className={`relative py-[46px]`}
        style={{
          paddingLeft: `4vw`,
          paddingRight: `4vw`,
        }}
      >
        <motion.div
          className={`flex items-center gap-[5vw]`}
          drag="x"
          dragElastic={0.8}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={onDragEnd}
          style={{
            x: dragX,
          }}
          animate={{
            translateX: `-${cardIndex * (cardVw + 5)}vw`,
          }}
          transition={SPRING_OPTIONS}
        >
          {cards.map((card, index) => (
            <div key={index}>{card}</div>
          ))}
        </motion.div>
      </div>

      {dots && (
        <div className="flex justify-center items-stretch gap-[10px]">
          {cards.map((card, index) => (
            <div
              className={`w-[10px] h-[10px] rounded-full cursor-pointer ${
                cardIndex === index ? (dotsDark ? "bg-[rgba(10,10,10,0.6)]" : "bg-white") : (dotsDark ? "bg-black/30" : "bg-white/50")
              }`}
              key={index}
              onClick={() => setCardIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
