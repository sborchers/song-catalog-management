import { Song } from "../../utils/types";
import { formatDuration } from "../../utils/timeUtils";
import {
  DataGrid,
  GridColDef,
  GridSortModel,
  GridFilterModel,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { useState } from "react";
import React from "react";

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    minWidth: 200,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    flex: 1,
  },
  {
    field: "album",
    headerName: "Album",
    minWidth: 150,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: "genre",
    headerName: "Genre",
    minWidth: 150,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: "artist",
    headerName: "Artist",
    minWidth: 200,
    valueGetter: (_value, row) => row.artist.join(", "),
    sortable: false,
    filterable: true,
    disableColumnMenu: false,
    filterOperators: getGridStringOperators().filter(
      (operator) => operator.value === "contains"
    ),
  },
  {
    field: "lengthMs",
    headerName: "Length (min)",
    minWidth: 120,
    valueGetter: (_value, row) => `${formatDuration(row.lengthMs)}`,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: "createdAt",
    headerName: "Created",
    minWidth: 100,
    valueGetter: (_value, row) => new Date(row.createdAt).toLocaleDateString(),
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: "streamCount",
    headerName: "Stream Count",
    minWidth: 140,
    valueGetter: (_value, row) => row.streamCount.toLocaleString(),
    sortable: true,
    filterable: false,
    disableColumnMenu: true,
  },
];

interface SongTableProps {
  songs: Song[];
  sortOrder: "asc" | "desc" | null;
  onSortOrderChange: (value: "asc" | "desc" | null) => void;
  onArtistFilterChange: (value: string) => void;
}

export default function SongTable({
  songs,
  sortOrder,
  onSortOrderChange,
  onArtistFilterChange,
}: SongTableProps) {
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  const handleSortModelChange = (model: GridSortModel) => {
    if (model.length > 0) {
      const { field, sort } = model[0];
      if (field === "streamCount") {
        const sortDirection =
          sort === "asc" ? "asc" : sort === "desc" ? "desc" : null;
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
