import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
    const router = useRouter();
    
    const isActive = (path: string) => {
        return router.pathname === path;
    };

    return (
        <nav className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold">
                            ShopHub
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-8">
                        <Link
                            href="/"
                            className={`text-lg font-medium transition-colors ${
                                isActive('/')
                                    ? 'text-white border-b-2 border-white'
                                    : 'text-primary-100 hover:text-white'
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/product"
                            className={`text-lg font-medium transition-colors ${
                                isActive('/product')
                                    ? 'text-white border-b-2 border-white'
                                    : 'text-primary-100 hover:text-white'
                            }`}
                        >
                            Products
                        </Link>
                        <Link
                            href="/shop"
                            className={`text-lg font-medium transition-colors ${
                                isActive('/shop')
                                    ? 'text-white border-b-2 border-white'
                                    : 'text-primary-100 hover:text-white'
                            }`}
                        >
                            Shop
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/auth/login"
                            className="bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors"
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
