import "./styles/exhibitionCard.css";

export function ExhibitionCard({ exhibition }) {
  return (
    <li>
      <h3>{exhibition.title}</h3>
      <img
        src={exhibition.img || null}
        width={100}
        height={100}
        alt={`image showcasing the exhibition ${exhibition.title} `}
      />
      <p>
        {exhibition.artist && exhibition.artist !== "Unknown"
          ? `By ${exhibition.artist}`
          : null}
      </p>
    </li>
  );
}
