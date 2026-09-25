import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const sampleRate = 44_100;
const durationSeconds = 10.5;
const frames = Math.floor(sampleRate * durationSeconds);
const bytesPerSample = 2;
const channels = 2;
const dataBytes = frames * bytesPerSample * channels;
const outputPath = resolve(
  process.argv[2] ??
    fileURLToPath(new URL("../pool-walkthrough-music.mp3", import.meta.url)),
);

const progression = [
  {
    bass: 73.42,
    pad: [146.83, 185, 220, 277.18, 329.63],
    arpeggio: [293.66, 369.99, 440, 554.37],
  },
  {
    bass: 61.74,
    pad: [123.47, 146.83, 185, 220, 293.66],
    arpeggio: [246.94, 293.66, 369.99, 440],
  },
  {
    bass: 49,
    pad: [98, 123.47, 146.83, 185, 246.94],
    arpeggio: [196, 246.94, 293.66, 369.99],
  },
  {
    bass: 55,
    pad: [110, 138.59, 164.81, 220, 246.94],
    arpeggio: [220, 277.18, 329.63, 493.88],
  },
];

function smoothstep(value) {
  const clamped = Math.max(0, Math.min(1, value));
  return clamped * clamped * (3 - 2 * clamped);
}

function renderFrame(time, frameIndex) {
  const barDuration = 2.5;
  const bar = Math.min(3, Math.floor(time / barDuration));
  const barPosition = time - bar * barDuration;
  const current = progression[bar];
  const next = progression[Math.min(3, bar + 1)];
  const chordBlend = bar < 3 ? smoothstep((barPosition - 2.12) / 0.38) : 0;
  const vibrato = 0.003 * Math.sin(2 * Math.PI * 0.12 * time);

  let padLeft = 0;
  let padRight = 0;
  for (let note = 0; note < current.pad.length; note += 1) {
    const currentFrequency = current.pad[note];
    const nextFrequency = next.pad[note] ?? currentFrequency;
    const currentPhase = 2 * Math.PI * currentFrequency * (time + vibrato);
    const nextPhase = 2 * Math.PI * nextFrequency * (time + vibrato);
    const currentTone =
      Math.sin(currentPhase) + 0.18 * Math.sin(currentPhase * 2);
    const nextTone =
      Math.sin(nextPhase) + 0.18 * Math.sin(nextPhase * 2);
    padLeft += currentTone * (1 - chordBlend) + nextTone * chordBlend;
    padRight +=
      (Math.sin(currentPhase * 1.0015) + 0.18 * Math.sin(currentPhase * 2.003)) *
        (1 - chordBlend) +
      (Math.sin(nextPhase * 1.0015) + 0.18 * Math.sin(nextPhase * 2.003)) *
        chordBlend;
  }
  padLeft *= 0.055;
  padRight *= 0.055;

  const stepDuration = 0.3125;
  const stepIndex = Math.floor(time / stepDuration);
  const stepPosition = time - stepIndex * stepDuration;
  const arpeggioNote = current.arpeggio[stepIndex % current.arpeggio.length];
  const arpeggioEnvelope = Math.exp(-stepPosition * 5.5);
  const arpeggioPhase = 2 * Math.PI * arpeggioNote * time;
  const arpeggioTone =
    (Math.sin(arpeggioPhase) + 0.22 * Math.sin(arpeggioPhase * 2)) *
    arpeggioEnvelope *
    0.11;
  const panLeft = stepIndex % 2 === 0 ? 0.88 : 0.28;
  const panRight = stepIndex % 2 === 0 ? 0.28 : 0.88;

  const beatPosition = time % 0.625;
  const beatEnvelope = Math.exp(-beatPosition * 11);
  const bass = Math.sin(
    2 * Math.PI * current.bass * (time - beatPosition),
  ) * beatEnvelope * 0.11;
  const kick =
    beatPosition < 0.17
      ? Math.sin(2 * Math.PI * (52 - beatPosition * 48) * beatPosition) *
        Math.exp(-beatPosition * 22) *
        0.08
      : 0;
  const tick =
    Math.exp(-stepPosition * 45) *
    Math.sin(2 * Math.PI * 5_800 * time) *
    0.014;

  const fadeIn = smoothstep(time / 0.65);
  const fadeOut = smoothstep((durationSeconds - time) / 1.35);
  const envelope = fadeIn * fadeOut;
  const left =
    (padLeft + arpeggioTone * panLeft + bass + kick + tick) * envelope;
  const right =
    (padRight + arpeggioTone * panRight + bass + kick + tick) * envelope;
  const limiter = Math.tanh(1.3);

  return [
    Math.tanh(left * 1.3) / limiter,
    Math.tanh(right * 1.3) / limiter,
  ];
}

function makeWavHeader() {
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataBytes, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * channels * bytesPerSample, 28);
  header.writeUInt16LE(channels * bytesPerSample, 32);
  header.writeUInt16LE(bytesPerSample * 8, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataBytes, 40);
  return header;
}

const tempDir = await mkdtemp(join(tmpdir(), "pool-walkthrough-music-"));
const wavPath = join(tempDir, "pool-walkthrough-music.wav");

try {
  const wav = Buffer.alloc(44 + dataBytes);
  makeWavHeader().copy(wav);
  for (let frame = 0; frame < frames; frame += 1) {
    const time = frame / sampleRate;
    const [left, right] = renderFrame(time, frame);
    const offset = 44 + frame * channels * bytesPerSample;
    wav.writeInt16LE(Math.max(-1, Math.min(1, left)) * 32_000, offset);
    wav.writeInt16LE(Math.max(-1, Math.min(1, right)) * 32_000, offset + 2);
  }
  await writeFile(wavPath, wav);

  await new Promise((resolvePromise, rejectPromise) => {
    const process = spawn(
      "ffmpeg",
      [
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        "-i",
        wavPath,
        "-codec:a",
        "libmp3lame",
        "-b:a",
        "160k",
        "-ar",
        String(sampleRate),
        "-ac",
        String(channels),
        outputPath,
      ],
      { stdio: "inherit" },
    );
    process.on("error", rejectPromise);
    process.on("close", (code) => {
      if (code === 0) resolvePromise();
      else rejectPromise(new Error(`ffmpeg exited with status ${code}.`));
    });
  });
  console.log(`Wrote original instrumental music to ${outputPath}`);
} finally {
  await rm(tempDir, { recursive: true, force: true });
}