
export default function CoinInfoModal({ coin }) {
    return <h2>{coin?.name || 'Loading...'}</h2>;
  }