/* eslint-disable react/prop-types */

import { useRecoilState } from "recoil";
import { cartAtom } from "../../atoms/cartAtoms";

function ProductItem({ product }) {
  const [cart, setCart] = useRecoilState(cartAtom);
  // 장바구니 담기
  const addCart = id => {
    // id 를 전달받으면 cart 에  제품 id 와 qty:개수 업데이트
    setCart(currentCart => {
      // 현재 카트에 이미 동일한 id 제품 이 있는 지 검사하자.
      const existID = currentCart.find(item => item.id === id);
      // 만약 장바구니에 제품이 담겼다면 개수 증가
      if (existID) {
        // 개수 증가
        return currentCart.map(item =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      // 새로운 ID 추가 및 개수는 1 로 셋팅
      return [...currentCart, { id, qty: 1 }];
    });
  };
  return (
    <div style={{ display: "flex", border: "2px solid #000" }}>
      <h3>{product.name}</h3>
      <p>{product.price}원</p>
      <button onClick={() => addCart(product.id)}>장바구니 담기</button>
    </div>
  );
}
export default ProductItem;
