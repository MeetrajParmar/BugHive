import { jwtVerify } from "@/utils/jwt/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    //console.log(token);
    if (!token) {
      return NextResponse.redirect("/noAccess");
    }
    const data = await jwtVerify(token);

    const current_Date = new Date().toLocaleDateString("en-US");
    const [current_date, current_month, current_year] = current_Date.split("/");
    const [sended_date, sended_month, sended_year] = data.sended_at.split("/");
    console.log(current_date, current_month, current_year);
    console.log(sended_date, sended_month, sended_year);

    if (current_year > sended_year) {
      return NextResponse.redirect("http://localhost:3000/noAccess");
    } else if (current_year === sended_year && current_month > sended_month) {
      return NextResponse.redirect("http://localhost:3000/noAccess");
    } else if (
      current_year === sended_year &&
      current_month === sended_month &&
      current_date > sended_date
    ) {
      return NextResponse.redirect("http://localhost:3000/noAccess");
    }

    return NextResponse.json({ message: data }, { status: 200 });
  } catch (error) {
    console.log("Error in Verification:", error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
