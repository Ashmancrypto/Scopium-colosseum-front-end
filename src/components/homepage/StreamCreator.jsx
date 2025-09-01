import { useState } from "react";
import axios from "axios";
import "./stream.css";

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
    <div className="stream-creator">
      <h2>Create New Stream</h2>

      <form onSubmit={handleSubmit} className="stream-form">
        <div className="form-group">
          <label htmlFor="title">Stream Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter stream title..."
            disabled={isLoading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Brief description of your stream..."
            disabled={isLoading}
            rows="3"
            maxLength="1000"
          />
          <small className="char-count">
            {formData.description.length}/1000 characters
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail Image</label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={handleThumbnailChange}
            disabled={isLoading}
          />
          {thumbnailPreview && (
            <div className="thumbnail-preview">
              <img
                src={thumbnailPreview}
                alt="Thumbnail preview"
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
                  document.getElementById("thumbnail").value = "";
                }}
                className="remove-thumbnail"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !formData.title.trim()}
          className="create-btn"
        >
          {isLoading ? "Creating..." : "Create Stream"}
        </button>
      </form>

      {createdStream && (
        <div className="stream-info">
          <h3>Stream Created Successfully!</h3>
          <p className="copy-instruction">
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
              className="copy-details-btn"
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
