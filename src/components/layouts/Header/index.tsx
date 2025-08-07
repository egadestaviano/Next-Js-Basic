import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
    const [cartCount, setCartCount] = useState(0);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            setCartCount(cart.length);
            setIsLogin(localStorage.getItem("isLogin") === "true");
        }
        // Listen to storage event for cross-tab sync
        const handleStorage = () => {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            setCartCount(cart.length);
            setIsLogin(localStorage.getItem("isLogin") === "true");
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">My App Header</h1>
                <nav className="mt-2">
                    <ul className="flex space-x-4 items-center">
                        <li><Link href="/" className="hover:text-blue-200">Home</Link></li>
                        <li><Link href="/product" className="hover:text-blue-200">Products</Link></li>
                        <li><Link href="/shop" className="hover:text-blue-200">Shop</Link></li>
                        {isLogin && <li><Link href="/dashboard" className="hover:text-blue-200">Dashboard</Link></li>}
                        <li>
                            <Link href="/cart" className="relative hover:text-blue-200">
                                <span className="inline-block align-middle mr-1">🛒</span>
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{cartCount}</span>
                                )}
                                <span className="sr-only">Keranjang</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
