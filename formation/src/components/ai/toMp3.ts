'use client';

/**
 * Converts any browser recording (webm, mp4…) to a small mono MP3 at 16 kHz,
 * a format every transcription model accepts. About 240 KB per minute.
 */
export async function toMp3(blob: Blob): Promise<Blob> {
  const { Mp3Encoder } = await import('@breezystack/lamejs');
  const rate = 16000;
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctx({ sampleRate: rate });
  try {
    const decoded = await ctx.decodeAudioData(await blob.arrayBuffer());
    // Mix down to mono.
    const length = decoded.length;
    const mono = new Float32Array(length);
    for (let c = 0; c < decoded.numberOfChannels; c++) {
      const data = decoded.getChannelData(c);
      for (let i = 0; i < length; i++) mono[i] += data[i] / decoded.numberOfChannels;
    }
    const pcm = new Int16Array(length);
    for (let i = 0; i < length; i++) pcm[i] = Math.max(-1, Math.min(1, mono[i])) * 0x7fff;

    const encoder = new Mp3Encoder(1, decoded.sampleRate, 32);
    const parts: Uint8Array[] = [];
    for (let i = 0; i < pcm.length; i += 1152) {
      const chunk = encoder.encodeBuffer(pcm.subarray(i, i + 1152));
      if (chunk.length) parts.push(chunk);
    }
    const end = encoder.flush();
    if (end.length) parts.push(end);
    return new Blob(parts as BlobPart[], { type: 'audio/mpeg' });
  } finally {
    ctx.close().catch(() => {});
  }
}
