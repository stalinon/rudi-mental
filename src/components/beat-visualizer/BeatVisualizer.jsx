import React, { useEffect, useState, useRef } from 'react';
import BeatDots from './BeatDots';
import { useMetronomeSounds } from './hooks/useMetronomeSounds';
import * as Tone from 'tone';

const MAX_BPM = 240;

const BeatVisualizer = ({
  bpm = 80,
  beatsPerBar = 4,
  isActive = false,
  metronomeSettings = {
    playBars: 0,
    muteBars: 0,
    accentSound: 'accent',
    regularSound: 'click',
    volumeAccent: 100,
    volumeRegular: 100,
    tempoProgression: 0,
    enableProgression: false,
  },
  onBarChange = () => {},
  onBeatChange = () => {},
  setBpm = (bpm) => {},
}) => {
  const [currentBeat, setCurrentBeat] = useState(-1);
  const intervalRef = useRef(null);

  const {
    accentSound,
    regularSound,
    volumeAccent,
    volumeRegular,
    tempoProgression,
    enableProgression,
    playBars,
    muteBars,
  } = metronomeSettings;

  const playClick = useMetronomeSounds({
    accentSound,
    regularSound,
    volumeAccent,
    volumeRegular,
  });

  const isCyclic = playBars > 0 && muteBars > 0;

  useEffect(() => {
    if (!isActive) {
      clearInterval(intervalRef.current);
      setCurrentBeat(-1);
      return;
    }

    Tone.start();

    let beat = -1;
    let barCounter = 0;
    let isMuted = false;

    const intervalMs = 60000 / bpm;

    intervalRef.current = setInterval(() => {
      beat = (beat + 1) % beatsPerBar;

      if (bpm > MAX_BPM) {
        setBpm(MAX_BPM);
      }

      if (beat === 0) {
        if (isCyclic) {
          const total = isMuted ? muteBars : playBars;
          if (barCounter >= total) {
            isMuted = !isMuted;
            barCounter = 0;
          }
        }

        barCounter++;
        onBarChange(barCounter - 1);

        if (enableProgression && barCounter > 10) {
          const newTempo = bpm + tempoProgression;
          if (newTempo !== bpm) {
            setBpm(newTempo);
          }
        }
      }

      onBeatChange(beat);
      if (!isMuted) {
        playClick(beat);
      }
      setCurrentBeat(beat);
    }, intervalMs);

    return () => clearInterval(intervalRef.current);
  }, [
    isActive,
    bpm,
    beatsPerBar,
    playBars,
    muteBars,
    enableProgression,
    tempoProgression,
    setBpm,
    onBarChange,
    onBeatChange,
    isCyclic,
    playClick,
  ]);

  return <BeatDots currentBeat={currentBeat} beatsPerBar={beatsPerBar} />;
};

export default BeatVisualizer;
