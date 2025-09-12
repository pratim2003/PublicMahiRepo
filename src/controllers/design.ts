import { uploadImage } from 'src/utils/fileupload';

import { DesignModel } from 'src/lib/modals/design';

export async function createDesignController(req: Request): Promise<any> {
  const formData = await req.formData();
  const containt = formData.get('containt') as string;
  const heading = formData.get('heading') as string;
  const subHead1 = (formData.get('subHead1') as string) || '';
  const subHead2 = (formData.get('subHead2') as string) || '';
  const id = formData.get('id') as string;

  const files = formData.getAll('files') as File[];
  const uploadResults = await Promise.all(files.map((file) => (file ? uploadImage(file) : null)));
  const savedImages: string[] = uploadResults.flatMap((res) =>
    res && res.success && res.path ? [res.path] : []
  );
  if (id) {
    const data = await DesignModel.findById(id);
    await DesignModel.findByIdAndUpdate(id, {
      containt: containt || data?.containt,
      heading: heading || data?.heading,
      subHead1: subHead1 || data?.subHead1,
      subHead2: subHead2 || data?.subHead2,
      images: savedImages.length > 0 ? savedImages : data?.images,
    });
  }
  const newDesign = await DesignModel.create({
    containt,
    heading,
    subHead1,
    subHead2,
    images: savedImages,
  });

  return newDesign;
}

export async function getAllDesignsController() {
  const designs = await DesignModel.find().sort({ createdAt: -1 });
  return designs;
}
