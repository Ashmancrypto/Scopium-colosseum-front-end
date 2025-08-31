import { useTheme } from "../../contexts/ThemeContext.jsx";
import { useState } from "react";
import { setFavor } from "../../api/user/index.js";


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
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="self-start cursor-pointer w-6 h-6"
          onClick={() => handleFavoriteToken(tokenId)}
        >
          <path
            d="M17.612 2.41452C17.1722 1.96607 16.65 1.61034 16.0752 1.36763C15.5005 1.12492 14.8844 1 14.2623 1C13.6401 1 13.0241 1.12492 12.4493 1.36763C11.8746 1.61034 11.3524 1.96607 10.9126 2.41452L9.99977 3.34476L9.08699 2.41452C8.19858 1.50912 6.99364 1.00047 5.73725 1.00047C4.48085 1.00047 3.27591 1.50912 2.38751 2.41452C1.4991 3.31992 1 4.5479 1 5.82833C1 7.10875 1.4991 8.33674 2.38751 9.24214L9.99977 17L17.612 9.24214C18.0521 8.79391 18.4011 8.26171 18.6393 7.67596C18.8774 7.0902 19 6.46237 19 5.82833C19 5.19428 18.8774 4.56645 18.6393 3.9807C18.4011 3.39494 18.0521 2.86275 17.612 2.41452Z"
            stroke="#FA4EAB"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={favorited ? "#FA4EAB" : "none"}
          />
        </svg>
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
