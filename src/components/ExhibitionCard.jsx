import "./styles/exhibitionCard.css";

export function ExhibitionCard({ exhibition }) {
  return (
    <li>
      <h3>{exhibition.title}</h3>
      <img src={exhibition.img} width={100} height={100} />
      <p>{exhibition.artist}</p>
    </li>
  );
}
