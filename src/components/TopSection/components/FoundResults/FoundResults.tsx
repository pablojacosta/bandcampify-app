import useGetArtistAlbums from "@hooks/useGetArtistAlbums";
import styles from "./FoundResults.module.scss";
import { IFoundResults } from "interfaces/foundResult";
import ListedElement from "@components/shared/ListedElement";
import {
  EListType,
  EListedElementTypes,
  ESearchResultTypes,
} from "@constants/enums";
import { useEffect, useState } from "react";
import { IResult } from "interfaces/result";
import ResultList from "./components/ResultList";
import { Link } from "react-router-dom";
import { ALBUMS } from "@constants/routes";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderSettings } from "@utils/helpers/slider/sliderSettings";
import ArtistResults from "./components/ArtistResults";
import useShowSlider from "@hooks/useShowSlider";
import { useSelectedAlbumStore } from "@store/useSelectedAlbumStore";

const FoundResults = ({ foundResults }: IFoundResults) => {
  const { getAlbums } = useGetArtistAlbums();
  const { showPlayer } = useSelectedAlbumStore();
  const isError = typeof foundResults === "string";
  const [artists, setArtists] = useState<IResult[]>([]);
  const [albums, setAlbums] = useState<IResult[]>([]);
  const [tracks, setTracks] = useState<IResult[]>([]);

  useEffect(() => {
    if (isError) {
      return;
    }
    setArtists(
      foundResults.filter((result) => result.type === ESearchResultTypes.ARTIST)
    );
    setAlbums(
      foundResults.filter((result) => result.type === ESearchResultTypes.ALBUM)
    );
    setTracks(
      foundResults.filter((result) => result.type === ESearchResultTypes.TRACK)
    );
  }, [foundResults, isError]);

  const hasArtists = artists.length > 0;
  const hasAlbums = albums.length > 0;
  const hasTracks = tracks.length > 0;
  const { showSlider } = useShowSlider(artists.length);

  return (
    <div
      className={`${styles.foundResults} ${
        showPlayer ? styles.showPlayer : ""
      }`}
    >
      {!isError ? (
        <>
          {hasArtists && (
            <>
              <h2>Artists</h2>
              {artists.length > 7 || showSlider ? (
                <div className={styles.slider}>
                  <Slider {...sliderSettings(artists.length)}>
                    {artists.map((artist, index) => (
                      <Link
                        to={ALBUMS}
                        key={`${artist.url}_${index}`}
                        className={styles.link}
                      >
                        <ListedElement
                          key={`${artist.name}_${artist.genre}`}
                          onClick={() => getAlbums(artist.url, artist.imageUrl)}
                          image={artist.imageUrl}
                          name={artist.name}
                          type={EListedElementTypes.ARTIST}
                          isFoundResults
                        />
                      </Link>
                    ))}
                  </Slider>
                </div>
              ) : (
                <ul>
                  <ArtistResults artists={artists} />
                </ul>
              )}
            </>
          )}

          {hasAlbums && <ResultList items={albums} type={EListType.ALBUMS} />}
          {hasTracks && <ResultList items={tracks} type={EListType.SONGS} />}
        </>
      ) : (
        <h3>{foundResults}</h3>
      )}
      {showPlayer && <div className={styles.playerSpace} />}
    </div>
  );
};

export default FoundResults;
