import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";

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
  const priceChangeClass =
    priceChange >= 0
      ? "text-green-600 bg-green-200"
      : "text-red-500 bg-red-200";

  const arrow = priceChange >= 0 ? "↑" : "↓";

  return (
    <>
      <span className={`popup-${symbol}`}>
        <span
          className={`${priceChangeClass} hover:underline cursor-pointer font-semibold`}
        >
          {arrow}{" "}
          {symbol.toUpperCase() + "/ USD" + " " + Math.abs(priceChange) + "%"}
          <span className="text-blue-500">{"+Free Alerts"}</span>
        </span>
      </span>
      <ReactTooltip
        anchorSelect={`.popup-${symbol}`}
        id={`chart-${symbol}`}
        place="bottom"
        className="bg-white text-black"
        clickable={true}
      >
        <div className="flex flex-col items-start bg-white text-black w-full ">
          <div className="border-b-2 flex  items-center justify-between w-full">
            <div>
              <h3 className="text-lg font-bold">
                {data.name.toUpperCase() + "/USD"}
              </h3>
              <p>{data.id}</p>
            </div>
            <div>
              <p>${data.current_price.toFixed(2)}</p>
              <div>0</div>
            </div>
          </div>
          <div className="border-b-2 flex flex-col">
            <div>
              <div className="flex justify-between mb-1">
                <span>Market Cap: </span>
                <span>${data.market_cap.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Volume: </span>
                <span>${data.total_volume.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Day range: </span>
                <span>
                  ${data.low_24h.toFixed(8)} - ${data.high_24h.toFixed(8)}
                </span>
              </div>
            </div>
            <div className="mt-2 ml-2">
              <Sparklines
                data={data.sparkline_in_7d.price}
                width={100}
                height={20}
              >
                <SparklinesLine color="#43caf0" />
                <SparklinesSpots
                  size={4}
                  spotColors={{ 0: "red", "-1": "green" }}
                />
              </Sparklines>
            </div>
          </div>
          <a href="#" className="text-blue-600">
            More about {data.name.toUpperCase() + "/USD"}
          </a>
        </div>
      </ReactTooltip>
    </>
  );
};

export default CryptoTicker;
