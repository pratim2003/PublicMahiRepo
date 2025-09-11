import mongoose,{Schema,model,models,Document} from "mongoose";

interface contactus extends Document{
    firstname : string,
    lastname : string,
    message : string,
    email : string
}

const contactusSchema : Schema<contactus> = new Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    }
}) 

const contactusModel = models.contactus as mongoose.Model<contactus> || model<contactus>("contactus",contactusSchema)

export default contactusModel