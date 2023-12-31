import styles from "./SearchSection.module.scss";
import Container from "@components/elements/Container";
import { ChangeEvent, KeyboardEvent } from "react";
import ArtistInput from "./components/ArtistInput";
import SearchArtistButton from "./components/SearchArtistButton";

interface ISearchSection {
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  search: string;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const SearchSection = ({
  handleSearchChange,
  search,
  onKeyDown,
}: ISearchSection) => {
  return (
    <Container>
      <div className={styles.searchSection}>
        <ArtistInput
          handleSearchChange={handleSearchChange}
          search={search}
          onKeyDown={onKeyDown}
        />
        <SearchArtistButton />
      </div>
    </Container>
  );
};

export default SearchSection;
