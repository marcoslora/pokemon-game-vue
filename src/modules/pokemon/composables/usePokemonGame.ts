import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interface';
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';

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
      console.log(pokemonArray);
      return {
        name: pokemon.name,
        id: +id,
      };
    });
    return pokemonArray.sort(() => Math.random() - 0.5);
  };
  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonsOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  };
  const checkAnswer = (id: number) => {
    if (randomPokemons.value.id === id) {
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });
      gameStatus.value = GameStatus.Won;
    } else {
      gameStatus.value = GameStatus.Lost;
    }
  };
  onMounted(async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    pokemons.value = await getPokemon();
    getNextRound();

    console.log(pokemonsOptions.value);
  });
  return {
    gameStatus,
    isLoading,
    pokemonsOptions,
    randomPokemons,
    //Methods
    getNextRound,
    checkAnswer,
  };
};
