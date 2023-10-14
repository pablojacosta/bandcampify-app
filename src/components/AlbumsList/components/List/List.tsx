import { IList } from "interfaces/list";
import styles from "./List.module.scss";
import { IAlbum } from "interfaces/album";
import { EListType, EListedElementTypes } from "@constants/enums";
import ListedElement from "@components/shared/ListedElement";
import { useSelectedAlbumStore } from "@store/useSelectedAlbumStore";

const List = ({ items, type }: IList) => {
  const listedElementType =
    type === EListType.ALBUMS
      ? EListedElementTypes.ALBUM
      : EListedElementTypes.TRACK;
  const {
    setTracks,
    setShowTracks,
    setAlbumArtist,
    setAlbumName,
    setAlbumUrl,
    setHideAlbums,
    setAlbumImage,
  } = useSelectedAlbumStore();

  return (
    <div className={styles.list}>
      <h2>{type}</h2>
      <ul>
        {items.map((item: IAlbum) => {
          const handleAlbumOnClick = () => {
            setTracks(item.tracks);
            setShowTracks(true);
            setAlbumArtist(item.artist.name);
            setAlbumName(item.name);
            setAlbumUrl(item.url);
            setHideAlbums(true);
            setAlbumImage(item.imageUrl);
          };

          return (
            <ListedElement
              key={`${item.name}`}
              onClick={() => handleAlbumOnClick()}
              image={item.imageUrl}
              name={item.name}
              artist={item.artist.name}
              type={listedElementType}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default List;