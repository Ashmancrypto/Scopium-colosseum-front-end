import React from 'react';
import { TokenCard } from './index.js';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const TokenGrid = ({ tokens }) => {
  const { isDark } = useTheme();

  if (!tokens || tokens.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-5 lg:gap-6 justify-start">
      {tokens.map((token, index) => (
        <TokenCard
          key={token.mintAddr || token._id || index}
          token={token}
        />
      ))}
    </div>
  );
};

export default TokenGrid;