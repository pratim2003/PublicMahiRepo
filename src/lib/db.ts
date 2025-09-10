import mongoose from "mongoose";
const dbUri = process.env.mongoURI
if(!dbUri){
    throw new Error("mongodb uri is not present in env")
}
const db : string = `${dbUri}mahiRepo`
async function connect() : Promise<void>{
    const connectionState : number = mongoose.connection.readyState
    if(connectionState == 1){
        console.log("database already connected")
        return 
    }
    if(connectionState == 2){
        console.log("connecting ....");
        return;
    }
    try {
      if(connectionState==0){
        await mongoose.connect(db)
        console.log("mongodb connected")
      }
    } catch (error) {
        console.log(error)
        if(error instanceof Error){
            throw error
        }
        throw new Error(String(error))
    }
}

export default connect