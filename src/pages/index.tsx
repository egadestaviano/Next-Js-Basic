import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to Our App
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore our features and discover amazing products
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Products</h2>
            <p className="text-gray-600 mb-4">
              Browse through our collection of amazing products
            </p>
            <Link 
              href="/product" 
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View Products
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Shop</h2>
            <p className="text-gray-600 mb-4">
              Visit our shop for the latest items and deals
            </p>
            <Link 
              href="/shop" 
              className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Visit Shop
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-purple-600">Authentication</h2>
            <p className="text-gray-600 mb-4">
              Login or register to access exclusive features
            </p>
            <Link 
              href="/auth/login" 
              className="inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Login
            </Link>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <div className="flex justify-center space-x-4">
            <Link href="/shop/electronics" className="text-blue-500 hover:text-blue-700">
              Electronics
            </Link>
            <Link href="/shop/clothing" className="text-blue-500 hover:text-blue-700">
              Clothing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
