export default function PokeCard({ poke, onClick }) {
  return (
    <div
      className="wrapper-card"
      onClick={() => {
        onClick(poke);
      }}
    >
      <div className="wrapper-card__img-container">
        <img src={poke.imgUrl} alt={poke.name} />
      </div>
      <h2>{poke.name}</h2>
      <div className="wrapper-card__abilities-container">
        {poke.abilities.map((ability) => `${ability} `)}
      </div>
    </div>
  );
}
