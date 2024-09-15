"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SongTable from "../../components/SongTable";
import SearchBar from "../../components/SearchBar";
import { Song, SortOrder } from "../../utils/types";
import { Container, Typography } from "@mui/material";
import { styled } from "styled-components";
import React from "react";

export default function SongAdminPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [artistFilter, setArtistFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchSongs = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const query = new URLSearchParams({
        ...(searchTerm && { title: searchTerm }),
        ...(artistFilter && { artist: artistFilter }),
        ...(sortOrder && { sort: sortOrder }),
      }).toString();

      const response = await fetch(`/api/songs?${query}`);
      const data = await response.json();

      setSongs(data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  }, [searchTerm, artistFilter, sortOrder]);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return (
    <Container>
      <HeaderContainer>
        <Typography variant="h4" sx={{ padding: "16px 0" }}>
          Song Catalog
        </Typography>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </HeaderContainer>
      <SongTable
        songs={songs}
        onSortOrderChange={setSortOrder}
        onArtistFilterChange={setArtistFilter}
      />
    </Container>
  );
}

const HeaderContainer = styled.div`
  position: sticky;
  top: 64px;
`;
