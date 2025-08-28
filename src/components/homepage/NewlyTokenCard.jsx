import { useTheme } from "../../contexts/ThemeContext.jsx";
import { useState } from "react";

const NewlyTokenCard = ({
  tokenSymbol = "$WIF",
  tokenImage,
  tokenValue = "42.6M",
  linkToToken = "#",
  onClick,
}) => {
  const { isDark } = useTheme();
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`w-full rounded-[12px] border p-[12px] ${
        isDark
          ? "border-[rgba(1,219,117,0.3)] bg-[rgba(46,46,46,1)]"
          : "border-[rgba(10,10,10,0.4)]"
      } ${onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
      onClick={onClick}
    >
      <div className="w-full aspect-square rounded-[12px] mb-[12px] overflow-hidden bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
        {!imageError && tokenImage ? (
          <img
            src={tokenImage}
            alt={tokenSymbol}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-white font-bold text-2xl">
            {tokenSymbol?.charAt(1) || tokenSymbol?.charAt(0) || "?"}
          </span>
        )}
      </div>
      <div className="flex items-center justify-center gap-[24px]">
        <p className="text-[min(14px,1.3vw)] font-bold">{tokenSymbol}</p>
        <p className="text-[min(14px,1.3vw)]">{tokenValue}</p>
      </div>
    </div>
  );
};

export default NewlyTokenCard;
