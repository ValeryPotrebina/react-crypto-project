import {createContext, useContext, useEffect, useState } from 'react'
import { FetchAssets, FaceFetchCrypto } from '../api';
import { percentDifference } from '../utils';

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false
})

export function CryptoContextProvider({children}) {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const {result} = await FaceFetchCrypto()
            const assets = await FetchAssets()
            setAssets(assets.map(asset => {
                // Почему не используем тут crypto
            const coin = result.find((coin) => coin.id === asset.id)
                return {
                    grow: asset.price < coin.price,
                    growPercent: percentDifference(asset.price, coin.price),
                    totalAmount: asset.amount * coin.price,
                    totalProfit: asset.amount * (coin.price - asset.price),
                    ... asset
                }
            }))
            setCrypto(result)
            setLoading(false)
        }
        preload()
    }, [])

    return (<CryptoContext.Provider value={{loading, crypto, assets}}>{children}</CryptoContext.Provider>)
}

export default CryptoContext

export function useCrypto() {
    return useContext(CryptoContext)
}