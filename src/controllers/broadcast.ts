import { uploadAudio } from 'src/utils/audioUpload';

import { broadcatModel } from 'src/lib/modals/broadcast';

export async function broadcastController(req: Request): Promise<any> {
  const formData = await req.formData();
  const containt = formData.get('containt') as string;
  const heading = formData.get('heading') as string;
  const subHead1 = formData.get('subHead1') as string;
  const subHead2 = formData.get('subHead2') as string;
  const id = formData.get('id') as string;

  const file = formData.get('file') as File | null;
  let savedImage = '';
  if (file) {
    const uploadResult = await uploadAudio(file);
    if (uploadResult.success && uploadResult.path) {
      savedImage = uploadResult.path;
    }
  }
  if (id) {
    const data = await broadcatModel.findById(id);
    const newDesign = await broadcatModel.findByIdAndUpdate(id, {
      containt: containt || data?.containt,
      heading: heading || data?.heading,
      subHead1: subHead1 || data?.subHead1,
      subHead2: subHead2 || data?.subHead2,
      audio: savedImage || data?.audio,
    });
    return newDesign;
  }

  const newDesign = await broadcatModel.create({
    containt,
    heading,
    subHead1,
    subHead2,
    audio: savedImage,
  });

  return newDesign;
}

// export async function getbrodcastController() {

//   const designs = await broadcatModel.find().sort({ createdAt: -1 });
//   return designs;
// }

export async function getbroadcastController(req: Request) {
  const designs = await broadcatModel.find().sort({ createdAt: -1 });

  // If you want full URL for frontend:
  const host = process.env.HOST || 'http://localhost:8082'; // your frontend URL or domain

  const designsWithAudioURL = designs.map((d) => ({
    ...d.toObject(),
    audio: d.audio ? `${host}/${d.audio}` : null, // gives full URL
  }));

  return designsWithAudioURL;
}
