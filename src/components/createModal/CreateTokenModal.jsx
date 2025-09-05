import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import TokenForm from "./TokenForm.jsx";
import { useTokenCreationSolana } from "../../hooks/createTokens/useTokenCreationSolana.js";
import { useToastContext } from "../../contexts/ToastContext.jsx";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const CreateTokenModal = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const { createNewToken, isCreating } = useTokenCreationSolana();
  const toast = useToastContext();

  const coinName = useRef(null);
  const ticker = useRef(null);
  const description = useRef(null);
  const twitterLink = useRef(null);
  const telegramLink = useRef(null);
  const website = useRef(null);
  const categoryBox = useRef(null);
  const firstBuyAmount = useRef(null);

  const modalRef = useRef(null);

  const [category, setCategory] = useState("");
  const [coinImage, setCoinImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [bannerImage, setBannerImage] = useState(null);
  const [bannerName, setBannerName] = useState("");
  const [bannerFile, setBannerFile] = useState(null);

  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [showBannerUpload, setShowBannerUpload] = useState(false);
  const [showFirstBuy, setShowFirstBuy] = useState(false);

  const handleCoinImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setCoinImage(URL.createObjectURL(file));
      setImageName(file.name);
      setImageFile(file);
    } else {
      setCoinImage(null);
      setImageName("");
      setImageFile(null);
    }
  };

  const handleBannerImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setBannerImage(URL.createObjectURL(file));
      setBannerName(file.name);
      setBannerFile(file);
    } else {
      setBannerImage(null);
      setBannerName("");
      setBannerFile(null);
    }
  };

  const removeCoinImage = () => {
    setCoinImage(null);
    setImageName("");
    setImageFile(null);
  };

  const removeBannerImage = () => {
    setBannerImage(null);
    setBannerName("");
    setBannerFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      coinName: coinName.current?.value || "",
      ticker: ticker.current?.value || "",
      description: description.current?.value || "",
      category,
      socialLinks: {
        website: website.current?.value || "",
        telegram: telegramLink.current?.value || "",
        twitter: twitterLink.current?.value || "",
      },
      coinImage: { file: imageFile, preview: coinImage, name: imageName },
      bannerImage: { file: bannerFile, preview: bannerImage, name: bannerName },
      firstBuyAmount: firstBuyAmount.current?.value || "",
    };
    if (!formData.coinName || !formData.ticker || !formData.category) {
      toast.warning(
        "Missing Information",
        "Please fill in all required fields (Name, Ticker, and Category)."
      );
      return;
    }
    if (!formData.coinImage.file) {
      toast.warning("Missing Image", "Please upload a coin image.");
      return;
    }
    const result = await createNewToken(formData);
    if (result?.success) handleClose();
  };

  const handleClose = () => {
    if (isCreating) return;
    if (coinName.current) coinName.current.value = "";
    if (ticker.current) ticker.current.value = "";
    if (description.current) description.current.value = "";
    if (twitterLink.current) twitterLink.current.value = "";
    if (telegramLink.current) telegramLink.current.value = "";
    if (website.current) website.current.value = "";
    if (firstBuyAmount.current) firstBuyAmount.current.value = "";
    setCategory("");
    setCoinImage(null);
    setImageName("");
    setImageFile(null);
    setBannerImage(null);
    setBannerName("");
    setBannerFile(null);
    setShowSocialLinks(false);
    setShowBannerUpload(false);
    setShowFirstBuy(false);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (!isCreating) handleClose();
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen && !isCreating) handleClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, isCreating]);

  useEffect(() => {
    if (modalRef.current) {
      if (window.scrollY < 80) {
        modalRef.current.style.top = `${0 + window.scrollY}px`;
      } else {
        modalRef.current.style.top = `80px`;
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed left-0 top-0 w-full h-screen z-[9999] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      ref={modalRef}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

      {/* Background with scopium images */}
      <div className="absolute w-full max-w-[90%] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[550px] z-0">
        <div className="relative rounded-2xl shadow-2xl">
          <img
            src={`${
              isDark
                ? "/images/scopium/Scopium-2-dark.png"
                : "/images/scopium/Scopium-2.png"
            }`}
            alt="Left"
            className="absolute top-1/2 -translate-y-1/2 lg:-left-[120px] w-40 h-40 animate-pulse"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          />
          <img
            src={`${
              isDark
                ? "/images/scopium/Scopium-1-dark.png"
                : "/images/scopium/Scopium-1.png"
            }`}
            alt="Right top"
            className="absolute lg:-top-[350px] lg:-right-[45px] translate-x-1/2 w-40 h-40 animate-pulse"
            style={{ animationDelay: "1s", animationDuration: "3s" }}
          />
          <img
            src={`${
              isDark
                ? "/images/scopium/Scopium-3-dark.png"
                : "/images/scopium/Scopium-3.png"
            }`}
            alt="Right bottom"
            className="absolute lg:-bottom-[390px] lg:-right-[25px] translate-x-1/2 w-40 h-40 animate-pulse"
            style={{ animationDelay: "2s", animationDuration: "3s" }}
          />
        </div>
      </div>

      {/* Modal */}
      <div
        className={`relative rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[550px] border z-10 transition-colors duration-300 ${
          isDark ? "bg-gray-700/95 border-gray-600" : "bg-white border-gray-300"
        }`}
        style={{ maxHeight: "90vh", overflow: "hidden" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex items-center justify-between p-6 border-b ${
            isDark ? "border-gray-600" : "border-gray-200"
          }`}
        >
          <h2
            className={`text-xl font-semibold ${
              isDark ? "text-[#F7F7F7]" : "text-gray-800"
            }`}
          >
            Create Token
          </h2>
          <button
            onClick={!isCreating ? handleClose : undefined}
            disabled={isCreating}
            className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isDark
                ? "text-gray-300 hover:text-[#F7F7F7] hover:bg-gray-700/50"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 80px)" }}
        >
          <TokenForm
            refs={{
              coinName,
              ticker,
              description,
              twitterLink,
              telegramLink,
              website,
              categoryBox,
              firstBuyAmount,
            }}
            state={{
              category,
              setCategory,
              coinImage,
              imageName,
              imageFile,
              bannerImage,
              bannerName,
              bannerFile,
              showSocialLinks,
              setShowSocialLinks,
              showBannerUpload,
              setShowBannerUpload,
              showFirstBuy,
              setShowFirstBuy,
            }}
            handlers={{
              handleCoinImageChange,
              handleBannerImageChange,
              removeCoinImage,
              removeBannerImage,
              handleSubmit,
            }}
            isCreating={isCreating}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTokenModal;
