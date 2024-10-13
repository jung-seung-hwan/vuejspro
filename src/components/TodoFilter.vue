<template>
  <div class="controls">
    <label for="filter" class="filter-label">필터:</label>
    <select v-model="localFilterStatus" id="filter" class="filter-select">
      <option value="all">전체</option>
      <option value="active">미완료</option>
      <option value="completed">완료</option>
    </select>
    
    <button class="sort-button" @click="toggleSort">
      {{ sortByRemainingDays ? '남은 기간순 해제' : '남은 기간순 정렬' }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    filterStatus: {
      type: String,
      required: true
    },
    sortByRemainingDays: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      localFilterStatus: this.filterStatus,
      localSortByRemainingDays: this.sortByRemainingDays
    };
  },
  watch: {
    localFilterStatus(newVal) {
      this.$emit('update-filter', newVal, this.localSortByRemainingDays);
    },
    localSortByRemainingDays(newVal) {
      this.$emit('update-filter', this.localFilterStatus, newVal);
    }
  },
  methods: {
    toggleSort() {
      this.localSortByRemainingDays = !this.localSortByRemainingDays;
    }
  }
};
</script>

<style scoped>
</style>
