<template>
  <section class="mt-5 flex flex-col">
    <button
      v-for="{ name, id } in options"
      :key="id"
      :class="[
        'capitalize disabled:shadow-none disabled:bg-gray-100',
        {
          correct: id === correctAnswer && blockSelection,
          incorrect: id !== correctAnswer && blockSelection,
        },
      ]"
      @click="$emit('selectedOptions', id)"
      :disabled="blockSelection"
    >
      {{ name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interface';

interface Props {
  options: Pokemon[];
  blockSelection: boolean;
  correctAnswer: number;
}
defineProps<Props>();
defineEmits<{ selectedOptions: [id: number] }>();
</script>

<style scoped>
.correct {
  @apply bg-blue-500 text-white hover:bg-blue-500;
}
.incorrect {
  @apply bg-red-100 opacity-70 hover:bg-red-100;
}
button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}
</style>
