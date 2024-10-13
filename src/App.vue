<template>
  <div id="app">
    <h1>To-do List</h1>
    <!-- 할 일 입력 컴포넌트 -->
    <TodoInput />

    <!-- 필터 버튼 -->
    <div>
      <button @click="filterStatus = 'all'">전체</button>
      <button @click="filterStatus = 'active'">미완료</button>
      <button @click="filterStatus = 'completed'">완료</button>
      <button @click="sortByRemainingDays = !sortByRemainingDays">
        {{ sortByRemainingDays ? '남은 기간순 해제' : '남은 기간순 정렬' }}
      </button> <!-- 남은 기간순 정렬 버튼 -->
    </div>

    <!-- 할 일 목록 컴포넌트 -->
    <TodoList :filterStatus="filterStatus" :sortByRemainingDays="sortByRemainingDays" />
  </div>
</template>

<script>
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: {
    TodoInput,
    TodoList
  },
  data() {
    return {
      filterStatus: 'all',  // 필터 상태 관리
      sortByRemainingDays: false  // 남은 기간순 정렬 여부
    };
  }
};
</script>

<style scoped>
/* 스타일은 필요에 따라 여기에 추가하세요 */
</style>
