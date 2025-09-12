import type { NextRequest } from 'next/server';

import { uploadImage } from 'src/utils/fileupload';

import photoModel from 'src/lib/modals/photoJounalism';

export async function getPhoto() {
  try {
    const data = await photoModel.find({});
    return { data, status: 200 };
  } catch (error) {
    console.error(error);
    return { error, status: 500 };
  }
}

export async function CreatePhoto(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const { id, ...data } = await req.json();
      if (id) {
        await photoModel.findByIdAndUpdate(id, {
          ...data,
        });
        return { status: 200 };
      }
      await photoModel.create(data);
    }

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();

      const content = formData.get('content') as string;
      const heading = (formData.get('heading') as string) || '';
      const id = formData.get('id') as string;

      const file = formData.get('file') as File;
      let savedImage = '';
      if (file) {
        const uploadResult = await uploadImage(file);
        if (uploadResult.success && uploadResult.path) {
          savedImage = uploadResult.path;
        }
      }
      if (id) {
        const data = await photoModel.findById(id).lean();
        await photoModel.findByIdAndUpdate(id, {
          heading: heading || data?.heading,
          content: content || data?.content,
          image: savedImage || data?.image,
        });
        return { status: 200 };
      }
      await photoModel.create({
        heading,
        content,
        image: savedImage,
      });
    }

    return { status: 200 };
  } catch (error) {
    console.error(error);
    return { error, status: 500 };
  }
}
