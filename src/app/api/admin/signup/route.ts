import type { NextRequest } from 'next/server';

import bcrypt from 'bcryptjs';

import connect from 'src/lib/db';
import adminModel from 'src/lib/modals/admin.modal';
import { encrypt, secretKey } from 'src/lib/enc_dec';

export async function POST(req: NextRequest) {
  await connect();
  try {
    const body = await req.json();
    body.email = encrypt(body.email, secretKey);
    body.phone = encrypt(body.phone, secretKey);
    body.password = await bcrypt.hash(body.password, 10);
    await adminModel.create({ ...body });
    return Response.json(
      {
        succces: true,
        message: 'user created',
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      }
    );
  }
}
