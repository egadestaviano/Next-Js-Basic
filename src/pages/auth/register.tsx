import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/pages/_app";

const RegisterPage = () => {
  const { push } = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [notif, setNotif] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama harus diisi";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.password) {
      newErrors.password = "Password harus diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password tidak cocok";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setNotif("");

    try {
      const success = await register(formData.email, formData.password, formData.name);
      
      if (success) {
        setNotif("Registrasi berhasil! Silakan login.");
        setTimeout(() => {
          setNotif("");
          push("/auth/login");
        }, 2000);
      } else {
        setNotif("Email sudah terdaftar! Silakan gunakan email lain.");
        setTimeout(() => setNotif(""), 3000);
      }
    } catch (error) {
      setNotif("Terjadi kesalahan saat registrasi. Silakan coba lagi.");
      setTimeout(() => setNotif(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96 max-w-sm mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">S</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">Daftar Akun</h1>
          <p className="text-gray-600">Buat akun ShopHub baru</p>
        </div>

        {notif && (
          <div className={`mb-6 p-4 rounded-lg text-center ${
            notif.includes('berhasil') 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {notif}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="name"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'
              }`}
              placeholder="Masukkan nama lengkap Anda"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'
              }`}
              placeholder="Masukkan email Anda"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                errors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'
              }`}
              placeholder="Minimal 6 karakter"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                errors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'
              }`}
              placeholder="Ulangi password Anda"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
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
              'Daftar Sekarang'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link 
            href="/auth/login" 
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Sudah punya akun? Login di sini
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

export default RegisterPage;
