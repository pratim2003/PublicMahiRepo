import homeModel from "src/lib/modals/home";
import { uploadImage } from "src/utils/fileupload";


export async function getHome() : Promise<any>{
    try {
        const data = await homeModel.find()
        return {data,status : 200}
    } catch (error:any) {
        console.error(error)
        return {error,status : 500}
    }
}


export async function createHome(req:Request) : Promise<any>{
    try {
         const contentType = req.headers.get("content-type") || "";

        if (contentType.includes("application/json")){
            const {...data} = await req.json()
            await homeModel.create(data)
        }

        if (contentType.includes("multipart/form-data")){
            const formData = await req.formData();
            const heading = formData.get("heading") as string;
            const body = formData.get("body") as string

            const file = formData.get("file") as File | null;
              let savedImage = "";
              if (file) {
                const uploadResult = await uploadImage(file);
                if (uploadResult.success && uploadResult.path) {
                  savedImage = uploadResult.path;
                }
            }
            await homeModel.create({
                heading,
                body,
                image : savedImage
            })
        }
        return {status : 200}
    } catch (error) {
        console.error(error)
        return {error,status : 500}
    }
}