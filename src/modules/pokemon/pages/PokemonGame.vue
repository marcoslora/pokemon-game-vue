<template>
  <section v-if="false" class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animete-pulse">Cargando pokemon</h3>
  </section>
  <section class="flex flex-col justify-center items-center items-center w-screen h-screen">
    <h1>Quien es este Pokemon?</h1>
    <PokemonPicture />
    <PokemonOptions />
  </section>
</template>

<script setup lang="ts">
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';
</script>
