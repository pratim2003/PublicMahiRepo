import { uploadImage } from 'src/utils/fileupload';

import homeModel from 'src/lib/modals/home';

export async function getHome(): Promise<any> {
  try {
    const data = await homeModel.find();
    return { data: data[0], status: 200 };
  } catch (error: any) {
    console.error(error);
    return { error, status: 500 };
  }
}

// export async function createHome(req: Request): Promise<any> {
//   try {
//     const contentType = req.headers.get('content-type') || '';

//     if (contentType.includes('application/json')) {
//       const { ...data } = await req.json();
//       await homeModel.create(data);
//     }

//     if (contentType.includes('multipart/form-data')) {
//       const formData = await req.formData();
//       const heading = formData.get('heading') as string;
//       const body = formData.get('body') as string;
//       const id = formData.get('id') as string;

//       const file = formData.get('file') as File | null;
//       let savedImage = '';
//       if (file) {
//         const uploadResult = await uploadImage(file);
//         if (uploadResult.success && uploadResult.path) {
//           savedImage = uploadResult.path;
//         }
//       }
//       if (id) {
//         const data = await homeModel.findById(id);
//         await homeModel.findByIdAndUpdate(id, {
//           heading: heading || data?.heading,
//           body: body || data?.body,
//           image: savedImage || data?.image,
//         });
//         return { status: 200 };
//       }
//       await homeModel.create({
//         heading,
//         body,
//         image: savedImage,
//       });
//     }
//     return { status: 200 };
//   } catch (error) {
//     console.error(error);
//     return { error, status: 500 };
//   }
// }

// export async function createHome(req: Request): Promise<any> {
//   try {
//     const contentType = req.headers.get('content-type') || '';

//     if (contentType.includes('application/json')) {
//       const { ...data } = await req.json();
//       await homeModel.create(data);
//     }

//     if (contentType.includes('multipart/form-data')) {
//       const formData = await req.formData();
//       const heading = formData.get('heading') as string;
//       const body = formData.get('body') as string;
//       const id = formData.get('id') as string;

//       const file = formData.get('file') as File | null;
//       let savedImage = '';
//       if (file) {
//         const uploadResult = await uploadImage(file);
//         if (uploadResult.success && uploadResult.path) {
//           savedImage = uploadResult.path;
//         }
//       }
//       if (id) {
//         const data = await homeModel.findById(id);
//         await homeModel.findByIdAndUpdate(id, {
//           heading: heading || data?.heading,
//           body: body || data?.body,
//           image: savedImage || data?.image,
//         });
//         return { status: 200 };
//       }
//       await homeModel.create({
//         heading,
//         body,
//         image: savedImage,
//       });
//     }
//     return { status: 200 };
//   } catch (error) {
//     console.error(error);
//     return { error, status: 500 };
//   }
// }

export async function createHome(req: Request): Promise<any> {
  try {
    const contentType = req.headers.get('content-type') || '';
    let data: any = {};

    if (contentType.includes('application/json')) {
      data = await req.json();
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      data.heading = formData.get('heading') as string;
      data.body = formData.get('body') as string;

      const file = formData.get('file') as File | null;
      if (file) {
        const uploadResult = await uploadImage(file);
        console.log(uploadResult);
        if (uploadResult.success && uploadResult.path) {
          data.image = uploadResult.path;
        }
      }
    } else {
      return { error: 'Unsupported content type', status: 400 };
    }

    // Find the existing document
    let homeDoc = await homeModel.findOne();
    if (homeDoc) {
      // Update only provided fields
      homeDoc.heading = data.heading ?? homeDoc.heading;
      homeDoc.body = data.body ?? homeDoc.body;
      homeDoc.image = data.image ?? homeDoc.image;

      await homeDoc.save();
      return { status: 200, data: homeDoc };
    }
    // Create new if not exists
    homeDoc = await homeModel.create(data);
    return { status: 200, data: homeDoc };
  } catch (error) {
    console.error(error);
    return { error, status: 500 };
  }
}
