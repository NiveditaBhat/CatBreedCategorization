import TextField from "@mui/material/TextField";
import { useDebouncedCallback } from "use-debounce";
import { ReactNode, SyntheticEvent, useState } from "react";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { CatBreedItem } from "@/app/lib/catBreedTypes";
import reFetchCatImages from "../actions/reFetchCatImages";
import { searchCatBreedOptions } from "@/app/actions/searchCatBreeds";
import { AutocompleteInputChangeReason } from "@mui/material";

const DEBOUNCE_INTERVAL = 200;

type SearchOption = {
  label: string;
  id: string;
};

type SearchCatBreedsProps = {
  selectedBreed: { label: string; id: string } | null;
};

export default function SearchCatBreeds({
  selectedBreed,
}: SearchCatBreedsProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // const [selectedValue, setSelectedValue] = useState<{
  //   label: string;
  //   id: string;
  // } | null>(selectedBreed);
  // const [inputValue, setInputValue] = useState(defaultInputValue);

  // const handleSearch = useDebouncedCallback((value: string) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (value) {
  //     params.set("query", value);
  //   } else {
  //     params.delete("query");
  //   }
  //   if (selectedValue) {
  //     params.set("breed", selectedValue.id);
  //   } else {
  //     params.delete("breed");
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }, DEBOUNCE_INTERVAL);

  const [searchOptions, setSearchOptions] = useState<SearchOption[]>([]);

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("breed", value);
    } else {
      params.delete("breed");
    }
    // if (value) {
    //   params.set("query", value);
    // } else {
    //   params.delete("query");
    // }
    // if (selectedValue) {
    //   params.set("breed", selectedValue.id);
    // } else {
    //   params.delete("breed");
    // }
    replace(`${pathname}?${params.toString()}`);
  }, DEBOUNCE_INTERVAL);

  const handleInputValueChange = async (
    event: SyntheticEvent<Element, Event>,
    inputValue: string,
    reason: AutocompleteInputChangeReason,
  ) => {
    const catBreedSearchResult = await searchCatBreedOptions(inputValue);
    const catBreedSearchOptions =
      catBreedSearchResult?.map(({ name, id }) => ({
        id,
        label: name,
      })) ?? [];
    setSearchOptions(catBreedSearchOptions);
    // const selectedBreed =
    //   catBreedSearchOptions?.find(({ id }) => id === breedId) ?? null;
  };

  return (
    <Autocomplete
      //  value={selectedValue}
      onChange={(event, newValue) => {
        //   setSelectedValue(newValue);
        handleSearch(newValue?.id ?? "");
        // console.log("id", newValue.id);
        // const params = new URLSearchParams(searchParams);
        // params.set("breed", newValue.id);
        // replace(`${pathname}?${params.toString()}`);
      }}
      // inputValue={defaultInputValue}
      onInputChange={handleInputValueChange}
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
