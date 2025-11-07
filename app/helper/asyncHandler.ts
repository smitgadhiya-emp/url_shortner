import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "./apiResponse";
import ErrorHandler from "./errorHandler";

type ApiHandler = (
  request: NextRequest
) => Promise<NextResponse | Response>;

export const asyncHandler =
  (functionName = "unknown_function", theFunction: ApiHandler) =>
  async (request: NextRequest): Promise<NextResponse> => {
    try {
      const response = await theFunction(request);
      return response instanceof NextResponse
        ? response
        : NextResponse.json(response);
    } catch (error) {
      console.error(`❌ [ERROR] in ${functionName}:`, error);

      // If it's your custom ErrorHandler, use its status
      if (error instanceof ErrorHandler) {
        return errorResponse({
          status: error.status,
          message: error.message,
        });
      }

      // If it's a standard Error, return 500
      if (error instanceof Error) {
        return errorResponse({
          status: 500,
          message: error.message || "Internal Server Error",
        });
      }

      // Totally unknown shape
      return errorResponse({
        status: 500,
        message: "Internal Server Error",
      });
    }
  };
