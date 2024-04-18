import { SearchStore, SearchType } from "@/stores/SearchStore";
import { Chip } from "@nextui-org/react";
import { observer } from "mobx-react";
import React, { FC } from "react";
import { FaSearch } from "react-icons/fa";

interface IProps {
  searchType: SearchType;
}

/**
 * @author
 * @function @SearchChip
 **/

export const SearchChip: FC<IProps> = observer(({ searchType }) => {
  return (
    <div>
      {SearchStore.search.query.length &&
      SearchStore.search.type == searchType ? (
        <Chip className="ml-5 flex items-center" startContent={<FaSearch />}>
          <p className="font-bold uppercase font-sans">
            {SearchStore.search.query}
          </p>
        </Chip>
      ) : (
        ""
      )}
    </div>
  );
});
