import { SearchStore, SearchType } from "@/stores/SearchStore";
import { Input } from "@nextui-org/react";
import { observer } from "mobx-react";
import React, { FC } from "react";

interface IProps {
  searchType: SearchType;
}

/**
 * @author
 * @function @SearchInput
 **/

const SearchInputComp: FC<IProps> = ({ searchType }) => {
  return (
    <Input
      onChange={(e) => {
        SearchStore.setSearch({
          type: searchType || "game",
          query: e.target.value,
        });
      }}
      className="mr-5"
      placeholder="Search..."
      value={
        (SearchStore.search.type == searchType || "game") &&
        SearchStore.search.query
      }
    />
  );
};

export const SearchInput = observer(SearchInputComp);
