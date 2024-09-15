export interface Song {
  title: string;
  album: string;
  genre: string;
  artist: string[];
  lengthMs: number;
  createdAt: string;
  streamCount: number;
}

export type Sort = {
  field: SortField;
  order: SortOrder;
};

export enum SortField {
  Title = "Title",
  Album = "Album",
  Genre = "Genre",
  Artist = "Artist",
  LengthMs = "LengthMs",
  CreatedAt = "CreatedAt",
  StreamCount = "StreamCount",
}

export enum SortOrder {
  Ascending = "Ascending",
  Descending = "Descending",
}
