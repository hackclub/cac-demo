import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest){
    const getContent = request.nextUrl.searchParams.get("content")
    const slide = request.nextUrl.searchParams.get("slide")
    if (getContent && slide){
        const slideContent = await prisma.slide.findFirst({
            where: {
                id: Number(slide)
            },
            select: {
                content: true
            }
        })
        return NextResponse.json(slideContent)
    } else { 
        const length = (await prisma.slide.findMany()).length
        return NextResponse.json({count: length})
    
    }
}   