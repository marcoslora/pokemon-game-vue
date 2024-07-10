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
    <h3>{{ randomPokemons }}</h3>
    <PokemonPicture
      :pokemon-id="randomPokemons.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />
    <PokemonOptions />
  </section>
</template>

<script setup lang="ts">
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { GameStatus } from '@/modules/pokemon/interface/game-status.enum.ts';
const { gameStatus, isLoading, randomPokemons } = usePokemonGame();
</script>
