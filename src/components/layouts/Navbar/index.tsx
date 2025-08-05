import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
    const router = useRouter();
    
    const isActive = (path: string) => {
        return router.pathname === path;
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-blue-600">
                            MyApp
                        </Link>
                    </div>
                    
                    <div className="hidden md:flex space-x-8">
                        <Link 
                            href="/" 
                            className={`text-lg font-medium transition-colors ${
                                isActive('/') 
                                    ? 'text-blue-600 border-b-2 border-blue-600' 
                                    : 'text-gray-600 hover:text-blue-600'
                            }`}
                        >
                            Home
                        </Link>
                        <Link 
                            href="/product" 
                            className={`text-lg font-medium transition-colors ${
                                isActive('/product') 
                                    ? 'text-blue-600 border-b-2 border-blue-600' 
                                    : 'text-gray-600 hover:text-blue-600'
                            }`}
                        >
                            Products
                        </Link>
                        <Link 
                            href="/shop" 
                            className={`text-lg font-medium transition-colors ${
                                isActive('/shop') 
                                    ? 'text-blue-600 border-b-2 border-blue-600' 
                                    : 'text-gray-600 hover:text-blue-600'
                            }`}
                        >
                            Shop
                        </Link>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <Link 
                            href="/auth/login" 
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;