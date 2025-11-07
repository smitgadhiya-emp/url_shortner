import { supabase } from "../../lib/supabaseClient";
import ErrorHandler from "../../helper/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";


export const getUrl = async (small_url: string) => {

   

    if (!small_url) {
        throw new ErrorHandler(400, "Missing 'small_url' parameter");
    }

    const { data, error } = await supabase
        .from("urls")
        .select("original_url")
        .eq("small_url", small_url)
        .single();

    if (error) {
        throw new ErrorHandler(500, `Failed to fetch URL: ${error.message}`);
    }

    if (!data) {
        throw new ErrorHandler(404, "URL not found");
    }


    return data;
}
   


export const createUrl = async (request: NextRequest) => {
    const { originalUrl } = await request.json();


    if (!originalUrl) {
        throw new ErrorHandler(400, "Missing 'original_url' parameter");
    }

    const smallUrl = nanoid(6);

    const { data, error } = await supabase
        .from("urls")
        .insert({ original_url: originalUrl, small_url: smallUrl })
        .select("small_url")
        .single();


        if (error) {
            
            throw new ErrorHandler(500, `Failed to create URL: ${error.message}`);
        }
        console.log(data);
        

        return data;
}