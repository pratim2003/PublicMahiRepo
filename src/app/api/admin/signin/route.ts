import type { NextRequest } from 'next/server';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import connect from 'src/lib/db';
import adminModel from 'src/lib/modals/admin.modal';
import { decrypt, secretKey } from 'src/lib/enc_dec';

// export async function POST(req:NextRequest){
//     await connect()
//     try {
//         const body = await req.json()
//        const admins = await adminModel.find()
//        const user = admins.filter((ad)=>{
//         decrypt(ad.email,secretKey)===body.email
//        })
//         if(user.length===0){
//             return Response.json({
//             success : false,
//             message : "no admin found"
//         },{
//             status : 500
//         })
//         }
//         const compare = await bcrypt.compare(body.password,user[0].password)
//         if(!compare){
//             return Response.json({
//             success : false,
//             message : "wrong password"
//         },{
//             status : 500
//         })
//         }
//         const token = jwt.sign(
//             { userId: user[0].id, email: user[0].email },
//             process.env.JWT_SECRET!,
//             {
//                 expiresIn : "1h"
//             }
//         )
//         return Response.json({accessToken : token},{status : 200})
//     } catch (error) {
//         console.log(error)
//         return Response.json({
//             success : false,
//             error
//         },{
//             status : 500
//         })
//     }
// }

export async function POST(req: NextRequest) {
  await connect();
  try {
    const body = await req.json();

    const admins = await adminModel.find();

    // Use `find` instead of `filter` (since you want only one match)
    const user = admins.find((ad: any) => decrypt(ad.email, secretKey) === body.email);
    if (!user) {
      return Response.json({ success: false, message: 'No admin found' }, { status: 404 });
    }

    const compare = await bcrypt.compare(body.password, user.password);
    if (!compare) {
      return Response.json({ success: false, message: 'Wrong password' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return Response.json({ accessToken: token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
