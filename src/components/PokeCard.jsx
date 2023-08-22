export default function PokeCard({
  poke,
  onClick,
  selectedPoke,
  showInfo,
  pokeTypesColors,
}) {
  return (
    <div
      className={`wrapper-card ${
        selectedPoke && selectedPoke.name === poke.name && showInfo
          ? "selected"
          : ""
      }`}
      onClick={() => {
        onClick(poke);
      }}
    >
      <div className="wrapper-card__img-container">
        <img src={poke.imgUrl} alt={poke.name} />
      </div>
      <h2>{poke.name}</h2>
      <div className="wrapper-card__abilities-container">
        {poke.abilities.map((ability) => {
          return (
            <span style={{ backgroundColor: `${pokeTypesColors[ability]}` }}>
              {ability}{" "}
            </span>
          );
        })}
      </div>
    </div>
  );
}
