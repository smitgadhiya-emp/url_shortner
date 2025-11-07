import { NextRequest, NextResponse } from "next/server";
import { createUrl } from "../controller";
import { errorResponse, successResponse } from "../../../helper/apiResponse";


export async function POST(request: NextRequest) {
    try {
       const data = await createUrl(request);
       return successResponse({
        data,
        message: "URL created successfully",
       })
    } catch (error) {
        return errorResponse({
            status: 500,
            message: "Failed to create URL",
            errors: error,
        })
    }
    
}