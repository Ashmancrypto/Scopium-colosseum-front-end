import { useTheme } from "../../contexts/ThemeContext.jsx";

const NewlyTokenCard = ({
  tokenSymbol = "$WIF",
  tokenImage = "/images/placeholders/tokenPlaceholders/pepe.png",
  tokenValue = "42.6M",
  linkToToken = "#",
}) => {
  const { isDark } = useTheme();

  return (
    
    <div className={`w-full rounded-[12px] border p-[12px] ${isDark? 'border-[rgba(1,219,117,0.3)] bg-[rgba(46,46,46,1)]':'border-[rgba(10,10,10,0.4)]'}`}>
      <img
        src={tokenImage}
        alt={tokenSymbol}
        className="w-full aspect-square object-cover rounded-[12px] mb-[12px]"
      />
      <div className="flex items-center justify-center gap-[24px]">
        <p className="text-[min(14px,1.3vw)] font-bold">{tokenSymbol}</p>
        <p className="text-[min(14px,1.3vw)]">{tokenValue}</p>
      </div>
    </div>
  );
};

export default NewlyTokenCard;
