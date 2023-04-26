import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const symbolToCoinGeckoId = {
  pepe: "pepe",
  shib: "shiba-inu",
  doge: "dogecoin",
  // Add more mappings as needed
};

const CryptoTicker = ({ symbol }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const coinGeckoId = symbolToCoinGeckoId[symbol.toLowerCase()];
      if (coinGeckoId) {
        const response = await axios.get(`/api/crypto?symbol=${coinGeckoId}`);
        setData(response.data[0]);
      } else setData([]);
    };

    fetchData();
  }, [symbol]);

  if (!data) {
    return <span>Loading...</span>;
  }

  if (data.length === 0) {
    return "";
  }

  const priceChange = data.price_change_percentage_24h.toFixed(2);
  const priceChangeClass = priceChange >= 0 ? "text-green-600" : "text-red-600";

  const arrow = priceChange >= 0 ? "↑" : "↓";

  return (
    <>
      <span className={`popup-${symbol}`}>
        <span className={`${priceChangeClass} hover:underline cursor-pointer`}>
          {symbol.toUpperCase()} {arrow} {Math.abs(priceChange)}%
        </span>
      </span>
      <ReactTooltip
        anchorSelect={`.popup-${symbol}`}
        id={`chart-${symbol}`}
        place="bottom"
      >
        <div className="flex flex-col items-center space-y-2">
          <h3 className="text-lg font-bold">{data.name}</h3>
          <p>Price: ${data.current_price.toFixed(2)}</p>
          <p>Market Cap: ${data.market_cap.toLocaleString()}</p>
          <p>Volume: ${data.total_volume.toLocaleString()}</p>
          <p>
            Day range: ${data.low_24h.toFixed(8)} - ${data.high_24h.toFixed(8)}
          </p>
        </div>
      </ReactTooltip>
    </>
  );
};

export default CryptoTicker;
