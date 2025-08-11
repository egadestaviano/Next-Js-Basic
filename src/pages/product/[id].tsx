import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

const DetailProduct = () => {
  const { query } = useRouter();
  const productId = query.id as string;

  // Mock product data
  const product = {
    id: productId,
    name: `Product ${productId}`,
    price: `$${parseInt(productId) * 100}`,
    description: `This is the detailed description for product ${productId}. It includes all the features and specifications.`,
    features: [
      "High quality material",
      "Durable construction",
      "Modern design",
      "Easy to use"
    ]
  };

  // State untuk notifikasi order
  const [orderMsg, setOrderMsg] = useState("");

  const handleAddToCart = () => {
    if (typeof window !== "undefined") {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      // Cek duplikat berdasarkan id
      if (!cart.find((item: any) => item.id === product.id)) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("storage")); // update header
        setOrderMsg("Produk berhasil ditambahkan ke keranjang!");
      } else {
        setOrderMsg("Produk sudah ada di keranjang!");
      }
      setTimeout(() => setOrderMsg(""), 2000);
    }
  };

  const handleBuyNow = () => {
    setOrderMsg("Terima kasih, pesanan Anda sedang diproses!");
    setTimeout(() => setOrderMsg(""), 2000);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/product" className="text-primary-600 hover:text-primary-700">
          ← Back to Products
        </Link>
      </div>
      {orderMsg && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          {orderMsg}
        </div>
      )}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl font-bold text-primary-600 mb-4">{product.price}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Features:</h2>
          <ul className="list-disc list-inside space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="text-gray-700">{feature}</li>
            ))}
          </ul>
        </div>
        
        <div className="flex space-x-4">
          <button onClick={handleAddToCart} className="bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700">
            Add to Cart
          </button>
          <button onClick={handleBuyNow} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
