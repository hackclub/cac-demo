import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest){
    const length = (await prisma.slide.findMany())
    console.log(length)
    console.log(length.length)
    return NextResponse.json({count: length})
}   