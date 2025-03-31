import { useRef, useEffect, useCallback } from 'react';
import * as Tone from 'tone';

export const useMetronomeSounds = ({ accentSound, regularSound, volumeAccent, volumeRegular }) => {
  const regularPlayer = useRef(null);
  const accentPlayer = useRef(null);
  const lastTriggerTime = useRef(0);

  useEffect(() => {
    regularPlayer.current = new Tone.Player(`${process.env.PUBLIC_URL}/sounds/${regularSound}.mp3`).toDestination();
    accentPlayer.current = new Tone.Player(`${process.env.PUBLIC_URL}/sounds/${accentSound}.mp3`).toDestination();

    regularPlayer.current.volume.value = volumeRegular - 100;
    accentPlayer.current.volume.value = volumeAccent - 100;

    return () => {
      regularPlayer.current.dispose();
      accentPlayer.current.dispose();
    };
  }, [accentSound, regularSound, volumeAccent, volumeRegular]);

  const playClick = useCallback((beatIndex) => {
    const now = Tone.now();
    if (now <= lastTriggerTime.current) return;
    lastTriggerTime.current = now;

    if (beatIndex === 0) {
      accentPlayer.current.start(now);
    } else {
      regularPlayer.current.start(now);
    }
  }, []);

  return playClick;
};
