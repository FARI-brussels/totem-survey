<template>
  <div class="rating-selector">
    <div
      class="form-wrapper-ratings"
      :class="{ 'full-rating': modelValue === 5 }"
      :style="{
        '--selected-rating': modelValue || 0
      }"
    >
      <div
        v-for="n in 5"
        :key="n"
        class="rating-item"
        :class="{ selected: modelValue === n }"
        @click="selectRating(n)"
      >
        <div class="circle"></div>
      </div>
    </div>

    <div class="rating-labels">
      <span class="font-weight-semibold">{{ labels.low }}</span>
      <span class="font-weight-semibold">{{ labels.high }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  modelValue: number | null
  labels: {
    low: string
    high: string
  }
}>()
const emit = defineEmits(['update:modelValue'])

const selectRating = (rating: number) => emit('update:modelValue', rating)
</script>

<style scoped lang="scss">
.rating-selector {
  width: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.form-wrapper-ratings {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  position: relative;
  width: 100%;
  border-radius: 1rem;
  padding: 1.6rem 3.4rem;
  border-radius: 26rem;
}

.form-wrapper-ratings::after {
  content: '';
  border-radius: 26rem;
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: calc(var(--selected-rating, 0) * 20%);
  background-color: #4393de;
  // background-color: rgba(67, 147, 222, 1);

  opacity: calc(var(--selected-rating, 0) * 0.2);
  z-index: 0;
  transition: all 0.3s ease-in-out;
}

.full-rating::after {
  background: linear-gradient(90deg, rgba(67, 147, 222, 1), rgba(67, 222, 180, 1));
  opacity: 1;
}

.rating-item {
  z-index: 1;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid white;
  background-color: transparent;
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

.rating-item.selected .circle {
  background-color: white;
  border-color: white;
}

.rating-labels {
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin-top: 1rem;
  position: absolute;
  top: 8rem;
  font-size: 1.4rem;
}
</style>
