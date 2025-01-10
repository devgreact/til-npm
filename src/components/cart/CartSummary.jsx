import { useRecoilValue } from "recoil";
import {
  cartItemCounterSelector,
  cartTotalSelector,
} from "../../selectors/cartSelectors";

function CartSummary() {
  const total = useRecoilValue(cartTotalSelector);
  const count = useRecoilValue(cartItemCounterSelector);
  return (
    <div>
      <p>총 상품 수: {count}</p>
      <p>총 금액 : {total}원</p>
    </div>
  );
}
export default CartSummary;
