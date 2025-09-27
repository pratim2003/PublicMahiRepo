import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import connect from 'src/lib/db';
import contactusModel from 'src/lib/modals/contactUs';

export async function POST(req: NextRequest) {
  await connect();
  try {
    const data = await req.json();
    await contactusModel.create({ ...data });
    return NextResponse.json(
      {
        success: true,
        message: 'message created',
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error fetching designs:', error);
    return Response.json(
      {
        message: 'Error getting designs',
        error: error.message || error,
      },
      { status: 500 }
    );
  }
}
