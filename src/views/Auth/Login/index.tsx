import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Login.module.scss";

const LoginViews = () => {
  const { push } = useRouter();

  const handleLogin = () => {
    // After successful login logic, navigate to the /product page
    push("/product");
  };

  return (
    <div className={styles.navbar}>
      <h1 className="text-xl text-black">Login</h1>
      
      {/* Login Button with accessible aria-label */}
      <button 
        onClick={handleLogin} 
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
        aria-label="Login to your account"
      >
        Login
      </button>
      
      {/* Link to the Register page */}
      <Link href="/auth/register">
        <a className="text-2xl text-yellow-400 mt-4 block">
          Register
        </a>
      </Link>
    </div>
  );
};

export default LoginViews;
