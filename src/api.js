import {cryptoAssets, cryptoData} from './data.js';




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
        }, 100)
    })
}

// PBvUOusdd2hNGsbFr7LaS8rlGwPXHGzpOqHIS9Vlou4
export function FetchAssets() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 100)
    })
}