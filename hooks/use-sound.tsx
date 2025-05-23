"use client";

import { useEffect, useRef, useState } from "react";

export function useSound(soundUrl: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio();

    // Set up event listeners
    audio.addEventListener("canplaythrough", () => {
      setIsLoaded(true);
    });

    audio.addEventListener("error", (e) => {
      console.warn(`Error loading sound: ${soundUrl}`, e);
      setHasError(true);
    });

    // Set source after adding event listeners
    audio.src = soundUrl;
    audio.preload = "auto";

    // Store reference
    audioRef.current = audio;

    // Clean up
    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("canplaythrough", () => {
        setIsLoaded(true);
      });
      audio.removeEventListener("error", () => {
        setHasError(true);
      });
    };
  }, [soundUrl]);

  const play = () => {
    if (audioRef.current && isLoaded && !hasError) {
      // Create a new audio element for each play to allow overlapping sounds
      const sound = new Audio(soundUrl);
      sound.volume = 0.5;
      sound.play().catch((error) => {
        // Handle autoplay restrictions
        console.log("Error playing sound:", error);
      });
    }
  };

  return { play, isLoaded, hasError };
}
