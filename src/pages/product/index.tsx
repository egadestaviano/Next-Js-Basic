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

  if (!isLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please login first</h1>
          <Link href="/auth/login" className="bg-blue-500 text-white px-4 py-2 rounded">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold text-blue-600 mb-4">{product.price}</p>
            <Link 
              href={`/product/${product.id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
