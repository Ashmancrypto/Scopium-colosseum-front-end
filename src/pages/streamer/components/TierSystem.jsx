import { useState, createContext, useContext } from "react";
import { useTheme } from "../../../contexts/ThemeContext.jsx";

// Create Tier Context
const TierContext = createContext();

// Main TierSystem Component
function TierSystem() {
  return (
    <TierProvider>
      <div className="w-full p-4">
        <Header />
        <TierList />
      </div>
    </TierProvider>
  );
}

// Tier Provider Component
function TierProvider({ children }) {
  const { isDark } = useTheme();
  const [selectedTier, setSelectedTier] = useState(null);

  const theme = {
    isDark,
    cardBackground: isDark ? "bg-gray-800" : "bg-white",
    textPrimary: isDark ? "text-white" : "text-gray-900",
    textSecondary: isDark ? "text-gray-300" : "text-gray-600",
  };

  const tiers = [
    {
      id: "bronze",
      name: "BRONZE",
      token: "10,000",
      color: "bg-gradient-to-r from-amber-600 to-amber-800",
      textColor: "text-amber-600",
    },
    {
      id: "silver",
      name: "SILVER",
      token: "100,000",
      color: "bg-gradient-to-r from-gray-400 to-gray-600",
      textColor: "text-gray-400",
      popular: true,
    },
    {
      id: "gold",
      name: "GOLD",
      token: "500,000",
      color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      textColor: "text-yellow-400",
    },
  ];

  const value = {
    selectedTier,
    setSelectedTier,
    theme,
    tiers,
  };

  return <TierContext.Provider value={value}>{children}</TierContext.Provider>;
}

// Individual Tier Card Component
function TierCard({ tier }) {
  const { selectedTier, setSelectedTier, theme } = useContext(TierContext);
  const { isDark } = theme;
  const isSelected = selectedTier === tier.id;

  const borderColor = isSelected ? "#FA4EAB" : isDark ? "#374151" : "#e5e7eb";

  return (
    <div
      className={`
        relative rounded-lg p-4 transition-all duration-300 cursor-pointer
        ${theme.cardBackground}
        ${isSelected ? "ring-2 ring-[#FA4EAB]" : "border border-gray-200"}
        hover:shadow-md hover:scale-[1.02]
        flex items-center justify-between min-h-[70px]
      `}
      style={{
        backgroundColor: isDark ? "#1f2937" : "#ffffff",
        borderColor,
      }}
      onClick={() => setSelectedTier(tier.id)}
    >
      {tier.popular && <PopularBadge />}
      <TierInfo tier={tier} />
      <TierActions tier={tier} />
    </div>
  );
}

// Popular Badge Component
function PopularBadge() {
  return (
    <div
      className="absolute -top-2 left-4 px-2 py-1 rounded text-xs font-medium text-white"
      style={{ backgroundColor: "#FA4EAB" }}
    >
      POPULAR
    </div>
  );
}

// Tier Info Component (Left side)
function TierInfo({ tier }) {
  return (
    <div className="flex items-center gap-3 flex-1">
      <TierIcon tier={tier} />
      <TierDetails tier={tier} />
    </div>
  );
}

// Tier Icon Component
function TierIcon({ tier }) {
  return (
    <div
      className={`w-12 h-12 rounded-lg ${tier.color} flex items-center justify-center flex-shrink-0`}
    >
      <span className="text-white font-bold text-sm">{tier.name[0]}</span>
    </div>
  );
}

// Tier Details Component
function TierDetails({ tier }) {
  const { theme } = useContext(TierContext);

  return (
    <div className="flex-1">
      <h3 className={`font-bold text-sm ${tier.textColor}`}>{tier.name}</h3>
      <p className={`text-xs ${theme.textSecondary}`}>Membership Tier</p>
    </div>
  );
}

// Tier Actions Component (Right side)
function TierActions({ tier }) {
  return (
    <div className="flex items-center gap-4 flex-shrink-0">
      <TokenDisplay token={tier.token} />
      <BuyButton />
    </div>
  );
}

// Token Display Component
function TokenDisplay({ token }) {
  const { theme } = useContext(TierContext);

  return (
    <div className="text-right min-w-[80px]">
      <div className={`text-sm font-bold ${theme.textPrimary}`}>{token}</div>
      <div className={`text-xs ${theme.textSecondary}`}>Tokens</div>
    </div>
  );
}

// Buy Button Component
function BuyButton() {
  const { selectedTier } = useContext(TierContext);
  const isSelected = selectedTier !== null;

  return (
    <button
      className={`
        px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 text-white
        flex-shrink-0 min-w-[60px]
        ${isSelected ? "shadow-lg" : "hover:shadow-md"}
      `}
      style={{
        backgroundColor: "#FA4EAB",
        opacity: isSelected ? 1 : 0.8,
      }}
      onMouseEnter={(e) => (e.target.style.opacity = 1)}
      onMouseLeave={(e) => (e.target.style.opacity = isSelected ? 1 : 0.8)}
    >
      Buy
    </button>
  );
}

// Header Component
function Header() {
  const { theme } = useContext(TierContext);

  return (
    <div className="text-center mb-6">
      <h2 className={`text-xl font-bold mb-2 ${theme.textPrimary}`}>
        Support Tiers
      </h2>
    </div>
  );
}

// Tier List Component
function TierList() {
  const { tiers } = useContext(TierContext);

  return (
    <div className="flex flex-col gap-3">
      {tiers.map((tier) => (
        <TierCard key={tier.id} tier={tier} />
      ))}
    </div>
  );
}

export default TierSystem;
