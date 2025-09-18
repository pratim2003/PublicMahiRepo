"use server";

import contactusModel from "src/lib/modals/contactUs"
import connect from "src/lib/db"

async function contact(data:any) {
    await connect()
    try {
        await contactusModel.create({...data})
        return {ok:true}
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export default contact