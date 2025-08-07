import Link from "next/link";

const ShopHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 hover:text-blue-700">
            ← Kembali ke Home
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-green-700">Shop Home</h1>
        <p className="text-gray-600 mb-8">Welcome to our shop</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Electronics</h2>
            <p className="text-gray-600 mb-4">Latest electronic gadgets and devices</p>
            <Link href="/shop/electronics" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Lihat Electronics
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Clothing</h2>
            <p className="text-gray-600 mb-4">Fashion and apparel</p>
            <Link href="/shop/clothing" className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Lihat Clothing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHome;