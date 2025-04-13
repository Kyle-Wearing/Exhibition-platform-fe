import "./styles/exhibitionCard.css";

export function ExhibitionCard({ exhibition }) {
  return (
    <li>
      <h3>{exhibition.title}</h3>
      <img
        src={
          exhibition.img ||
          "https://static.vecteezy.com/system/resources/previews/037/359/674/non_2x/loading-error-filled-outline-icon-style-illustration-eps-10-file-vector.jpg"
        }
        width={100}
        height={100}
        alt={
          exhibition.img
            ? `image showcasing the exhibition ${exhibition.title}`
            : "failed to load image"
        }
      />
      <p>
        {exhibition.artist && exhibition.artist !== "Unknown"
          ? `By ${exhibition.artist}`
          : null}
      </p>
    </li>
  );
}
