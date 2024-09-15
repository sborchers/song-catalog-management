import { Song, SortOrder } from "../../utils/types";
import { DataGrid, GridSortModel, GridFilterModel } from "@mui/x-data-grid";
import { useState } from "react";
import React from "react";
import { columns } from "./columns";
interface SongTableProps {
  songs: Song[];
  onSortOrderChange: (value: SortOrder | null) => void;
  onArtistFilterChange: (value: string) => void;
}

export default function SongTable({
  songs,
  onSortOrderChange,
  onArtistFilterChange,
}: SongTableProps) {
  const [, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  const handleSortModelChange = (model: GridSortModel) => {
    if (model.length > 0) {
      const { field, sort } = model[0];
      if (field === "streamCount") {
        const sortDirection =
          sort === SortOrder.Ascending
            ? SortOrder.Ascending
            : sort === SortOrder.Descending
            ? SortOrder.Descending
            : null;
        onSortOrderChange(sortDirection);
      }
    } else {
      onSortOrderChange(null);
    }
  };

  const handleFilterModelChange = (model: GridFilterModel) => {
    setFilterModel(model);

    const artistFilterItem = model.items.find(
      (item) => item.field === "artist"
    );
    if (artistFilterItem) {
      onArtistFilterChange(artistFilterItem.value as string);
    } else {
      onArtistFilterChange("");
    }
  };

  return (
    <div style={{ height: "calc(100vh - 230px)", width: "100%" }}>
      <DataGrid
        rows={songs}
        columns={columns}
        disableRowSelectionOnClick
        getRowId={(row: Song) => `${row.title}-${row.album}-${row.artist}`}
        onFilterModelChange={handleFilterModelChange}
        onSortModelChange={handleSortModelChange}
        disableColumnSelector
        sortingMode="server"
        filterMode="server"
      />
    </div>
  );
}
