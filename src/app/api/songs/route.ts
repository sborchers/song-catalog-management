import { NextResponse } from "next/server";
import data from "../../../data/songs.json";
import { Song } from "../../../utils/types";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const artist = url.searchParams.get("artist");
  const title = url.searchParams.get("title");
  const sort = url.searchParams.get("sort");

  let songs = data as Song[];

  if (artist) {
    songs = songs.filter((song) =>
      song.artist.some((a) => a.toLowerCase().includes(artist.toLowerCase()))
    );
  }

  if (title) {
    songs = songs.filter((song) =>
      song.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (sort) {
    songs = songs.sort((a, b) =>
      sort === "asc"
        ? a.streamCount - b.streamCount
        : b.streamCount - a.streamCount
    );
  }

  // TODO: don't limit songs to first 100
  songs = songs.slice(0, 100) as Song[];

  return NextResponse.json(songs);
}
