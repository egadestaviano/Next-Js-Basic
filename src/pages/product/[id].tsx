import { useRouter } from "next/router";

const DetailProduct = () => {
  const { query } = useRouter();

  return (
    <div>
      <p>Detail Product</p>
      <p>Product: {query.id ? query.id : "Loading..."}</p>
    </div>
  );
};

export default DetailProduct;
