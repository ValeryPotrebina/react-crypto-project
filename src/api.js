import {cryptoAssets, cryptoData} from './data.js';

// const options = {
//     method: 'GET',
//     headers: {
//     accept: 'application/json',
//         'X-API-KEY': 'MjUMFoVRgb04+Vqf3HqeEOYAVj5mxgfIU0FI5Y1nSUQ='
//     }
// };

// const url = 'https://openapiv1.coinstats.app/coins'

// export async function FetchCrypto(url, options) {
//     try {
//         const response = await fetch(url, options);
//         if (!response.ok) {
//             throw new Error(`Error: ${response.status} - ${response.statusText}`);
//           }

//         return await response.json();
//     } catch(error) {
//         console.error("Error:", error);
//     }
// }

export function FaceFetchCrypto() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoData)
        }, 500)
    })
}

export function FetchAssets() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 500)
    })
}