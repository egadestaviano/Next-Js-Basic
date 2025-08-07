import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginViews = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notif, setNotif] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Ambil data user dari localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("isLogin", "true");
      setNotif("Login berhasil! Redirect ke dashboard...");
      setTimeout(() => {
        setNotif("");
        push("/dashboard");
      }, 1200);
    } else {
      setNotif("Email atau password salah!");
      setTimeout(() => setNotif(""), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        {notif && <div className={`mb-4 p-3 ${notif.includes('berhasil') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded text-center`}>{notif}</div>}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/auth/register" className="text-blue-500 hover:text-blue-700">
            Belum punya akun? Register di sini
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginViews;
