<template>
  <table>
    <thead>
      <tr>
        <th>수행 여부</th>
        <th>할 일</th>
        <th>추가한 날짜</th>
        <th>기간</th>
        <th>남은 기간</th>
        <th>삭제</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(todo, index) in filteredTodos" :key="index">
        <td><input type="checkbox" :checked="todo.done" @change="toggleTodoStatus(index)" /></td>
        <td :class="{ done: todo.done }">{{ todo.text }}</td>
        <td>{{ formatDate(todo.date) }}</td>
        <td>{{ formatDate(todo.startDate) }} ~ {{ formatDate(todo.endDate) }}</td>
        <td>{{ calculateRemainingDays(todo.startDate, todo.endDate) }}일</td>
        <td><button @click="removeTodo(index)">삭제</button></td>
      </tr>
    </tbody>
  </table>
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
    ...mapGetters(['todos']),
    filteredTodos() {
      let todos = this.todos;
      if (this.filterStatus === 'active') {
        todos = todos.filter(todo => !todo.done);
      } else if (this.filterStatus === 'completed') {
        todos = todos.filter(todo => todo.done);
      }
      if (this.sortByRemainingDays) {
        todos = todos.slice().sort((a, b) => this.calculateRemainingDays(a.startDate, a.endDate) - this.calculateRemainingDays(b.startDate, b.endDate));
      }
      return todos;
    }
  },
  methods: {
    ...mapActions(['removeTodo', 'toggleTodoStatus']),
    formatDate(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString();
    },
    calculateRemainingDays(startDate, endDate) {
      if (!endDate) return '';
      const currentDate = new Date(startDate);
      const targetDate = new Date(endDate);
      const timeDiff = targetDate - currentDate;
      return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) || 0;
    }
  }
};
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f4f4f4;
}
</style>
