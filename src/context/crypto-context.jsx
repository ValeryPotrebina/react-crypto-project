import { createContext, useContext, useEffect, useState } from "react";
import { FetchAssets, FetchCrypto } from "../api";
import { percentDifference } from "../utils";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((coin) => coin.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * (coin.price - asset.price),
        name: coin.name,
        ...asset,
      };
    });
  }

  useEffect(() => {
    async function preload() {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-KEY": "MjUMFoVRgb04+Vqf3HqeEOYAVj5mxgfIU0FI5Y1nSUQ=",
        },
      };

      const url = "https://openapiv1.coinstats.app/coins";
      setLoading(true);
      const response = await FetchCrypto(url, options);

      if (!response || !response.result) {
        console.error("Ошибка в ответе API: ", response);
        setLoading(false);
        return;
      }

      const { result } = response;
      const assets = await FetchAssets();
      setAssets(mapAssets(assets, result));
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);

  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
