import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold">My App Header</h1>
                <nav className="mt-2">
                    <ul className="flex space-x-4">
                        <li><Link href="/" className="hover:text-blue-200">Home</Link></li>
                        <li><Link href="/product" className="hover:text-blue-200">Products</Link></li>
                        <li><Link href="/shop" className="hover:text-blue-200">Shop</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
