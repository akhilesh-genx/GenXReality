import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');

    const seq1Dir = path.join(publicDir, 'Final-Frames');

    const seq1Files = fs.readdirSync(seq1Dir)
      .filter(f => f.endsWith('.jpg'))
      .sort();

    return NextResponse.json({
      sequence1: {
        count: seq1Files.length,
        files: seq1Files,
        basePath: '/Final-Frames',
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read frame directories' },
      { status: 500 }
    );
  }
}
