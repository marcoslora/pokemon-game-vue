<template>
  <section
    v-if="isLoading || randomPokemons.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animete-pulse">Cargando pokemon</h3>
  </section>
  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1>Quien es este Pokemon?</h1>
    <div class="h-20">
      <button
        v-if="gameStatus !== GameStatus.Playing"
        class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
        @click="getNextRound(4)"
      >
        Jugar de nuevo?
      </button>
    </div>

    <PokemonPicture
      :pokemon-id="randomPokemons.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />
    <PokemonOptions
      :options="options"
      :block-selection="gameStatus !== GameStatus.Playing"
      :correct-answer="randomPokemons.id"
      @selected-options="checkAnswer"
    />
  </section>
</template>

<script setup lang="ts">
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import PokemonOptions from '@pokemon/components/PokemonOptions.vue';
import { usePokemonGame } from '@pokemon/composables/usePokemonGame';
import { GameStatus } from '../interface/game-status.enum';
const {
  gameStatus,
  isLoading,
  randomPokemons,
  pokemonsOptions: options,
  checkAnswer,
  getNextRound,
} = usePokemonGame();
</script>
