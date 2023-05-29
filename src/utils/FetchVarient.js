import { BASE_URL } from "../global/Base_URL"

const FetchVarient = async(varient_id)=>{
    try {
        const varient = await fetch(`${BASE_URL}/v3/api/product/varientById/${varient_id}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            },
            credentials:'include'
        });
        const {data,error} = await varient.json();
        if(varient.status === 200) return [data];
    } catch (error) {
        console.error(error)
    }
}

export default FetchVarient;