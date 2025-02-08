import { NextResponse } from "next/server";
import {jwtVerify} from "jose";

export async function middleware(request){
  // console.log("ミドルウェア");
  // const token = await request.headers.get("Authorization")?.split("")[1];
  // const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5mZEBnbWFpbC5jb20iLCJleHAiOjE3Mzc5NTczNzZ9.kNU7rVtWS0iq_FquKevjwk-ObLWbFjp5_dO0gQ17-SA";
  const token = await request.headers.get("Authorization")?.split(" ")[1];

  if(!token){
    return NextResponse.json({message:"トークンがありません"});
  }

  try{
    const secretKey = new TextEncoder().encode("next-market-app-book");
    const decodedJwt = await jwtVerify(token, secretKey);
    // console.log("decodedJwt:", decodedJwt);
    return NextResponse.next();
  }catch{
    return NextResponse.json({message:"トークンが正しくないので、ログインしてください"})
  }
}

export const config = {
  // ミドルウェアを適用させたいファイルを書く
  matcher: ["/api/item/create","/api/item/update/:path*","/api/item/delete/:path*"],
}