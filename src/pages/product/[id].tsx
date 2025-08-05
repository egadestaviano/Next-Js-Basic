import { useRouter } from "next/router";
import Link from "next/link";

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

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/product" className="text-blue-500 hover:text-blue-700">
          ← Back to Products
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl font-bold text-blue-600 mb-4">{product.price}</p>
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
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Add to Cart
          </button>
          <button className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
