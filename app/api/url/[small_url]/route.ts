import { NextRequest, NextResponse } from "next/server";
import { asyncHandler } from "../../../helper/asyncHandler";
import { errorResponse, successResponse } from "../../../helper/apiResponse";
import ErrorHandler from "../../../helper/errorHandler";
import { getUrl } from "../controller";

// GET - Fetch URL by small_url

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ small_url: string }> }
) {
  try {
    const { small_url } = await params;

    if (!small_url) {
      return errorResponse({
        status: 400,
        message: "Missing 'small_url' parameter",
      });
    }

    const data = await getUrl(small_url);

    if (!data) {
      return errorResponse({
        status: 404,
        message: "URL not found",
      });
    }

    const original_url = data.original_url;
    return NextResponse.redirect(original_url);
  } catch (error) {
    return errorResponse({
      status: error instanceof ErrorHandler ? error.status : 500,
      message: "Failed to fetch URL",
      errors: error,
    });
  }
}
