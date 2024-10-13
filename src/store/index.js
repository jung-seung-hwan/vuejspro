import { createStore } from 'vuex';

export default createStore({
  state: {
    todos: []
  },
  mutations: {
    addTodo(state, newTodo) {
      // 새로운 할 일 객체에 startDate와 endDate 추가
      if (newTodo.text.trim()) {
        state.todos.push({
          text: newTodo.text.trim(),
          done: false,
          date: newTodo.date,
          startDate: newTodo.startDate,  // 시작 날짜
          endDate: newTodo.endDate  // 종료 날짜
        });
      }
    },
    removeTodo(state, index) {
      state.todos.splice(index, 1);
    },
    toggleTodoStatus(state, index) {
      state.todos[index].done = !state.todos[index].done;
    }
  },
  actions: {
    addTodo({ commit }, newTodo) {
      commit('addTodo', newTodo);  // 새로운 할 일 객체를 넘겨줌
    },
    removeTodo({ commit }, index) {
      commit('removeTodo', index);
    },
    toggleTodoStatus({ commit }, index) {
      commit('toggleTodoStatus', index);
    }
  },
  getters: {
    todos: (state) => state.todos
  }
});
