import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const ProductPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [products] = useState([
    { id: 1, name: "Product 1", price: "$100", description: "This is product 1" },
    { id: 2, name: "Product 2", price: "$200", description: "This is product 2" },
    { id: 3, name: "Product 3", price: "$300", description: "This is product 3" },
  ]);
  const { push } = useRouter();
  // State untuk notifikasi
  const [notif, setNotif] = useState("");

  useEffect(() => {
    // Simulate login check - in real app, check from localStorage or context
    const checkLogin = () => {
      // For demo purposes, we'll skip the login check
      setIsLogin(true);
    };
    checkLogin();
  }, []);

  const handleLogout = () => {
    setIsLogin(false);
    push("/auth/login");
  };

  const handleViewDetails = (id: number) => {
    setNotif("Menuju halaman detail produk...");
    setTimeout(() => {
      setNotif("");
      push(`/product/${id}`);
    }, 500);
  };

  if (!isLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Please login first</h1>
          <Link href="/auth/login" className="bg-blue-500 text-white px-4 py-2 rounded">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800">Products</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        {notif && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
            {notif}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold mb-2 text-blue-600">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-bold text-blue-600 mb-4">{product.price}</p>
              <button
                onClick={() => handleViewDetails(product.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/" className="text-blue-500 hover:text-blue-700">
            ← Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
