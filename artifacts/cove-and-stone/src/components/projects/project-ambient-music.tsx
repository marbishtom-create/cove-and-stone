import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const CHORDS = [
  [130.81, 164.81, 196, 261.63],
  [110, 130.81, 164.81, 220],
  [87.31, 130.81, 174.61, 220],
  [98, 146.83, 196, 246.94],
];
const MELODY = [392, 523.25, 440, 349.23];
const LOOP_SECONDS = 8;

export function ProjectAmbientMusic() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      const context = audioContextRef.current;
      if (context && context.state !== "closed") void context.close();
    },
    [],
  );

  const stopMusic = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const context = audioContextRef.current;
    audioContextRef.current = null;
    if (context && context.state !== "closed") void context.close();
    setIsPlaying(false);
  };

  const startMusic = async () => {
    setError(null);
    setIsStarting(true);
    try {
      const context = new AudioContext();
      const master = context.createGain();
      master.gain.setValueAtTime(0.2, context.currentTime);
      master.connect(context.destination);
      audioContextRef.current = context;
      await context.resume();

      const playChord = (chordIndex: number) => {
        if (audioContextRef.current !== context || context.state !== "running") return;

        const startAt = context.currentTime + 0.06;
        CHORDS[chordIndex].forEach((frequency, noteIndex) => {
          const oscillator = context.createOscillator();
          const envelope = context.createGain();
          oscillator.type = noteIndex === 0 ? "sine" : "triangle";
          oscillator.frequency.setValueAtTime(frequency, startAt);
          envelope.gain.setValueAtTime(0.0001, startAt);
          envelope.gain.linearRampToValueAtTime(noteIndex === 0 ? 0.16 : 0.075, startAt + 1.6);
          envelope.gain.setValueAtTime(noteIndex === 0 ? 0.16 : 0.075, startAt + 6.4);
          envelope.gain.exponentialRampToValueAtTime(0.0001, startAt + LOOP_SECONDS);
          oscillator.connect(envelope);
          envelope.connect(master);
          oscillator.start(startAt);
          oscillator.stop(startAt + LOOP_SECONDS + 0.05);
        });

        MELODY.forEach((frequency, noteIndex) => {
          const noteStart = startAt + 0.9 + noteIndex * 1.6;
          const oscillator = context.createOscillator();
          const envelope = context.createGain();
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(frequency, noteStart);
          envelope.gain.setValueAtTime(0.0001, noteStart);
          envelope.gain.linearRampToValueAtTime(0.035, noteStart + 0.12);
          envelope.gain.exponentialRampToValueAtTime(0.0001, noteStart + 1.15);
          oscillator.connect(envelope);
          envelope.connect(master);
          oscillator.start(noteStart);
          oscillator.stop(noteStart + 1.2);
        });

        timerRef.current = window.setTimeout(
          () => playChord((chordIndex + 1) % CHORDS.length),
          (LOOP_SECONDS - 0.15) * 1000,
        );
      };

      setIsPlaying(true);
      playChord(0);
    } catch {
      const context = audioContextRef.current;
      audioContextRef.current = null;
      if (context && context.state !== "closed") void context.close();
      setIsPlaying(false);
      setError("Ambient audio could not start in this browser.");
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={isPlaying ? stopMusic : startMusic}
        disabled={isStarting}
        aria-pressed={isPlaying}
        className="inline-flex min-h-11 items-center gap-2 border border-white/35 bg-black/55 px-3 text-[10px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-md transition-colors hover:bg-black/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary"
      >
        {isPlaying ? (
          <VolumeX aria-hidden="true" className="h-4 w-4" />
        ) : (
          <Volume2 aria-hidden="true" className="h-4 w-4" />
        )}
        {isPlaying ? "Music on" : "Play music"}
      </button>
      {error && (
        <p role="status" className="max-w-48 bg-black/75 px-2 py-1 text-xs text-white">
          {error}
        </p>
      )}
    </div>
  );
}