import TextField from "@mui/material/TextField";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
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

  const [searchOptions, setSearchOptions] = useState<SearchOption[]>(
    selectedBreed ? [selectedBreed] : [],
  );

  const [value, setValue] = useState<SearchOption | null>(selectedBreed);

  const handleOnChange = (newValue: SearchOption | null) => {
    const params = new URLSearchParams(searchParams);
    if (newValue) {
      params.set("breed_id", newValue.id);
      params.set("breed_name", newValue.label);
    } else {
      params.delete("breed_id");
      params.delete("breed_name");
    }
    setValue(newValue);
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
      value={value}
      onChange={(event, newValue) => {
        handleOnChange(newValue);
      }}
      onInputChange={(_, value: string) => {
        handleInputValueChange(value);
      }}
      id="search-cat-breeds"
      isOptionEqualToValue={(option, value) => option.id === value.id}
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
