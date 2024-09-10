<template>
  <div
    class="feedback-card py-xl rounded-s bg-color-blue"
    :class="{ 'card-selected bg-color-blue-light': isSelected }"
    @click="toggleSelection"
  >
    <input
      type="checkbox"
      :checked="isSelected"
      :value="value"
      class="feedback-checkbox"
      @change="toggleSelection"
    />
    <div class="feedback-card-content">
      <span class="feedback-label font-weight-semibold">
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps<{ value: string; label: string; modelValue: string[] }>()
const emit = defineEmits(['update:modelValue'])

const isSelected = computed(() => props.modelValue.includes(props.value))

const toggleSelection = () => {
  let updatedSelection = [...props.modelValue]
  if (isSelected.value) {
    updatedSelection = updatedSelection.filter((option) => option !== props.value)
  } else {
    updatedSelection.push(props.value)
  }
  emit('update:modelValue', updatedSelection)
}
</script>

<style scoped lang="scss">
.feedback-card {
  width: 100%;
  // width: 22rem;
  height: 8rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  // white-space: wrap;
  padding: 1.6rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.feedback-checkbox {
  display: none;
}

.feedback-card-content {
  display: flex;
  align-items: center;
}
.card-selected {
  border-color: white;
  border-color: transparent;
}

.feedback-label {
  color: white;
  font-size: 1.6rem;
}
</style>
