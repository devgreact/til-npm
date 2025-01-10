// Recoil 에서 관리하는 데이터에서

import { selector } from "recoil";
import { todoListAtom } from "../atoms/TodoListAtom";

// 완료된 항목만 필터링 해서 출력해 보기
export const completedTodosSelector = selector({
  key: "completedTodosSelector",
  get: ({ get }) => {
    const todos = get(todoListAtom);
    return todos.filter(item => item.completed);
  },
});
