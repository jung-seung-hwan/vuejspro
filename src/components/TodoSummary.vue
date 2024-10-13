<template>
  <div class="summary">
    <p>완료되지 않은 일: <strong>{{ activeTodosCount }}개</strong></p>
    <p>완료된 일: <strong>{{ completedTodosCount }}개</strong></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['activeTodosCount', 'completedTodosCount'])
  }
};
</script>

<style scoped>
</style>
