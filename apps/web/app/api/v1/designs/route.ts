import { NextRequest, NextResponse } from 'next/server';
import { encodeDesignToken, decodeDesignToken } from '@artixain/shared';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token query parameter required' },
        { status: 400 }
      );
    }

    const decoded = decodeDesignToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid or corrupt design token' },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      data: decoded,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to decode design' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { wristSizeCm, cordType, beads } = body;

    if (!wristSizeCm || !beads || !Array.isArray(beads)) {
      return NextResponse.json(
        { success: false, error: 'Missing wristSizeCm or beads array' },
        { status: 400 }
      );
    }

    const token = encodeDesignToken(wristSizeCm, cordType || 'silicone_stretch', beads);
    return NextResponse.json({
      success: true,
      data: { token },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to encode design' },
      { status: 500 }
    );
  }
}
