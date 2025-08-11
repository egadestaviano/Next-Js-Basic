import { useEffect, useState } from "react";
import Link from "next/link";
import { trackStat } from "@/utils/statistics";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [notif, setNotif] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setProducts(JSON.parse(localStorage.getItem("products") || "[]"));
      setCategories(JSON.parse(localStorage.getItem("categories") || "[]"));
    }
  }, []);

  const handleAddToCart = (prod: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cart.find((item: any) => item.id === prod.id)) {
      cart.push(prod);
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage"));
      setNotif("Produk berhasil ditambahkan ke keranjang!");
      trackStat("addToCart", prod.id);
    } else {
      setNotif("Produk sudah ada di keranjang!");
    }
    setTimeout(() => setNotif(""), 2000);
  };

  const handleBuyNow = (prod: any) => {
    setNotif("Terima kasih, pesanan Anda sedang diproses!");
    trackStat("buyNow", prod.id);
    setTimeout(() => setNotif(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to Our App
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore our features and discover amazing products
          </p>
        </div>
        {notif && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded text-center">{notif}</div>}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary-700">Semua Produk</h2>
          {products.length === 0 ? (
            <div className="text-gray-500">Belum ada produk.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((prod) => (
                <div key={prod.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-semibold mb-2 text-primary-600">{prod.name}</h3>
                  <p className="text-gray-600 mb-2">Kategori: {categories.find((c) => c.id === prod.category)?.name || "-"}</p>
                  <p className="text-lg font-bold text-primary-600 mb-4">{prod.price}</p>
                  <div className="flex space-x-2">
                    <button onClick={() => handleAddToCart(prod)} className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700">
                      Add to Cart
                    </button>
                    <button onClick={() => handleBuyNow(prod)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-primary-600">Products</h2>
            <p className="text-gray-600 mb-4">
              Browse through our collection of amazing products
            </p>
            <Link 
              href="/product" 
              className="inline-block bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
            >
              View Products
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-primary-600">Shop</h2>
            <p className="text-gray-600 mb-4">
              Visit our shop for the latest items and deals
            </p>
            <Link 
              href="/shop" 
              className="inline-block bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
            >
              Visit Shop
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-primary-600">Authentication</h2>
            <p className="text-gray-600 mb-4">
              Login or register to access exclusive features
            </p>
            <Link 
              href="/auth/login" 
              className="inline-block bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
            >
              Login
            </Link>
          </div>
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <div className="flex justify-center space-x-4">
            <Link href="/shop/electronics" className="text-primary-600 hover:text-primary-700">
              Electronics
            </Link>
            <Link href="/shop/clothing" className="text-primary-600 hover:text-primary-700">
              Clothing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
