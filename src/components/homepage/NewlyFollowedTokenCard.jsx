import { useTheme } from "../../contexts/ThemeContext.jsx";
import { useState } from "react";
import { setFavor } from "../../api/user/index.js";
import HeartIcon from "../ui/HeartIcon.jsx";


const NewlyFollowedTokenCard = ({
  tokenSymbol = "$WIF",
  tokenImage,
  tokenValue = "$42.6M",
  tokenValueChangePercentage = -2.4,
  backgroundColor = "transparent",
  tokenId,
}) => {
  const [favorited, setFavorited] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isDark } = useTheme();
  const isPositive = tokenValueChangePercentage >= 0;

  const handleFavoriteToken = async (tokenId) => {
    try{
      const result = await setFavor(tokenId);
      if (result){
        console.log("api call favorited", result);
        setFavorited(result.status);
      }
    }catch(error){
      console.error("Error favoriting token:", error);
    }
  }

  return (
    <div
      className={`w-full rounded-[12px] border px-[20px] py-[22px] bg-${backgroundColor} ${
        isDark ? "border-[rgba(1,219,117,0.3)]" : "border-[rgba(10,10,10,0.4)]"
      }`}
      style={{ boxShadow: "0px 0px 5px 0px rgba(10, 10, 10, 0.15)" }}
    >
      <div className="flex items-center justify-between w-full mb-[9px]">
        <div
          className="w-[60px] h-[60px] rounded-[12px] overflow-hidden bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center"
          style={{ boxShadow: "0px 0px 15px 0px rgba(0, 0, 0, 0.3)" }}
        >
          {!imageError && tokenImage ? (
            <img
              src={tokenImage}
              alt={tokenSymbol}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-white font-bold text-lg">
              {tokenSymbol?.charAt(1) || tokenSymbol?.charAt(0) || "?"}
            </span>
          )}
        </div>
        {isPositive ? (
          <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M51 1.01577C49.5455 0.444514 41 15.5351 36.9091 23.1518L33.986 6.01423L27.6876 23.1518L18.7273 26.9235L12.3636 44.2387L9.98482 30.2921L0.999999 51"
              stroke="#29A725"
              strokeWidth="2"
            />
          </svg>
        ) : (
          <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M51 50.9842C49.5455 51.5555 41 36.4649 36.9091 28.8482L33.986 45.9858L27.6876 28.8482L18.7273 25.0765L12.3636 7.76131L9.98482 21.7079L0.999999 1"
              stroke="#D33636"
              strokeWidth="2"
            />
          </svg>
        )}
        <HeartIcon onClick={() => handleFavoriteToken(tokenId)}/>
      </div>
      <div className="flex items-center justify-between text-black">
        <p className="text-[min(14px,1.3vw)] font-bold">{tokenSymbol}</p>
        <p className="text-[min(14px,1.3vw)]">{tokenValue}</p>
        <div className="flex items-center gap-[4px]">
          <p
            className={`text-[min(14px,1.3vw)] font-bold ${
              isPositive
                ? "text-[rgba(41,167,37,1)]"
                : "text-[rgba(211,54,54,1)]"
            }`}
          >
            {isPositive ? "+" : ""}
            {tokenValueChangePercentage}%
          </p>
          <svg
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${isPositive ? "" : "rotate-180"}`}
          >
            <path
              d="M4 0L0.535898 4.5H7.4641L4 0Z"
              fill={isPositive ? "#29A725" : "#CD3930"}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NewlyFollowedTokenCard;
