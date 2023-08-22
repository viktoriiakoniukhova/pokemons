import React from "react";
import { v4 } from "uuid";

export default function PokeInfo({
  imgUrl,
  name,
  id,
  type,
  attack,
  defense,
  hp,
  spAttack,
  spDefense,
  speed,
  weight,
  totalMoves,
}) {
  const formattedId = `${id}`.padStart(3, "0");
  const stats = {
    type,
    attack,
    defense,
    hp,
    spAttack,
    spDefense,
    speed,
    weight,
    totalMoves,
  };
  return (
    <div className="wrapper-info">
      <div className="wrapper-info__img-container">
        <img src={imgUrl} alt={name} />
      </div>
      <div className="wrapper-info__content">
        <h2>
          {name} #{formattedId}
        </h2>
        <table>
          <tbody>
            {Object.entries(stats).map(([key, value]) => {
              return (
                <tr key={v4()}>
                  <td>
                    <span>{key}</span>
                  </td>
                  <td>
                    <span>{value}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
