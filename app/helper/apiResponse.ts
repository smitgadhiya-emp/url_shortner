import { NextResponse } from "next/server";

interface SuccessResponseOptions {
  data?: any;
  message?: string;
  status?: number;
}

interface ErrorResponseOptions {
  message: string;
  status: number;
  errors?: any;
}

export const successResponse = ({
  data,
  message = "Success",
  status = 200,
}: SuccessResponseOptions) => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
};

export const errorResponse = ({
  message,
  status = 500,
  errors,
}: ErrorResponseOptions) => {
  return NextResponse.json(
    {
      success: false,
      message,
      ...(errors && { errors }),
    },
    { status }
  );
};
