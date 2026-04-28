import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');

    const seq1Dir = path.join(publicDir, 'Final-Frames');
    const upscaledDir = path.join(publicDir, 'ezgif-upscaled');

    // Load first 160 frames from Final-Frames
    const seq1Files = fs.readdirSync(seq1Dir)
      .filter(f => f.endsWith('.jpg'))
      .sort()
      .slice(0, 160)
      .map(f => `/Final-Frames/${f}`);

    // Load following frames from ezgif-upscaled
    const upscaledFiles = fs.readdirSync(upscaledDir)
      .filter(f => f.endsWith('.jpg'))
      .sort()
      .map(f => `/ezgif-upscaled/${f}`);

    // Combine them for continuity
    const combinedFiles = [...seq1Files, ...upscaledFiles];

    return NextResponse.json({
      sequence1: {
        count: combinedFiles.length,
        files: combinedFiles,
        // basePath is no longer used since we return full paths now
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read frame directories' },
      { status: 500 }
    );
  }
}
