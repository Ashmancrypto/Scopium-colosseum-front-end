import { useState, useEffect } from "react";
import axios from "axios";
import "./stream.css";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const API_URL = "https://api.scopium.fun";

const CATEGORIES = [
  { value: "gaming", label: "Gaming" },
  { value: "trending", label: "Trending" },
  { value: "crypto_education", label: "Education" },
  { value: "most_popular", label: "Most Popular" },
  { value: "market_insights", label: "Market Insights" },
  { value: "sponsored", label: "Sponsored" },
];

function StreamCreator({ onStreamCreated }) {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "gaming",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [createdStream, setCreatedStream] = useState(null);
  const [detailsCopied, setDetailsCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onload = (e) => setThumbnailPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setThumbnail(null);
      setThumbnailPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsLoading(true);
    try {
      const submitData = new FormData();
      submitData.append("title", formData.title.trim());
      submitData.append("description", formData.description.trim());
      submitData.append("category", formData.category);

      if (thumbnail) {
        submitData.append("thumbnail", thumbnail);
      }

      const response = await axios.post(`${API_URL}/api/streams/`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCreatedStream(response.data);

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "gaming",
      });
      setThumbnail(null);
      setThumbnailPreview(null);
    } catch (error) {
      console.error("Error creating stream:", error);
      alert("Failed to create stream. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyStreamDetails = async () => {
    if (!createdStream) return;

    const details = `Stream Details:
Title: ${createdStream.title}
${createdStream.description ? `Description: ${createdStream.description}` : ""}
Category: ${
      CATEGORIES.find((cat) => cat.value === createdStream.category)?.label
    }
Stream Key: ${createdStream.stream_key}
RTMP URL: rtmp://live.scopium.fun:1935/live

OBS Studio Setup:
1. Open OBS Studio
2. Go to Settings → Stream
3. Set Service to "Custom..."
4. Set Server to: rtmp://live.scopium.fun:1935/live
5. Set Stream Key to: ${createdStream.stream_key}
6. Click "Start Streaming"`;

    try {
      await navigator.clipboard.writeText(details);
      setDetailsCopied(true);
      onStreamCreated(createdStream);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      alert(
        "Could not copy to clipboard automatically. Please copy the details manually."
      );
      setDetailsCopied(true);
      onStreamCreated(createdStream);
    }
  };

  return (
    <div
      className={`pt-[44px] pb-[36px] px-[74px] flex flex-col items-center gap-[24px] ${
        isDark
          ? "bg-[rgba(10,10,10,1)] text-white"
          : "bg-[rgba(235,235,235,1)] text-black"
      }`}
    >
      <h2 className="text-[24px] font-bold">Create Your Stream</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[24px] text-[14px] w-full"
      >
        <div className="flex flex-col gap-[4px]">
          <label htmlFor="title" className="font-semibold">
            Stream Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter your stream title"
            disabled={isLoading}
            required
            className={`px-[12px] py-[8px] rounded-[10px] border ${
              isDark
                ? "border-[rgba(1,219,117,1)] bg-[rgba(46,46,46,1)]"
                : "border-[rgba(255,215,236,1)] bg-[rgba(247,247,247,1)]"
            }`}
          />
        </div>

        <div className="flex flex-col gap-[4px]">
          <label htmlFor="category" className="font-semibold">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            disabled={isLoading}
            className={`px-[12px] py-[8px] rounded-[10px] border ${
              isDark
                ? "border-[rgba(1,219,117,1)]"
                : "border-[rgba(255,215,236,1)]"
            } ${isDark ? "bg-[rgba(46,46,46,1)]" : "bg-[rgba(247,247,247,1)]"}`}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-[4px]">
          <input
            type="file"
            id="thumbnail-input"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleThumbnailChange(e)}
            disabled={isLoading}
          />
          <h4 className="font-semibold">Promotional banner (optional)</h4>
          {thumbnailPreview ? (
            <div className="rounded-[10px] w-full flex items-center justify-center relative mt-4">
              <img
                src={thumbnailPreview}
                alt="Banner preview"
                style={{
                  maxWidth: "200px",
                  maxHeight: "120px",
                  objectFit: "cover",
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setThumbnail(null);
                  setThumbnailPreview(null);
                  document.getElementById("thumbnail-input").value = "";
                }}
                className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-50 text-[12px] text-[rgba(255,215,236,1)] bg-[rgba(211,0,0,1)] rounded-[3px] px-[12px] py-[4px] leading-none"
              >
                Remove
              </button>
            </div>
          ) : (
            <label
              htmlFor="thumbnail-input"
              className={`flex flex-col gap-[4px] cursor-pointer items-center justify-center w-full pt-[27px] pb-[24px] rounded-[10px] border ${
                isDark
                  ? "bg-[rgba(46,46,46,1)] border-[rgba(1,219,117,1)]"
                  : "bg-[rgba(247,247,247,1)] border-[rgba(255,215,236,1)]"
              }`}
            >
              <svg
                width="41"
                height="38"
                viewBox="0 0 41 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M39.7702 21.0846V11.7096C39.7702 8.94696 38.6727 6.29744 36.7192 4.34394C34.7657 2.39044 32.1162 1.29297 29.3535 1.29297H11.6452C8.88251 1.29297 6.23299 2.39044 4.27949 4.34394C2.32598 6.29744 1.22852 8.94696 1.22852 11.7096V26.293C1.22852 27.6609 1.49795 29.0154 2.02144 30.2793C2.54492 31.5431 3.31221 32.6914 4.27949 33.6587C6.23299 35.6122 8.88251 36.7096 11.6452 36.7096H24.6869"
                  stroke={isDark ? "#F7F7F7" : "rgba(10,10,10,0.6)"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.76953 29.4193L7.47786 22.7527C8.22753 22.0081 9.21143 21.5454 10.263 21.4429C11.3146 21.3404 12.3694 21.6044 13.2487 22.1902C14.128 22.7759 15.1828 23.0399 16.2344 22.9374C17.286 22.8349 18.2699 22.3722 19.0195 21.6277L23.8737 16.7735C25.2685 15.374 27.1151 14.5156 29.0842 14.3515C31.0532 14.1874 33.0165 14.7283 34.6237 15.8777L39.7695 19.8568M12.1862 15.1902C12.6404 15.1874 13.0895 15.0953 13.5081 14.9189C13.9266 14.7426 14.3063 14.4856 14.6255 14.1625C14.9447 13.8394 15.1971 13.4567 15.3684 13.036C15.5397 12.6154 15.6264 12.1652 15.6237 11.711C15.621 11.2568 15.5288 10.8077 15.3525 10.3891C15.1761 9.9706 14.9191 9.59089 14.596 9.27169C14.273 8.95249 13.8902 8.70005 13.4696 8.52878C13.0489 8.35751 12.5987 8.27076 12.1445 8.2735C11.2273 8.27903 10.3499 8.64868 9.70522 9.30115C9.06057 9.95362 8.70151 10.8355 8.70703 11.7527C8.71256 12.6699 9.08221 13.5473 9.73468 14.192C10.3872 14.8366 11.269 15.1957 12.1862 15.1902Z"
                  stroke={isDark ? "#F7F7F7" : "rgba(10,10,10,0.6)"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M34.4727 25.25V35.6667"
                  stroke={isDark ? "#F7F7F7" : "rgba(10,10,10,0.6)"}
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M39.2495 29.6379L35.1516 25.54C35.0625 25.4506 34.9567 25.3796 34.8401 25.3312C34.7236 25.2827 34.5986 25.2578 34.4724 25.2578C34.3462 25.2578 34.2212 25.2827 34.1047 25.3312C33.9881 25.3796 33.8823 25.4506 33.7932 25.54L29.6953 29.6379"
                  stroke={isDark ? "#F7F7F7" : "rgba(10,10,10,0.6)"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p
                className={`text-[14px] ${
                  isDark
                    ? "text-[rgba(247,247,247,0.6)]"
                    : "text-[rgba(10,10,10,0.6)]"
                }`}
              >
                Drag your banner image
              </p>
            </label>
          )}
        </div>

        <div className="flex flex-col gap-[4px] mb-[24px]">
          <label htmlFor="description" className="font-semibold">
            Stream description (optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Add your description"
            disabled={isLoading}
            rows={3}
            className={`px-[12px] py-[8px] rounded-[10px] border resize-y min-h-[80px] ${
              isDark
                ? "border-[rgba(1,219,117,1)] bg-[rgba(46,46,46,1)]"
                : "border-[rgba(255,215,236,1)] bg-[rgba(247,247,247,1)]"
            }`}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !formData.title.trim()}
          className={`w-full py-[12px] rounded-[10px] ${
            isDark
              ? "bg-[rgba(1,219,117,1)] text-black"
              : "bg-[rgba(250,78,171,1)] text-white"
          }`}
        >
          {isLoading ? "Creating..." : "Start Stream"}
        </button>
      </form>

      {createdStream && (
        <div
          className={`flex flex-col gap-[24px] rounded-[10px] p-4 ${
            isDark
              ? "bg-[rgba(46,46,46,1)] text-white"
              : "bg-[rgba(247,247,247,1)] text-black"
          }`}
        >
          <h3>Stream Created Successfully!</h3>
          <p
            className={`p-3 text-black rounded-[10px] text-center font-semibold`}
          >
            Please copy your stream details below. The stream key is your
            secret, keep it safe. The modal will close after copying.
          </p>
          <div className="stream-details">
            <p>
              <strong>Title:</strong> {createdStream.title}
            </p>
            {createdStream.description && (
              <p>
                <strong>Description:</strong> {createdStream.description}
              </p>
            )}
            <p>
              <strong>Category:</strong>{" "}
              {
                CATEGORIES.find((cat) => cat.value === createdStream.category)
                  ?.label
              }
            </p>
            {createdStream.thumbnail_url && (
              <div className="stream-thumbnail">
                <strong>Thumbnail:</strong>
                <img
                  src={createdStream.thumbnail_url}
                  alt="Stream thumbnail"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "120px",
                    objectFit: "cover",
                    display: "block",
                    marginTop: "5px",
                  }}
                />
              </div>
            )}
            <p>
              <strong>Stream Key:</strong>{" "}
              <code>{createdStream.stream_key}</code>
            </p>
            <p>
              <strong>RTMP URL:</strong>{" "}
              <code>rtmp://live.scopium.fun:1935/live</code>
            </p>
          </div>

          <div className="obs-instructions">
            <h4>OBS Studio Setup:</h4>
            <ol>
              <li>Open OBS Studio</li>
              <li>Go to Settings → Stream</li>
              <li>Set Service to "Custom..."</li>
              <li>
                Set Server to: <code>rtmp://live.scopium.fun:1935/live</code>
              </li>
              <li>
                Set Stream Key to: <code>{createdStream.stream_key}</code>
              </li>
              <li>Click "Start Streaming"</li>
            </ol>
          </div>

          <div className="copy-actions">
            <button
              onClick={copyStreamDetails}
              className={`text-white rounded-[10px] px-4 py-2 text-sm font-semibold ${
                isDark ? "bg-[rgba(1,219,117,1)]" : "bg-[rgba(250,78,171,1)]"
              }`}
              disabled={detailsCopied}
            >
              {detailsCopied ? "Details Copied!" : "Copy All Details"}
            </button>
            {detailsCopied && (
              <p className="copy-success">
                Stream details copied! Modal will close shortly...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default StreamCreator;
