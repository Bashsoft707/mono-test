import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "./models/user";

interface IDecoded {
  id: string;
}

const isAccountRoute = (pathname: string) =>
  pathname.startsWith("/api/accounts");

export async function middleware(req: NextRequest) {
  let token;
  const {pathname} = req.nextUrl

    const l = req.headers.get("authorization");

    console.log('llllllllllllll', l)

    console.log('pathname', pathname)

    if (!isAccountRoute(pathname)) {
        return new NextResponse(
            JSON.stringify({ success: false, message: "authentication failed" }),
            { status: 401 }
        );
    }

  if (
    req.headers.get("authorization") &&
    req.headers.get("authorization")?.startsWith("Bearer")
  ) {
    token = req.headers.get("authorization")?.split(" ")[1];
  }

  if (!token) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "authentication failed" }),
      { status: 401 }
    );
  }

  try {
    const decoded = <IDecoded>(
      jwt.verify(token, process.env.JWT_SECRET as string)
    );
    (req as any).user = await User.findById(decoded.id);

    return NextResponse.next();
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "authentication failed" }),
      { status: 401 }
    );
  }
} 

export const config = {
  matcher: ['/api/usejrs', "/api/accoumnhnts/:path*"],
};
