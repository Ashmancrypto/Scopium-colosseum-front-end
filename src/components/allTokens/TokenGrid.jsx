import React from 'react';
import { TokenCard } from './index.js';

const TokenGrid = ({ tokens }) => {

  if (!tokens || tokens.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 w-[900px]">
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