import { NextRequest, NextResponse } from 'next/server';
import { GemService } from '@/lib/services/gemService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const chakra = searchParams.get('chakra') || undefined;

    const gems = await GemService.getAllGems(category, chakra);
    return NextResponse.json({
      success: true,
      count: gems.length,
      data: gems,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch gemstones' },
      { status: 500 }
    );
  }
}
