import {Layout, Card, Statistic, List, Typography, Spin, Tag} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { FetchAssets, FaceFetchCrypto } from '../../api';
import {percentDifference, capitalize} from '../../utils'

const siderStyle = {
    padding: '1rem',
};

const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
        'X-API-KEY': 'MjUMFoVRgb04+Vqf3HqeEOYAVj5mxgfIU0FI5Y1nSUQ='
    }
};

const url = 'https://openapiv1.coinstats.app/coins'



export default function AppSider() {
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

    if (loading) {
        return <Spin fullscreen />
    }

    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map(asset => (
                <Card key={asset.id} style={{marginBottom: '1rem'}}>
                <Statistic
                    title={capitalize(asset.id)}
                    value={asset.totalAmount}
                    precision={2}
                    valueStyle={{
                      color: asset.grow ? '#3f8600' : '#cf1322',
                    }}
                    prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    suffix="$"/>
                <List
                    size='small'
                    // Общий профит (сколько заработали), количество криптовалюты и разницы в процентах
                    dataSource={[
                        {title: 'Total profit', value: asset.totalProfit, withTag: true},
                        {title: 'Asset Amount', value: asset.amount, isPlain: true},
                        // {title: 'Difference', value: asset.growPercent},

                    ]}
                    renderItem={(item) => (
                    <List.Item>
                        <span>{item.title}</span>  
                        <span>
                            {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                            {item.isPlain && <span>{item.value}</span>}
                            {!item.isPlain && (
                                <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                                    {item.value.toFixed(2)}$
                                </Typography.Text>)}      
                        </span>     
                    </List.Item>
                    )}/>
            </Card>
            ))}
            
            {/* <Card>
                <Statistic
                    title="Idle"
                    value={9.3}
                    precision={2}
                    valueStyle={{
                      color: '#cf1322',
                    }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"/>
            </Card> */}
        </Layout.Sider>
    )
}