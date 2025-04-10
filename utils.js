export function formatExhibitions(exhibitions) {
  const formattedExhibiotions = exhibitions.map((exhibition) => {
    if (exhibition.type) {
      return {
        title: exhibition.attributes.summary.title,
        id: exhibition.attributes["@admin"].uid,
        description:
          exhibition.attributes.description[
            exhibition.attributes.description.length - 1
          ].value,
        img: exhibition.attributes.multimedia[0]["@processed"].large_thumbnail
          .location,
      };
    } else {
      return {
        title: exhibition.title,
        id: exhibition.objectID,
        artist: exhibition.artistDisplayName,
        img: exhibition.primaryImage,
      };
    }
  });
  return formattedExhibiotions;
}
