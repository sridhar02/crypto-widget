import CryptoTicker from "@/components/CryptoTracker";

export const parseCryptoSymbols = (text) => {
  const regex = /\(([^)]+)\)/g;
  const symbols = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    symbols.push({ symbol: match[1].toLowerCase(), index: match.index });
  }

  return symbols;
};

export const splitTextWithCryptoTickers = (text, symbols) => {
  const parts = [];
  let prevIndex = 0;

  symbols.forEach(({ symbol, index }) => {
    parts.push(text.slice(prevIndex, index));
    parts.push(<CryptoTicker key={symbol} symbol={symbol} />);
    prevIndex = index + symbol.length + 2; // +2 for the parentheses
  });

  parts.push(text.slice(prevIndex));

  return parts;
};
