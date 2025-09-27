import { uploadImage } from 'src/utils/fileupload';

import ArticleModel from 'src/lib/modals/write';

export async function getArticle() {
  try {
    const data = await ArticleModel.find({});
    return { data, status: 200 };
  } catch (error) {
    console.error(error);
    return { error, status: 500 };
  }
}

// export async function createArticle(req: NextRequest) {
//   try {
//     const contentType = req.headers.get('content-type') || '';

//     if (contentType.includes('application/json')) {
//       const { id, ...data } = await req.json();
//       if (id) {
//         await ArticleModel.findByIdAndUpdate(id, {
//           ...data,
//         });
//         return { status: 200 };
//       }
//       await ArticleModel.create(data);
//     }

//     if (contentType.includes('multipart/form-data')) {
//       const formData = await req.formData();

//       const title = formData.get('title') as string;
//       const subtitle = (formData.get('subtitle') as string) || '';
//       const authors = (formData.getAll('authors') as string[]) || [];
//       const tags = (formData.getAll('tags') as string[]) || [];
//       const body = formData.get('body') as string;
//       const id = formData.get('id') as string;

//       const files = formData.getAll('files') as File[];
//       // let savedImages: string[] = []
//       // for (const file of files){
//       //     if (file) {
//       //         const uploadResult = await uploadImage(file);
//       //         if (uploadResult.success && uploadResult.path) {
//       //           savedImages.push(uploadResult.path);
//       //         }
//       //     }
//       // }
//       const uploadResults = await Promise.all(
//         files.map((file) => (file ? uploadImage(file) : null))
//       );
//       const savedImages: string[] = uploadResults.flatMap((res) =>
//         res && res.success && res.path ? [res.path] : []
//       );
//       if (id) {
//         const data = await ArticleModel.findById(id).lean();
//         await ArticleModel.findByIdAndUpdate(id, {
//           title: title || data?.title,
//           subtitle: subtitle || data?.subtitle,
//           authors: authors.length > 0 ? authors : data?.authors,
//           tags: tags.length > 0 ? tags : data?.tags,
//           body: body || data?.body,
//           images: savedImages.length > 0 ? savedImages : data?.images,
//         });
//         return { status: 200 };
//       }
//       await ArticleModel.create({
//         title,
//         subtitle,
//         authors,
//         tags,
//         body,
//         images: savedImages,
//       });
//     }

//     return { status: 200 };
//   } catch (error) {
//     console.error(error);
//     return { error, status: 500 };
//   }
// }

// export async function createArticle(req: Request): Promise<any> {
//   try {
//     const contentType = req.headers.get('content-type') || '';
//     let data: any = {};

//     if (contentType.includes('application/json')) {
//       data = await req.json();
//     } else if (contentType.includes('multipart/form-data')) {
//       const formData = await req.formData();
//       data.title = formData.get('title') as string;
//       data.subtitle = (formData.get('subtitle') as string) || '';
//       data.authors = (formData.getAll('authors') as string[]) || [];
//       data.tags = (formData.getAll('tags') as string[]) || [];
//       data.body = formData.get('body') as string;

//       const files = formData.getAll('files') as File[];
//       if (files.length > 0) {
//         const uploadResults = await Promise.all(
//           files.map((file) => (file ? uploadImage(file) : null))
//         );
//         const savedImages: string[] = uploadResults.flatMap((res) =>
//           res && res.success && res.path ? [res.path] : []
//         );
//         if (savedImages.length > 0) data.images = savedImages;
//       }
//     } else {
//       return { error: 'Unsupported content type', status: 400 };
//     }

//     // Find the existing article
//     let articleDoc = await ArticleModel.findOne();

//     if (articleDoc) {
//       // Update only provided fields
//       articleDoc.title = data.title ?? articleDoc.title;
//       articleDoc.subtitle = data.subtitle ?? articleDoc.subtitle;
//       articleDoc.authors = data.authors?.length > 0 ? data.authors : articleDoc.authors;
//       articleDoc.tags = data.tags?.length > 0 ? data.tags : articleDoc.tags;
//       articleDoc.body = data.body ?? articleDoc.body;
//       articleDoc.images = data.images?.length > 0 ? data.images : articleDoc.images;

//       await articleDoc.save();
//       return { status: 200, data: articleDoc };
//     } else {
//       // Create new if not exists
//       articleDoc = await ArticleModel.create(data);
//       return { status: 200, data: articleDoc };
//     }
//   } catch (error) {
//     console.error(error);
//     return { error, status: 500 };
//   }
// }

export async function createArticle(req: Request): Promise<any> {
  try {
    const contentType = req.headers.get('content-type') || '';
    const data: any = {}; // define once

    if (contentType.includes('application/json')) {
      const { id, ...bodyData } = await req.json();
      if (id) {
        await ArticleModel.findByIdAndUpdate(id, bodyData);
        return { status: 200 };
      }
      await ArticleModel.create(bodyData);
      return { status: 200 };
    }

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();

      data.title = formData.get('title') as string;
      data.subtitle = (formData.get('subtitle') as string) || '';
      data.authors = (formData.getAll('authors') as string[]) || [];
      data.tags = (formData.getAll('tags') as string[]) || [];
      data.body = formData.get('body') as string;
      data.publishedAt = formData.get('publishedAt')
        ? new Date(formData.get('publishedAt') as string)
        : undefined;

      // ---- New files uploaded ----
      const files = formData.getAll('files') as File[];
      if (files && files.length > 0) {
        const uploadResults = await Promise.all(
          files.map((file) => (file ? uploadImage(file) : null))
        );

        const newImages: string[] = uploadResults.flatMap((res) =>
          res && res.success && res.path ? [res.path] : []
        );

        data.newImages = newImages;
      }
    } else {
      return { error: 'Unsupported content type', status: 400 };
    }

    // ---- Upsert ----
    const articleDoc = await ArticleModel.findOne();

    if (articleDoc) {
      if (data.title) articleDoc.title = data.title;
      if (data.subtitle) articleDoc.subtitle = data.subtitle;
      if (data.authors?.length) articleDoc.authors = data.authors;
      if (data.tags?.length) articleDoc.tags = data.tags;
      if (data.body) articleDoc.body = data.body;
      if (data.publishedAt) articleDoc.publishedAt = data.publishedAt;

      // Ensure images array exists
      if (!articleDoc.images) articleDoc.images = [];

      // Replace old images if new ones are uploaded
      if (data.newImages && data.newImages.length > 0) {
        articleDoc.images = [...data.newImages, ...articleDoc.images.slice(data.newImages.length)];
      }

      await articleDoc.save();
      return { status: 200, data: articleDoc };
    }

    // ---- Create new (no need for else) ----
    const newImages = [...(data.newImages || [])];
    data.images = newImages;
    delete data.newImages;

    const newDoc = await ArticleModel.create(data);
    return { status: 200, data: newDoc };
  } catch (error) {
    console.error('createArticle error:', error);
    return { error: 'Server Error', status: 500 };
  }
}
