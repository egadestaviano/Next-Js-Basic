import Navbar from "@/components/layouts/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [isLogin, setisLogin] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    if (!isLogin) {
      push("/auth/login");
    }
  }, []);
  return (
    <div>
      <h1>The product</h1>
    </div>
  );
};

export default ProductPage;
