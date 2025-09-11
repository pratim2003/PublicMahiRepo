import { NextRequest } from "next/server";
import ArticleModel from "src/lib/modals/write";
import { uploadImage } from "src/utils/fileupload";

export async function getArticle(){
    try {
        const data = await ArticleModel.find({})
        return {data,status : 200}
    } catch (error) {
        console.error(error)
        return {error,status : 500}
    }
}

export async function createArticle(req:NextRequest){
    try {
        const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const { id,...data } = await req.json();
      if(id){
        await ArticleModel.findByIdAndUpdate(id,{
            ...data
        })
        return {status : 200}
      }
      await ArticleModel.create(data);
    }

    if(contentType.includes("multipart/form-data")){
        const formData = await req.formData();

      const title = formData.get("title") as string;
      const subtitle = (formData.get("subtitle") as string) || "";
      const authors = (formData.getAll("authors") as string[]) || [];
      const tags = (formData.getAll("tags") as string[]) || [];
      const body = formData.get("body") as string;
      const id = formData.get("id") as string;

      const files = formData.getAll("files") as File[]
        const savedImages: string[] = []
        for (const file of files){
            if (file) {
                const uploadResult = await uploadImage(file);
                if (uploadResult.success && uploadResult.path) {
                  savedImages.push(uploadResult.path);
                }
            }
        }
        if(id){
            const data = await ArticleModel.findById(id).lean()
            await ArticleModel.findByIdAndUpdate(id,{
            title : title?title:data?.title,
            subtitle : subtitle?subtitle:data?.subtitle,
            authors : authors.length>0?authors:data?.authors,
            tags : tags.length>0?tags:data?.tags,
            body : body?body:data?.body,
            images : savedImages.length>0?savedImages:data?.images
        })
        return {status : 200}
        }
        await ArticleModel.create({
            title,
            subtitle,
            authors,
            tags,
            body,
            images : savedImages
        })
    }

    return {status : 200}
    } catch (error) {
        console.error(error)
        return {error,status : 500}
    }
}