import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

const ShopPage = () => {
    const {query} = useRouter();
    const slug = query.slug as string[];
    // State untuk notifikasi order
    const [orderMsg, setOrderMsg] = useState("");
    
    // Mock shop data based on slug
    const getShopData = () => {
        if (!slug || slug.length === 0) {
            return {
                title: "Shop Home",
                description: "Welcome to our shop",
                items: []
            };
        }
        
        if (slug[0] === "electronics") {
            return {
                title: "Electronics Shop",
                description: "Latest electronic gadgets and devices",
                items: [
                    { id: 1, name: "Smartphone", price: "$500" },
                    { id: 2, name: "Laptop", price: "$1200" },
                    { id: 3, name: "Headphones", price: "$150" }
                ]
            };
        }
        
        if (slug[0] === "clothing") {
            return {
                title: "Clothing Shop",
                description: "Fashion and apparel",
                items: [
                    { id: 1, name: "T-Shirt", price: "$25" },
                    { id: 2, name: "Jeans", price: "$80" },
                    { id: 3, name: "Shoes", price: "$120" }
                ]
            };
        }
        
        return {
            title: `Shop: ${slug.join('/')}`,
            description: "Shop category",
            items: []
        };
    };
    
    const shopData = getShopData();

    const handleAddToCart = (itemName: string) => {
        if (typeof window !== "undefined") {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            const item = shopData.items.find((i) => i.name === itemName);
            if (!item) return;
            if (!cart.find((p: any) => p.name === item.name)) {
                cart.push(item);
                localStorage.setItem("cart", JSON.stringify(cart));
                window.dispatchEvent(new Event("storage"));
                setOrderMsg(`${itemName} berhasil ditambahkan ke keranjang!`);
            } else {
                setOrderMsg(`${itemName} sudah ada di keranjang!`);
            }
            setTimeout(() => setOrderMsg(""), 2000);
        }
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
            <div className="container mx-auto px-6 py-12">
                <div className="mb-6">
                    <Link href="/shop" className="text-primary-600 hover:text-primary-700">
                        ← Kembali ke Shop Home
                    </Link>
                </div>
                {orderMsg && (
                    <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
                        {orderMsg}
                    </div>
                )}
                <h1 className="text-4xl font-bold mb-4 text-primary-700">{shopData.title}</h1>
                <p className="text-gray-600 mb-8">{shopData.description}</p>
                {shopData.items.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {shopData.items.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                                <h2 className="text-2xl font-semibold mb-2 text-primary-600">{item.name}</h2>
                                <p className="text-lg font-bold text-primary-600 mb-4">{item.price}</p>
                                <button onClick={() => handleAddToCart(item.name)} className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700">
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No items available in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;