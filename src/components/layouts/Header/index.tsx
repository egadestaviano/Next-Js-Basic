import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/pages/_app";

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [cartCount, setCartCount] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            setCartCount(cart.length);
        }
        // Listen to storage event for cross-tab sync
        const handleStorage = () => {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            setCartCount(cart.length);
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-primary-600 font-bold text-lg">S</span>
                        </div>
                        <h1 className="text-xl font-display font-bold group-hover:text-primary-100 transition-colors">
                            ShopHub
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex space-x-6 items-center">
                            <li>
                                <Link 
                                    href="/" 
                                    className="hover:text-primary-100 transition-colors duration-200 font-medium"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/product" 
                                    className="hover:text-primary-100 transition-colors duration-200 font-medium"
                                >
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/shop" 
                                    className="hover:text-primary-100 transition-colors duration-200 font-medium"
                                >
                                    Shop
                                </Link>
                            </li>
                            {isAuthenticated && (
                                <li>
                                    <Link 
                                        href="/dashboard" 
                                        className="hover:text-primary-100 transition-colors duration-200 font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link 
                                    href="/cart" 
                                    className="relative hover:text-primary-100 transition-colors duration-200 font-medium flex items-center"
                                    aria-label="Shopping cart"
                                >
                                    <span className="text-xl mr-1">🛒</span>
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 animate-bounce-gentle">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                            </li>
                            <li>
                                {isAuthenticated ? (
                                    <div className="flex items-center space-x-3">
                                        <span className="text-sm text-primary-100">
                                            Halo, {user?.name || user?.email}
                                        </span>
                                        <button
                                            onClick={handleLogout}
                                            className="bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors duration-200 font-medium"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <Link 
                                        href="/auth/login"
                                        className="bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors duration-200 font-medium"
                                    >
                                        Login
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-primary-500 transition-colors"
                        aria-label="Toggle mobile menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <nav className="md:hidden mt-4 animate-slide-up">
                        <ul className="flex flex-col space-y-3">
                            <li>
                                <Link 
                                    href="/" 
                                    className="block py-2 hover:text-primary-100 transition-colors duration-200"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/product" 
                                    className="block py-2 hover:text-primary-100 transition-colors duration-200"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/shop" 
                                    className="block py-2 hover:text-primary-100 transition-colors duration-200"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Shop
                                </Link>
                            </li>
                            {isAuthenticated && (
                                <li>
                                    <Link 
                                        href="/dashboard" 
                                        className="block py-2 hover:text-primary-100 transition-colors duration-200"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link 
                                    href="/cart" 
                                    className="block py-2 hover:text-primary-100 transition-colors duration-200 flex items-center"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className="text-xl mr-2">🛒</span>
                                    Cart
                                    {cartCount > 0 && (
                                        <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                            </li>
                            <li>
                                {isAuthenticated ? (
                                    <div className="py-2">
                                        <div className="text-sm text-primary-100 mb-2">
                                            Halo, {user?.name || user?.email}
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left py-2 hover:text-primary-100 transition-colors duration-200"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <Link 
                                        href="/auth/login"
                                        className="block py-2 hover:text-primary-100 transition-colors duration-200"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
