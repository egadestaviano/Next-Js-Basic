import { useRouter } from "next/router";
import Link from "next/link";

const ShopPage = () => {
    const {query} = useRouter();
    const slug = query.slug as string[];
    
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
    
    return (
        <div className="container mx-auto p-6">
            <div className="mb-6">
                <Link href="/" className="text-blue-500 hover:text-blue-700">
                    ← Back to Home
                </Link>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{shopData.title}</h1>
            <p className="text-gray-600 mb-6">{shopData.description}</p>
            
            {shopData.items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {shopData.items.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 shadow-md">
                            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                            <p className="text-lg font-bold text-blue-600 mb-4">{item.price}</p>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
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
    );
};

export default ShopPage;