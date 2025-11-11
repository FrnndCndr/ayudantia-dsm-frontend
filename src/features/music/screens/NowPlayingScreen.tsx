import React, { useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { useSongs } from "../hooks/useSongs";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { Song } from "../models/song.models";
import ProgressBar from "../components/ProgressBar";
import PlayerControls from "../components/PlayerControls";
import SongCard from "../components/SongCard";
import ScreenHeader from "../components/ScreenHeader";

export default function NowPlayingScreen() {
  const { songs, isLoading } = useSongs();
  const {
    playerState,
    playSong,
    togglePlayPause,
    seekTo,
    handleNext,
    handlePrevious,
    toggleShuffle,
    toggleRepeat,
  } = useAudioPlayer(songs);

  const currentSong: Song | null = playerState.currentSong ?? (songs?.[0] ?? null);

  const currentIndex = useMemo(() => {
    if (!currentSong || !songs?.length) return 0;
    const idx = songs.findIndex((s) => s.id === currentSong.id);
    return idx >= 0 ? idx : 0;
  }, [currentSong, songs]);

  // Progreso local + timer para suavizar entre eventos del player
  const duration = playerState.duration ?? currentSong?.duration ?? 0;
  const [positionLocal, setPositionLocal] = useState<number>(playerState.currentTime ?? 0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setPositionLocal(playerState.currentTime ?? 0);
  }, [playerState.currentTime, currentSong?.id]);

  useEffect(() => {
    const stop = () => {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    };
    if (!playerState.isPlaying || !duration) { stop(); return; }

    stop();
    timerRef.current = setInterval(() => {
      setPositionLocal((p) => Math.min((p ?? 0) + 0.5, duration));
    }, 500);

    return stop;
  }, [playerState.isPlaying, duration, currentSong?.id]);

  if (isLoading || !songs?.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>Cargando playlist…</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Mi playlist n.º 1" />

      <SongCard
        coverUrl={currentSong?.coverUrl}
        title={currentSong?.title}
        artist={currentSong?.artist}
      />

      <ProgressBar
        position={positionLocal}
        duration={duration}
        onSeek={(sec) => { setPositionLocal(sec); seekTo?.(sec); }}
      />

      <PlayerControls
        isPlaying={playerState.isPlaying}
        onPrev={() => (songs.length ? handlePrevious() : undefined)}
        onNext={() => (songs.length ? handleNext() : undefined)}
        onTogglePlayPause={togglePlayPause}
        onShufflePress={toggleShuffle}
        onRepeatPress={toggleRepeat}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingHorizontal: 24, paddingTop: 48 },
  loading: { color: "#fff", marginTop: 40, textAlign: "center", fontSize: 16 },
});
