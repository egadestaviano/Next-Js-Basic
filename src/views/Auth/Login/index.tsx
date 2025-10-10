import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "@/pages/_app";

const LoginViews = () => {
  const { push } = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notif, setNotif] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setNotif("");

    try {
      const success = await login(email, password);
      
      if (success) {
        setNotif("Login berhasil! Redirect ke dashboard...");
        setTimeout(() => {
          setNotif("");
          push("/dashboard");
        }, 1200);
      } else {
        setNotif("Email atau password salah!");
        setTimeout(() => setNotif(""), 3000);
      }
    } catch (error) {
      setNotif("Terjadi kesalahan saat login. Silakan coba lagi.");
      setTimeout(() => setNotif(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96 max-w-sm mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">S</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">Selamat Datang</h1>
          <p className="text-gray-600">Masuk ke akun ShopHub Anda</p>
        </div>

        {/* Notification */}
        {notif && (
          <div className={`mb-6 p-4 rounded-lg text-center ${
            notif.includes('berhasil') 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {notif}
          </div>
        )}

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="Masukkan password Anda"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
            } text-white`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Memproses...
              </div>
            ) : (
              'Masuk'
            )}
          </button>
        </form>

        {/* Demo Account Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center mb-2">
            <strong>Demo Account:</strong>
          </p>
          <p className="text-xs text-gray-500 text-center">
            Email: admin@gmail.com<br />
            Password: admin123
          </p>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <Link 
            href="/auth/register" 
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Belum punya akun? Daftar di sini
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link 
            href="/" 
            className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginViews;
