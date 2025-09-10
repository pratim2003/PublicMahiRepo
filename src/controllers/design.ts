import path from "path";
import fs from "fs";
import { DesignModel } from "src/lib/modals/design";
import {uploadImage} from "src/utils/fileupload"

export async function createDesignController(req:Request) : Promise<any> {
  const formData = await req.formData()
  const containt = formData.get("containt") as string;
  const heading = formData.get("heading") as string;
  const subHead1 = (formData.get("subHead1") as string) || "";
  const subHead2 = (formData.get("subHead2") as string) || "";


  const file = formData.get("file") as File | null;
  let savedImage = "";
  if (file) {
    const uploadResult = await uploadImage(file);
    if (uploadResult.success && uploadResult.path) {
      savedImage = uploadResult.path;
    }
  }

  const newDesign = await DesignModel.create({
    containt,
    heading,
    subHead1,
    subHead2,
    image: savedImage, 
  });

  return newDesign;
}


export async function getAllDesignsController() {

  const designs = await DesignModel.find().sort({ createdAt: -1 });
  return designs;
}