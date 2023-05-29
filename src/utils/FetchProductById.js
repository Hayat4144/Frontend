import {BASE_URL} from '../global/Base_URL'
const FetchProduct = async (product_id) => {
    try {
        const response = await fetch(`${BASE_URL}/v4/api/product/${product_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        const {Products,Varients} = await response.json();
        if(response.status === 200) return {Products,Varients};
    } catch (error) {
        console.error(error.message)
    }
}

export default FetchProduct;