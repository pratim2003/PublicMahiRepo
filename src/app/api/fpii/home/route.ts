
import connect from "src/lib/db";

import {getHome,createHome} from "../../../../controllers/home.controllers"

export async function GET(){
    await connect()
    try {
        const data  = await getHome()
        if(data.status===500){
            return Response.json({
                error : data.error
            },{
                status : 500
            })
        }
        return Response.json({
            data : data.data
        },{
            status : 200
        })
    } catch (error) {
        console.error(error)
        return Response.json({
            success : false,
            message : "Error in get",
            error
        },{
            status : 500
        })
    }
}

export async function POST(req:Request){
    await connect()
    try {
        const data = await createHome(req)
        if(data.status===500){
            return Response.json({
                error : data.error
            },{
                status : 500
            })
        }
        return Response.json({
            success : true,
            message : "data created"
        },{
            status : 200
        })
    } catch (error) {
        console.error(error)
        return Response.json({
            success : false,
            message : "Error in get",
            error
        },{
            status : 500
        })
    }
}