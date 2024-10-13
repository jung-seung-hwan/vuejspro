<template>
  <div>
    <!-- 할 일 입력 필드 -->
    <input v-model="newTodo" @keyup.enter="submitTodo" placeholder="할 일을 입력하세요" />
    
    <!-- 시작 날짜 입력 필드 -->
    <input type="date" v-model="startDate" />

    <!-- 종료 날짜 입력 필드 -->
    <input type="date" v-model="endDate" />

    <!-- 추가 버튼 -->
    <button @click="submitTodo">추가</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      newTodo: '',  // 할 일 텍스트
      startDate: '',  // 시작 날짜
      endDate: ''  // 종료 날짜
    };
  },
  methods: {
    ...mapActions(['addTodo']),  // Vuex 액션 바인딩

    submitTodo() {
      if (this.newTodo.trim() && this.startDate && this.endDate) {
        const newTodoItem = {
          text: this.newTodo.trim(),
          done: false,
          date: new Date(),  // 현재 날짜
          startDate: this.startDate,  // 시작 날짜
          endDate: this.endDate  // 종료 날짜
        };
        this.addTodo(newTodoItem);  // Vuex 액션으로 할 일 추가
        this.newTodo = '';  // 입력 필드 초기화
        this.startDate = '';  // 시작 날짜 초기화
        this.endDate = '';  // 종료 날짜 초기화
      }
    }
  }
};
</script>

<style scoped>
/* 스타일은 필요에 따라 여기에 추가하세요 */
</style>
