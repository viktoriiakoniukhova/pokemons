import { useEffect, useState } from "react";
import PokeCard from "../components/PokeCard";
import Loader from "../components/Loader";
import { v4 } from "uuid";
import PokeInfo from "../components/PokeInfo";

export default function Homepage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);

  const [selectedPoke, setSelectedPoke] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (!cards.length) fetchPokes("https://pokeapi.co/api/v2/pokemon?limit=12");
  }, []);

  const handleLoadMoreClick = () => {
    if (nextPage) {
      fetchPokes(nextPage);
    }
  };

  const handleCardClick = (poke) => {
    fetchPokeDetails(poke);
    setShowInfo(!(selectedPoke && selectedPoke.name === poke.name && showInfo));
  };

  async function fetchPokes(url) {
    const response = await fetch(url);
    const data = await response.json();
    const pokesArray = data.results;

    const pokesData = await Promise.all(
      pokesArray.map(async (poke) => {
        const response = await fetch(poke.url);
        const data = await response.json();
        const abilities = data.types.map((type) => type.type.name);
        const imgUrl = data.sprites.front_default;

        return {
          url: poke.url,
          name: poke.name,
          abilities,
          imgUrl,
        };
      })
    );

    setCards((prevData) => [...prevData, ...pokesData]);
    setNextPage(data.next);
    setLoading(false);
  }

  async function fetchPokeDetails(poke) {
    const response = await fetch(poke.url);
    const data = await response.json();

    const pokeDetails = {
      name: poke.name,
      imgUrl: poke.imgUrl,
      id: data.id,
      type: data.types.map((type) => type.type.name).join(", "),
      attack: data.stats.find((stat) => stat.stat.name === "attack").base_stat,
      defense: data.stats.find((stat) => stat.stat.name === "defense")
        .base_stat,
      hp: data.stats.find((stat) => stat.stat.name === "hp").base_stat,
      spAttack: data.stats.find((stat) => stat.stat.name === "special-attack")
        .base_stat,
      spDefense: data.stats.find((stat) => stat.stat.name === "special-defense")
        .base_stat,
      speed: data.stats.find((stat) => stat.stat.name === "speed").base_stat,
      weight: data.weight,
      totalMoves: data.moves.length,
    };

    setSelectedPoke(pokeDetails);
  }

  return (
    <div className="wrapper">
      <header>Pokedex</header>
      <main>
        <div className="container-cards">
          <div className="container-cards__list">
            {loading ? (
              <Loader />
            ) : (
              cards.map((card) => {
                return (
                  <PokeCard key={v4()} poke={card} onClick={handleCardClick} />
                );
              })
            )}
          </div>

          <button onClick={handleLoadMoreClick} disabled={!nextPage}>
            Load More
          </button>
        </div>
        <div className="container-card">
          {showInfo && <PokeInfo {...selectedPoke} />}
        </div>
      </main>
    </div>
  );
}
