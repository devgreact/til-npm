import { selector } from "recoil";
import { cartAtom } from "../atoms/cartAtoms";
import { productAtom } from "../atoms/productAtoms";

// 총금액 구하기
export const cartTotalSelector = selector({
  key: "cartTotal",
  get: ({ get }) => {
    // 장바구니
    const cart = get(cartAtom);
    // 제품들
    const products = get(productAtom);
    return cart.reduce((total, item) => {
      const product = products.find(pro => item.id === pro.id);
      // 전체 합산이 필요하다
      // 현재까지 금액 + (제품가격 * 장바구니 담긴 개수)
      return total + product.price * item.qty;
    }, 0);
  },
});

// 장바구니 제품총수 구하기
export const cartItemCounterSelector = selector({
  key: "cartItemCount",
  get: ({ get }) => {
    const cart = get(cartAtom);
    return cart.reduce((total, item) => total + item.qty, 0);
  },
});
