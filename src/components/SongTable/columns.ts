import { GridColDef, getGridStringOperators } from "@mui/x-data-grid";
import { formatDuration } from "../../utils/timeUtils";

export const columns: GridColDef[] = [
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
