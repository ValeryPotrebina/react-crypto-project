import { Flex, Tag, Typography, Divider} from "antd"; 
const { Text, Link } = Typography;
import CoinInfo from "./CoinInfo";
export default function CoinInfoModal({ coin }) {
    return (
        <>
            <CoinInfo coin={coin} />
            <Divider />
            <Typography.Paragraph>
                <Typography.Text strong style={{marginRight: 10}}>1 hour</Typography.Text>
                <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>
                
                <Typography.Text strong style={{marginRight: 10}}>1 day</Typography.Text>
                <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>

                <Typography.Text strong style={{marginRight: 10}}>1 week</Typography.Text>
                <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text strong style={{marginRight: 10}}>Price: </Typography.Text>
                {+(coin.price).toFixed(2)}$
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text strong style={{marginRight: 10}}>Price BTC: </Typography.Text>
                {+(coin.priceBtc)}
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text strong style={{marginRight: 10}}>Market Cap: </Typography.Text>
                {+(coin.marketCap)}
            </Typography.Paragraph>

            {coin.contractAddress && <Typography.Paragraph>
                <Typography.Text strong style={{marginRight: 10}}>Contract Address: </Typography.Text>
                {(coin.contractAddress)}
            </Typography.Paragraph>}

            <Typography.Paragraph>
                <Typography.Text strong style={{ marginRight: 10}}>Explorers: </Typography.Text>
                <ul style={{marginTop: 10}}>
                    {coin.explorers.map((explorer, index) => (
                        <li key={index}>
                            <Link href={explorer} target="_blank">
                                {explorer}
                            </Link>
                        </li>
                    ))}
                </ul>
            </Typography.Paragraph>

        </>
    )
  }