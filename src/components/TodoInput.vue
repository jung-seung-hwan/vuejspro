<template>
  <div>
    <input v-model="newTodo" @keyup.enter="submitTodo" placeholder="할 일을 입력하세요" />
    <input type="date" v-model="startDate" />
    <input type="date" v-model="endDate" />
    <button @click="submitTodo">추가</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      newTodo: '',
      startDate: '',
      endDate: ''
    };
  },
  methods: {
    ...mapActions(['addTodo']),
    submitTodo() {
      if (this.newTodo.trim() && this.startDate && this.endDate) {
        const newTodoItem = {
          text: this.newTodo.trim(),
          done: false,
          date: new Date(),
          startDate: this.startDate,
          endDate: this.endDate
        };
        this.addTodo(newTodoItem);
        this.newTodo = '';
        this.startDate = '';
        this.endDate = '';
      }
    }
  }
};
</script>

<style scoped>
</style>
