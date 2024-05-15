"use client";
import { useEffect, useState } from "react";
import { PodList } from "./PodList";
import { useBook } from "@/contexts/BookContext";

export default function Home() {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState<any[]>([]);
  const { selectedBook, setSelectedBook } = useBook();
  useEffect(() => {
    fetch("/api/podcast-episodes/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Check what the data looks like
        if (data) {
          // Ensure that data.items is an array
          setEpisodes(data.items); // Use the 'items' array for episodes
          setFilteredEpisodes(data.items); // Initialize filtered episodes with fetched data
        } else {
          console.error(
            "Fetched data does not contain an array of items:",
            data
          );
        }
      })
      .catch((error) => console.error("Error fetching episodes:", error));
  }, []);

  useEffect(() => {
    if (selectedBook) {
      setFilteredEpisodes(filterEpisodes(episodes, selectedBook));
    } else {
      setFilteredEpisodes(episodes); // Reset to all episodes when no book is selected
    }
  }, [selectedBook, episodes]); // Depend on selectedBook and episodes


  const filterEpisodes = (episodes: any[], book: string) => {
    if (book === "0" || !Array.isArray(episodes)) {
      return episodes;
    } else {
      const regex1 = /^\u05e1\u05e4\u05e8 (\d+)/;
      const regex2 = /^\u05e1\u05e8\u05d8 (\d+)/;
      return episodes.filter((episode) => {
        const match = episode.name.match(regex1) || episode.name.match(regex2);
        if (match) {
          const episodeNumber = parseInt(match[1], 10);
          return episodeNumber === parseInt(book, 10);
        }
        return false;
      });
    }
  };

  return (
    <>
      <div className="mx-[25%]">
        <PodList episodes={filteredEpisodes} />
      </div>
    </>
  );
}
