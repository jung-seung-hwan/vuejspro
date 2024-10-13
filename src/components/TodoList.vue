<template>
  <ul>
    <li v-for="(todo, index) in filteredTodos" :key="index">
      <input type="checkbox" :checked="todo.done" @change="toggleTodoStatus(index)" />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <span> - {{ formatDate(todo.date) }}</span> <!-- 추가된 기본 날짜 -->
      <span> (기간: {{ formatDate(todo.startDate) }} ~ {{ formatDate(todo.endDate) }})</span> <!-- 시작 날짜와 종료 날짜 표시 -->
      <span> (남은 기간: {{ calculateRemainingDays(todo.startDate, todo.endDate) }}일)</span> <!-- 남은 기간 표시 -->
      <button @click="removeTodo(index)">삭제</button>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    filterStatus: {
      type: String,
      required: true
    },
    sortByRemainingDays: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['todos']),  // Vuex에서 todos 가져오기

    // 필터링된 할 일 목록
    filteredTodos() {
      let todos = this.todos;
      
      // 필터링: 미완료, 완료, 전체
      if (this.filterStatus === 'active') {
        todos = todos.filter(todo => !todo.done);
      } else if (this.filterStatus === 'completed') {
        todos = todos.filter(todo => todo.done);
      }

      // 정렬: 남은 기간순 정렬 (endDate 기준)
      if (this.sortByRemainingDays) {
        todos = todos.slice().sort((a, b) => this.calculateRemainingDays(a.startDate, a.endDate) - this.calculateRemainingDays(b.startDate, b.endDate));
      }

      return todos;
    }
  },
  methods: {
    ...mapActions(['removeTodo', 'toggleTodoStatus']),  // Vuex 액션 바인딩

    formatDate(date) {
      if (!date) return '';  // 날짜가 없을 때 빈 값 처리
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },

    calculateRemainingDays(startDate, endDate) {
      if (!endDate) return '';  // 종료 날짜가 없을 경우 빈 값 반환
      const currentDate = new Date(startDate);
      const targetDate = new Date(endDate);
      const timeDiff = targetDate - currentDate;  // 두 날짜 간의 차이 계산
      const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));  // 남은 일 수 계산
      return daysRemaining > 0 ? daysRemaining : 0;  // 남은 일 수가 0 이하이면 0으로 반환
    }
  }
};
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
