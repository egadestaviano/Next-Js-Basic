import { useRouter } from "next/router";

const ShopPage = () => {
    const {query} = useRouter();
    console.log(query);
    console.log(query.slug[1]);
    
    return (
        <div>
            <p>Detail Product</p>
        </div>
    )
}

export default ShopPage;