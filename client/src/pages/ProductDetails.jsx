import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../api/product";
import { requestBuy, requestRent } from "../api/request";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.title} />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>₹{product.price}</p>

      {product.status === "AVAILABLE" && (
        <>
          {product.type === "buy" ? (
            <button onClick={() => requestBuy(product._id)}>
              Request to Buy
            </button>
          ) : (
            <button onClick={() => requestRent(product._id)}>
              Request to Rent
            </button>
          )}
        </>
      )}

      {product.status === "IN_NEGOTIATION" && (
        <p>Currently under negotiation</p>
      )}
    </div>
  );
};

export default ProductDetails;
