import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import { X, ChevronRight, ChevronLeft, Check } from "lucide-react";

const BusinessVerificationModal = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    business_name: "",
    point_of_contact_name: "",
    contact_email: "",
    social_links: {
      linkedin: "",
      x: "",
      facebook: "",
      telegram: "",
    },
    additional_info: "",
  });

  const [errors, setErrors] = useState({});

  const totalSteps = 3;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [platform]: value,
      },
    }));
    // Clear social_links error when user starts typing
    if (errors.social_links) {
      setErrors((prev) => ({
        ...prev,
        social_links: "",
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.business_name.trim()) {
        newErrors.business_name = "Business name is required";
      }
      if (!formData.point_of_contact_name.trim()) {
        newErrors.point_of_contact_name = "Contact name is required";
      }
    }

    if (step === 2) {
      if (!formData.contact_email.trim()) {
        newErrors.contact_email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email)) {
        newErrors.contact_email = "Please enter a valid email address";
      }

      // Check if at least one social link is provided
      const hasAnySocialLink = Object.values(formData.social_links).some(
        (link) => link.trim() !== ""
      );
      if (!hasAnySocialLink) {
        newErrors.social_links = "At least one social media link is required (preferably a verified profile)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/business/applications/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle field-specific errors from the API
        if (typeof errorData === 'object' && !errorData.message) {
          // Format field errors into a readable message
          const errorMessages = Object.entries(errorData).map(([field, messages]) => {
            const fieldName = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            const errorList = Array.isArray(messages) ? messages : [messages];
            return `${fieldName}: ${errorList.join(', ')}`;
          });
          throw new Error(errorMessages.join('\n'));
        }
        
        throw new Error(errorData.message || "Failed to submit application");
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 20000);
    } catch (error) {
      setSubmitError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData({
      business_name: "",
      point_of_contact_name: "",
      contact_email: "",
      social_links: {
        linkedin: "",
        x: "",
        facebook: "",
        telegram: "",
      },
      additional_info: "",
    });
    setErrors({});
    setSubmitSuccess(false);
    setSubmitError("");
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={`relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex-shrink-0 ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Business Verification</h2>
            <button
              onClick={handleClose}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? "text-gray-400 hover:text-white hover:bg-gray-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      step < currentStep
                        ? isDark
                          ? "bg-green-500 text-white"
                          : "bg-pink-500 text-white"
                        : step === currentStep
                        ? isDark
                          ? "bg-green-500 text-white"
                          : "bg-pink-500 text-white"
                        : isDark
                        ? "bg-gray-700 text-gray-400"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step < currentStep ? <Check className="w-4 h-4" /> : step}
                  </div>
                  {step < totalSteps && (
                    <div
                      className={`h-1 flex-1 mx-2 rounded transition-colors ${
                        step < currentStep
                          ? isDark
                            ? "bg-green-500"
                            : "bg-pink-500"
                          : isDark
                          ? "bg-gray-700"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs">
              <span className={currentStep === 1 ? "font-semibold" : ""}>
                Business Info
              </span>
              <span className={currentStep === 2 ? "font-semibold" : ""}>
                Contact
              </span>
              <span className={currentStep === 3 ? "font-semibold" : ""}>
                Additional
              </span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 py-6 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            {/* Step 1: Business Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                      errors.business_name
                        ? "border-red-500 focus:ring-red-400"
                        : isDark
                        ? "bg-gray-800 border-gray-700 text-white focus:ring-green-400"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-pink-400"
                    }`}
                    placeholder="Enter your business name"
                  />
                  {errors.business_name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.business_name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Point of Contact Name *
                  </label>
                  <input
                    type="text"
                    name="point_of_contact_name"
                    value={formData.point_of_contact_name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                      errors.point_of_contact_name
                        ? "border-red-500 focus:ring-red-400"
                        : isDark
                        ? "bg-gray-800 border-gray-700 text-white focus:ring-green-400"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-pink-400"
                    }`}
                    placeholder="Enter contact person's name"
                  />
                  {errors.point_of_contact_name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.point_of_contact_name}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    name="contact_email"
                    value={formData.contact_email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                      errors.contact_email
                        ? "border-red-500 focus:ring-red-400"
                        : isDark
                        ? "bg-gray-800 border-gray-700 text-white focus:ring-green-400"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-pink-400"
                    }`}
                    placeholder="contact@business.com"
                  />
                  {errors.contact_email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.contact_email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-3 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Social Media Links *
                  </label>
                  <div className="space-y-3">
                    {/* LinkedIn */}
                    <div>
                      <label
                        className={`block text-xs font-medium mb-1 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        value={formData.social_links.linkedin}
                        onChange={(e) =>
                          handleSocialLinkChange("linkedin", e.target.value)
                        }
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                          errors.social_links
                            ? "border-red-500 focus:ring-red-400"
                            : isDark
                            ? "bg-gray-800 border-gray-700 text-white focus:ring-green-400"
                            : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-pink-400"
                        }`}
                        placeholder="https://linkedin.com/company/..."
                      />
                    </div>

                    {/* X */}
                    <div>
                      <label
                        className={`block text-xs font-medium mb-1 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        X (Twitter)
                      </label>
                      <input
                        type="url"
                        value={formData.social_links.x}
                        onChange={(e) =>
                          handleSocialLinkChange("x", e.target.value)
                        }
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                          errors.social_links
                            ? "border-red-500 focus:ring-red-400"
                            : isDark
                            ? "bg-gray-800 border-gray-700 text-white focus:ring-green-400"
                            : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-pink-400"
                        }`}
                        placeholder="https://x.com/..."
                      />
                    </div>

                    {/* Facebook */}
                    <div>
                      <label
                        className={`block text-xs font-medium mb-1 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Facebook
                      </label>
                      <input
                        type="url"
                        value={formData.social_links.facebook}
                        onChange={(e) =>
                          handleSocialLinkChange("facebook", e.target.value)
                        }
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                          errors.social_links
                            ? "border-red-500 focus:ring-red-400"
                            : isDark
                            ? "bg-gray-800 border-gray-700 text-white focus:ring-green-400"
                            : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-pink-400"
                        }`}
                        placeholder="https://facebook.com/..."
                      />
                    </div>

                    {/* Telegram */}
                    <div>
                      <label
                        className={`block text-xs font-medium mb-1 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Telegram
                      </label>
                      <input
                        type="url"
                        value={formData.social_links.telegram}
                        onChange={(e) =>
                          handleSocialLinkChange("telegram", e.target.value)
                        }
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                          errors.social_links
                            ? "border-red-500 focus:ring-red-400"
                            : isDark
                            ? "bg-gray-800 border-gray-700 text-white focus:ring-green-400"
                            : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-pink-400"
                        }`}
                        placeholder="https://t.me/..."
                      />
                    </div>
                  </div>
                  {errors.social_links && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.social_links}
                    </p>
                  )}
                  <p
                    className={`mt-2 text-xs ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    * Required: Add at least one social media profile (preferably verified)
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 3: Additional Information */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Additional Information
                  </label>
                  <textarea
                    name="additional_info"
                    value={formData.additional_info}
                    onChange={handleInputChange}
                    rows="6"
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                      isDark
                        ? "bg-gray-800 border-gray-700 text-white focus:ring-green-400"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-pink-400"
                    }`}
                    placeholder="Tell us more about your business..."
                  />
                  <p
                    className={`mt-1 text-xs ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Optional: Share any relevant details about your business
                  </p>
                </div>

                {/* Review Summary */}
                <div
                  className={`mt-6 p-4 rounded-lg ${
                    isDark ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <h4 className="font-semibold mb-3">Review Your Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                        Business:
                      </span>{" "}
                      <span className="font-medium">{formData.business_name}</span>
                    </div>
                    <div>
                      <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                        Contact:
                      </span>{" "}
                      <span className="font-medium">
                        {formData.point_of_contact_name}
                      </span>
                    </div>
                    <div>
                      <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                        Email:
                      </span>{" "}
                      <span className="font-medium">{formData.contact_email}</span>
                    </div>
                  </div>
                </div>

                {submitError && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500 text-red-500 text-sm">
                    {submitError.split('\n').map((line, index) => (
                      <p key={index} className={index > 0 ? 'mt-1' : ''}>
                        {line}
                      </p>
                    ))}
                  </div>
                )}

                {submitSuccess && (
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500 text-green-500 text-sm">
                    <div className="flex items-start mb-2">
                      <Check className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold mb-1">Application submitted successfully!</p>
                        <p className="text-xs opacity-90">
                          We'll send a verification code to your verified social media profile. 
                          Please check your messages to complete the verification process.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-4 border-t flex justify-between flex-shrink-0 ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
              currentStep === 1
                ? "opacity-50 cursor-not-allowed"
                : isDark
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className={`flex items-center px-6 py-2 rounded-lg font-medium text-white transition-all ${
                isDark
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-pink-500 hover:bg-pink-600"
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || submitSuccess}
              className={`flex items-center px-6 py-2 rounded-lg font-medium text-white transition-all ${
                isSubmitting || submitSuccess
                  ? "opacity-50 cursor-not-allowed"
                  : isDark
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-pink-500 hover:bg-pink-600"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : submitSuccess ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  Submitted
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default BusinessVerificationModal;
