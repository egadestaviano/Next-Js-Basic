import { useEffect, useState } from "react";
import Link from "next/link";

const CartPage = () => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(stored);
    }
    const handleStorage = () => {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(stored);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleRemove = (id: string | number) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-6">
          <Link href="/" className="text-primary-600 hover:text-primary-700">
            ← Kembali ke Home
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-8 text-primary-700">Keranjang Belanja</h1>
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600">Keranjang masih kosong.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-semibold mb-2 text-primary-600">{item.name}</h2>
                <p className="text-lg font-bold text-primary-600 mb-4">{item.price}</p>
                <button onClick={() => handleRemove(item.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Hapus
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;