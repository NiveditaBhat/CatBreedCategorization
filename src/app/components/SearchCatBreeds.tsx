import TextField from "@mui/material/TextField";
import { useDebouncedCallback } from "use-debounce";
import { ReactNode, useState } from "react";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { CatBreedItem } from "@/app/lib/catBreedTypes";

const DEBOUNCE_INTERVAL = 300;

type SearchCatBreedsProps = {
  selectedBreed: string;
  catBreedSearchOptions: { id: string; label: string }[];
};

const SearchCatBreeds = ({
  catBreedSearchOptions,
  selectedBreed,
}: SearchCatBreedsProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  console.log("catBreedSearchOptions", catBreedSearchOptions);
  const defaultInputValue = searchParams.get("query")?.toString() ?? "";

  const [selectedValue, setSelectedValue] = useState<{
    label: string;
    id: string;
  } | null>(null);
  // const [inputValue, setInputValue] = useState(defaultInputValue);

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    if (selectedValue) {
      params.set("breed", selectedValue.id);
    } else {
      params.delete("breed");
    }
    replace(`${pathname}?${params.toString()}`);
  }, DEBOUNCE_INTERVAL);

  return (
    <Autocomplete
      value={selectedValue}
      onChange={(event, newValue) => {
        setSelectedValue(newValue);
        // console.log("id", newValue.id);
        // const params = new URLSearchParams(searchParams);
        // params.set("breed", newValue.id);
        // replace(`${pathname}?${params.toString()}`);
      }}
      //defaultValue={defaultInputValue}
      inputValue={defaultInputValue}
      onInputChange={(event, newInputValue) => {
        console.log("new", newInputValue);
        handleSearch(newInputValue);
        //  setInputValue(newInputValue);
      }}
      id="search-cat-breeds"
      getOptionLabel={(option) => option.label}
      options={catBreedSearchOptions}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Choose a breed" />
      )}
      noOptionsText="Cat Breed not found"
      loadingText="Cat Breed list loading"
    />
  );
};

export default SearchCatBreeds;
