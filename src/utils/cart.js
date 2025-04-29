import toast from "react-hot-toast";

export async function addToCart(product) {
    const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product })
    });

    const data = await res.json();
    if(res.ok){
        toast.success("Product Added successfully!!")
    }
    if (!res.ok) throw new Error(data.message);
    return data;
}
