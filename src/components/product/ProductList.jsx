import { useRecoilValue } from "recoil";
import { productAtom } from "../../atoms/productAtoms";
import ProductItem from "./ProductItem";

function ProductList() {
  const products = useRecoilValue(productAtom);
  return (
    <div>
      <h1>제품리스트</h1>
      <div>
        {products.map(item => (
          <ProductItem key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
export default ProductList;
