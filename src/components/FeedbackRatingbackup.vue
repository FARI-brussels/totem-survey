<template>
  <div class="rating-selector">
    <div class="form-wrapper-ratings">
      <div
        v-for="n in 10"
        :key="n"
        class="rating-item"
        :class="{ selected: modelValue === n }"
        @click="selectRating(n)"
      >
        <div class="circle"></div>
      </div>
    </div>

    <div class="rating-labels font-size-body">
      <span class="font-weight-extrabold">{{ labels.low }}</span>
      <span class="font-weight-extrabold">{{ labels.high }}</span>
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

<style scoped>
.rating-selector {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-wrapper-ratings {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.rating-item {
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
  width: 85%;
  margin-top: 1rem;
  position: absolute;
  bottom: 30rem;
}
</style>
