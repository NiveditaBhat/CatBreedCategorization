import TextField from "@mui/material/TextField";
import { useDebouncedCallback } from "use-debounce";
import { SyntheticEvent, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { searchCatBreedOptions } from "../actions/searchCatBreeds";

const DEBOUNCE_INTERVAL = 200;

type SearchOption = {
  label: string;
  id: string;
};

type SearchCatBreedsProps = {
  selectedBreed: SearchOption | null;
};

export default function SearchCatBreeds({
  selectedBreed,
}: SearchCatBreedsProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  console.log("pathname", pathname);

  const [searchOptions, setSearchOptions] = useState<SearchOption[]>(
    selectedBreed ? [selectedBreed] : [],
  );
  //const [value, setValue] = useState<SearchOption | null>(selectedBreed);

  const handleOnChange = async (value: SearchOption | null) => {
    //  setValue(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("breed_id", value.id);
      params.set("breed_name", value.label);
    } else {
      params.delete("breed_id");
      params.delete("breed_name");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleInputValueChange = useDebouncedCallback(
    async (inputValue: string) => {
      const catBreedSearchResult = await searchCatBreedOptions(inputValue);

      const catBreedSearchOptions =
        catBreedSearchResult?.map(({ name, id }) => ({
          id,
          label: name,
        })) ?? [];
      setSearchOptions(catBreedSearchOptions);
    },
    DEBOUNCE_INTERVAL,
  );

  return (
    <Autocomplete
      defaultValue={selectedBreed}
      onChange={(event, newValue) => {
        handleOnChange(newValue);
      }}
      onInputChange={(
        event: React.SyntheticEvent,
        value: string,
        reason: string,
      ) => {
        handleInputValueChange(value);
      }}
      id="search-cat-breeds"
      getOptionLabel={(option) => option.label}
      options={searchOptions}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Choose a breed"
          label="Choose a breed"
        />
      )}
      noOptionsText="No breed found"
      loadingText="Cat Breed list loading"
    />
  );
}
