import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interface';
import { pokemonApi } from '../api/pokemonApi';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonsOptions = ref<Pokemon[]>([]);
  const randomPokemons = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonsOptions.value.length);
    return pokemonsOptions.value[randomIndex];
  });

  const isLoading = computed(() => pokemons.value.length === 0);

  const getPokemon = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');
    const pokemonArray = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts.at(-2) ?? 0;
      return {
        name: pokemon.name,
        id: +id,
      };
    });
    return pokemonArray.sort(() => Math.random() - 0.5);
  };
  const getNextOptions = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonsOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  };
  onMounted(async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    pokemons.value = await getPokemon();
    getNextOptions();

    console.log(pokemonsOptions.value);
  });
  return {
    gameStatus,
    isLoading,
    pokemonsOptions,
    randomPokemons,
    //Methods
    getNextOptions,
  };
};
