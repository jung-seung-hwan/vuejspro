<template>
  <div id="app" class="container">
    <h1>To-do List</h1>

    <!-- 할 일 입력 컴포넌트 -->
    <TodoInput />

    <!-- 필터 및 정렬 -->
    <TodoFilter :filterStatus="filterStatus" :sortByRemainingDays="sortByRemainingDays" @update-filter="updateFilter" />

    <!-- 완료된 일과 완료되지 않은 일의 수 표시 -->
    <TodoSummary />

    <!-- 할 일 목록 컴포넌트 -->
    <TodoList :filterStatus="filterStatus" :sortByRemainingDays="sortByRemainingDays" />

    <!-- 전체 삭제 버튼 -->
    <div class="controls">
      <button class="delete-button" @click="clearAllTodos">전체 삭제</button>
    </div>
  </div>
</template>

<script>
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFilter from './components/TodoFilter.vue';
import TodoSummary from './components/TodoSummary.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    TodoInput,
    TodoList,
    TodoFilter,
    TodoSummary
  },
  data() {
    return {
      filterStatus: 'all',  // 필터 상태 관리
      sortByRemainingDays: false  // 남은 기간순 정렬 여부
    };
  },
  methods: {
    ...mapActions(['clearAllTodos']),
    updateFilter(filterStatus, sortByRemainingDays) {
      this.filterStatus = filterStatus;
      this.sortByRemainingDays = sortByRemainingDays;
    }
  }
};
</script>

<style scoped>
</style>
