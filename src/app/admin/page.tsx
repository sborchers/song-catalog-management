"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SongTable from "../../components/SongTable";
import SearchBar from "../../components/SearchBar";
import { Song } from "../../utils/types";
import { Container, Typography } from "@mui/material";
import { styled } from "styled-components";
import React from "react";

export default function SongAdminPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [artistFilter, setArtistFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchSongs = useCallback(async () => {
    if (loading) return;
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  }, [searchTerm, artistFilter, sortOrder, loading]);

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
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        artistFilter={artistFilter}
        onArtistFilterChange={setArtistFilter}
      />
    </Container>
  );
}

const HeaderContainer = styled.div`
  position: sticky;
  top: 64px;
`;
