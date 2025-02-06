import { Layout, Select, Space, Button, Modal } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CoinInfoModal from '../CoinInfoModal';

const headerStyle = { 
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

export default function AppHeader() {
    const [select, setSelect] = useState(false)
    const [modal, setModal] = useState(false)
    const [coin, setCoin] = useState(null)
    const {crypto} = useCrypto()


    useEffect(() => {
        const keypress = (event) => {
            if (event.key === '/') {
                setSelect((prev) => !prev)
            }
        }
        document.addEventListener('keypress', keypress)
        return () => {
            document.removeEventListener('keypress', keypress)
        }
    }, [])
    function selectHandler(value){
        setCoin(crypto.find((coin) => coin.id === value))
        setModal(true)
    }

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{ 
                    width: 250
                }}
                open={select}
                onSelect={selectHandler}
                onClick={() => setSelect((prev) => !prev)}
                value='press / to open'
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img src={option.data.icon} alt={option.data.label} style={{width: 25}}/>{option.data.label}
                    </Space>)}/>
            <Button type="primary">Add asset</Button>

            <Modal 
                open={modal}  
                onCancel={() => setModal(false)} 
                footer={null}>
                    <CoinInfoModal coin={coin}/>
            </Modal>
        </Layout.Header>
    )
}