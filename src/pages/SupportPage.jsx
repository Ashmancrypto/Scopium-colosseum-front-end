import Header from "../components/Header";
import Footer from "../components/Footer";
import { useToastContext } from "../contexts/ToastContext";

const SupportPage = () => {
    const toast = useToastContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const message = formData.get("message");
    console.log(email, message);
    toast.success("Message Sent", "Your message has been sent successfully", 3000);
  };
  return (
    <div className="min-h-screen bg-[rgba(235,235,235,1)] flex flex-col relative">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="relative z-10 flex-1 pt-20 pb-32 overflow-hidden">
        <div className="hidden lg:block absolute left-0 top-40">
          <img
            src="/legal-docs/left-scopium.png"
            alt="Info icon"
            className=" opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute left-0 top-[50rem]">
          <img
            src="/legal-docs/right-flame.png"
            alt="Security icon"
            className="opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute left-2 bottom-[650rem]">
          <img
            src="/legal-docs/left-flame.png"
            alt="Check icon"
            className="opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute left-0 bottom-[550rem]">
          <img
            src="/legal-docs/left-scopium.png"
            alt="Layout icon"
            className="opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute left-0 bottom-[450rem]">
          <img
            src="/legal-docs/left-flame.png"
            alt="Document icon"
            className="opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute left-0 bottom-[350rem]">
          <img
            src="/legal-docs/right-scopium.png"
            alt="Document icon"
            className="opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute left-0 bottom-[250rem]">
          <img
            src="/legal-docs/right-flame.png"
            alt="Document icon"
            className="opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute left-0 bottom-[150rem]">
          <img
            src="/legal-docs/left-scopium.png"
            alt="Document icon"
            className="opacity-50"
          />
        </div>
        <div className="hidden lg:block absolute left-0 bottom-[100rem]">
          <img
            src="/legal-docs/left-flame.png"
            alt="Document icon"
            className="opacity-50"
          />
        </div>
        <div className="hidden lg:block absolute left-0 bottom-[40rem]">
          <img
            src="/legal-docs/right-scopium.png"
            alt="Document icon"
            className="opacity-50"
          />
        </div>

        {/* Right Side Icons */}
        <div className="hidden lg:block absolute right-0 top-80">
          <img
            src="/legal-docs/scopium-f-right.png"
            alt="Info icon"
            className=" opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute right-2 top-[150rem]">
          <img
            src="/legal-docs/left-flame.png"
            alt="Check icon"
            className="opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute right-0 top-[250rem]">
          <img
            src="/legal-docs/Scopium-o-right.png"
            alt="Layout icon"
            className="opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute right-0 top-[350rem]">
          <img
            src="/legal-docs/left-flame.png"
            alt="Document icon"
            className="opacity-50"
          />
        </div>

        <div className="hidden lg:block absolute right-0 top-[450rem]">
          <img
            src="/legal-docs/flame-o-right.png"
            alt="Document icon"
            className="opacity-50"
          />
        </div>
        <div className="hidden lg:block absolute right-0 top-[550rem]">
          <img
            src="/legal-docs/Scopium-o-right.png"
            alt="Document icon"
            className="opacity-50"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-black text-center text-[14px]">
          {/* Main Content Container */}
          
          <h1 className="text-[36px] font-bold mb-5 mx-auto">CONTACT US</h1>
          <p className="text-[16px] mb-10">We're here to help you with any questions or concerns you may have. Please fill out the form below and we'll get back to you as soon as possible.</p>
          <form onSubmit={(e) => handleSubmit(e)} className="text-start flex flex-col items-center gap-4 w-[50%] mx-auto">
            <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" className="border border-gray-300 rounded-md p-2 active:outline-none focus:outline-none"/>
            </div>
            <div className="flex flex-col gap-2 w-full">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" className="border border-gray-300 rounded-md p-2 active:outline-none focus:outline-none" rows="5"/>
            </div>
            <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded-md">Submit</button>
          </form>
        </div>
      </main>{" "}
      <Footer />
    </div>
  );
};

export default SupportPage;
