import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getStats, getTotalStats } from "@/utils/statistics";

const Dashboard = () => {
  const { push } = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [catName, setCatName] = useState("");
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodCat, setProdCat] = useState("");
  const [notif, setNotif] = useState("");
  const [stats, setStats] = useState<any>({});
  const [totalStats, setTotalStats] = useState<any>({ addToCart: 0, buyNow: 0, cancel: 0 });
  const [users, setUsers] = useState<any[]>([]);
  const [menu, setMenu] = useState<'product'|'stats'|'user'>('product');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const login = localStorage.getItem("isLogin");
      setIsLogin(login === "true");
      if (login !== "true") push("/auth/login");
      setCategories(JSON.parse(localStorage.getItem("categories") || "[]"));
      setProducts(JSON.parse(localStorage.getItem("products") || "[]"));
      setStats(getStats());
      setTotalStats(getTotalStats());
      setUsers(JSON.parse(localStorage.getItem("users") || "[]"));
    }
  }, [push]);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;
    const newCats = [...categories, { id: Date.now(), name: catName }];
    setCategories(newCats);
    localStorage.setItem("categories", JSON.stringify(newCats));
    setCatName("");
    setNotif("Kategori berhasil ditambah!");
    setTimeout(() => setNotif(""), 1200);
  };
  const handleDeleteCategory = (id: number) => {
    const newCats = categories.filter((c) => c.id !== id);
    setCategories(newCats);
    localStorage.setItem("categories", JSON.stringify(newCats));
    const newProds = products.filter((p) => p.category !== id);
    setProducts(newProds);
    localStorage.setItem("products", JSON.stringify(newProds));
  };
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || !prodPrice.trim() || !prodCat) return;
    const newProds = [...products, { id: Date.now(), name: prodName, price: prodPrice, category: parseInt(prodCat) }];
    setProducts(newProds);
    localStorage.setItem("products", JSON.stringify(newProds));
    setProdName(""); setProdPrice(""); setProdCat("");
    setNotif("Produk berhasil ditambah!");
    setTimeout(() => setNotif(""), 1200);
  };
  const handleDeleteProduct = (id: number) => {
    const newProds = products.filter((p) => p.id !== id);
    setProducts(newProds);
    localStorage.setItem("products", JSON.stringify(newProds));
  };

  const Bar = ({ value, max, color }: { value: number, max: number, color: string }) => (
    <div className="h-4 bg-gray-200 rounded">
      <div style={{ width: `${max ? (value / max) * 100 : 0}%`, background: color }} className="h-4 rounded"></div>
    </div>
  );
  const maxStat = Math.max(totalStats.addToCart, totalStats.buyNow, totalStats.cancel, 1);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-900 shadow-lg min-h-screen p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-white mb-8">Dashboard</h2>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li>
              <button onClick={() => setMenu('product')} className={`w-full text-left px-4 py-2 rounded transition-colors duration-150 ${menu==='product'?'bg-primary-600 text-white font-bold':'text-primary-100 hover:bg-primary-800 hover:text-white'}`}>Product</button>
            </li>
            <li>
              <button onClick={() => setMenu('stats')} className={`w-full text-left px-4 py-2 rounded transition-colors duration-150 ${menu==='stats'?'bg-primary-600 text-white font-bold':'text-primary-100 hover:bg-primary-800 hover:text-white'}`}>Stats</button>
            </li>
            <li>
              <button onClick={() => setMenu('user')} className={`w-full text-left px-4 py-2 rounded transition-colors duration-150 ${menu==='user'?'bg-primary-600 text-white font-bold':'text-primary-100 hover:bg-primary-800 hover:text-white'}`}>User</button>
            </li>
          </ul>
        </nav>
        <button onClick={handleLogout} className="mt-8 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        {notif && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded text-center">{notif}</div>}
        {menu === 'product' && (
          <>
            {/* Form tambah kategori */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Tambah Kategori</h2>
              <form className="flex gap-4" onSubmit={handleAddCategory}>
                <input type="text" className="border px-3 py-2 rounded w-full" placeholder="Nama kategori" value={catName} onChange={e => setCatName(e.target.value)} required />
                <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700">Tambah</button>
              </form>
              <ul className="mt-4">
                {categories.map((cat) => (
                  <li key={cat.id} className="flex justify-between items-center border-b py-2">
                    <span>{cat.name}</span>
                    <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-500 hover:underline">Hapus</button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Form tambah produk */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Tambah Produk</h2>
              <form className="grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={handleAddProduct}>
                <input type="text" className="border px-3 py-2 rounded" placeholder="Nama produk" value={prodName} onChange={e => setProdName(e.target.value)} required />
                <input type="text" className="border px-3 py-2 rounded" placeholder="Harga" value={prodPrice} onChange={e => setProdPrice(e.target.value)} required />
                <select className="border px-3 py-2 rounded" value={prodCat} onChange={e => setProdCat(e.target.value)} required>
                  <option value="">Pilih Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700">Tambah</button>
              </form>
            </div>
            {/* List produk */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Daftar Produk</h2>
              <ul>
                {products.map((prod) => (
                  <li key={prod.id} className="flex justify-between items-center border-b py-2">
                    <span>
                      {prod.name} - {prod.price} (
                      {categories.find((c) => c.id === prod.category)?.name || "-"})
                    </span>
                    <button onClick={() => handleDeleteProduct(prod.id)} className="text-red-500 hover:underline">Hapus</button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {menu === 'stats' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Statistik Produk</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="font-bold">Total Add to Cart</div>
                <div className="text-2xl text-primary-600">{totalStats.addToCart}</div>
                <Bar value={totalStats.addToCart} max={maxStat} color="#3b82f6" />
              </div>
              <div>
                <div className="font-bold">Total Dibeli</div>
                <div className="text-2xl text-green-600">{totalStats.buyNow}</div>
                <Bar value={totalStats.buyNow} max={maxStat} color="#22c55e" />
              </div>
              <div>
                <div className="font-bold">Total Dibatalkan</div>
                <div className="text-2xl text-red-600">{totalStats.cancel}</div>
                <Bar value={totalStats.cancel} max={maxStat} color="#ef4444" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">Produk</th>
                    <th className="p-2">Add to Cart</th>
                    <th className="p-2">Dibeli</th>
                    <th className="p-2">Dibatalkan</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod) => (
                    <tr key={prod.id} className="border-b">
                      <td className="p-2">{prod.name}</td>
                      <td className="p-2 text-primary-600">{stats[prod.id]?.addToCart || 0}</td>
                      <td className="p-2 text-green-600">{stats[prod.id]?.buyNow || 0}</td>
                      <td className="p-2 text-red-600">{stats[prod.id]?.cancel || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {menu === 'user' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Daftar User</h2>
            <ul>
              {users.map((user, idx) => (
                <li key={idx} className="border-b py-2">
                  <span>{user.email}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};


export default Dashboard;

