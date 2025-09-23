import { useTheme } from "../../contexts/ThemeContext.jsx";
import { formatTimeAgo } from "../../utils/formatters.js";
import TokenChart from "./TokenChart.jsx";

const TokenGraphCard = ({ token, wFull = false }) => {
  const { isDark } = useTheme();
  const tokenLatestPrice =
    token.priceHistory[token.priceHistory.length - 1].price;
  const getTokenChangePercentage = (latestPrice, previousPrice) => {
    const value = ((latestPrice - previousPrice) / previousPrice) * 100;
    return value;
  };

  return (
    <div
      className={`relative flex flex-col px-[20px] py-[20px] rounded-[12px] ${wFull ? "w-full" : "w-[clamp(400px,80vw,600px)]"} border-[1px] shadow-black/20 shadow-sm ${
        isDark
          ? "bg-gray-900 border-gray-800 hover:bg-gray-900 hover:border-gray-700 text-white"
          : "bg-white border-black/10 hover:bg-gray-50 hover:border-gray-300 text-black"
      }`}
    >
      <div className="absolute top-0 -translate-y-1/2 left-[15px] w-[84px] h-[84px] shadow-black/10 shadow-md rounded-[12px]">
        <img
          src={token.logo}
          alt={token.name}
          className="w-full h-full object-cover rounded-[12px]"
        />
      </div>
      <div className="flex items-center justify-start gap-[12px] ml-[110px] text-[14px] mb-[24px]">
        <h3 className="font-bold text-[16px]">{token.name}</h3>
        <h4
          className={`${isDark ? "text-white" : "text-[rgba(10,10,10,0.6)]"}`}
        >
          Volume : $
          {token.marketCap > 1000000
            ? `${(token.marketCap / 1000000).toFixed(2)} M`
            : `${(token.marketCap / 1000).toFixed(2)} K`}
        </h4>
        <h4
          className={`${isDark ? "text-white" : "text-[rgba(10,10,10,0.6)]"}`}
        >
          Age : {formatTimeAgo(token.cdate)}
        </h4>
      </div>
      <div className="">
        <TokenChart />
      </div>
      <div className="flex items-center justify-between gap-[10px]">
        {token.priceHistory.slice(-4).map((price, index) => {
          const changePercentage = getTokenChangePercentage(
            tokenLatestPrice,
            price.price
          );
          return (
            <div key={index} className="flex items-center gap-[6px]">
              {formatTimeAgo(price.timestamp)}{" "}
              <span
                style={{
                  color:
                    changePercentage >= 0
                      ? "rgba(41, 167, 37, 1)"
                      : "rgba(211, 54, 54, 1)",
                }}
              >
                {changePercentage >= 0 ? "+" : ""}
                {changePercentage.toFixed(2)}%{" "}
                <svg
                  width="12"
                  height="5"
                  viewBox="0 0 12 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`inline ${
                    changePercentage >= 0 ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M6 5L11.1962 0.5H0.803848L6 5Z"
                    fill={
                      changePercentage >= 0
                        ? "rgba(41, 167, 37, 1)"
                        : "rgba(211, 54, 54, 1)"
                    }
                  />
                </svg>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TokenGraphCard;
