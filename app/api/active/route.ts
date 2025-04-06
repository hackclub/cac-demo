import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { wrap } from "@/utils/sort";

const prisma = new PrismaClient();

export async function GET(request: NextRequest){
    const slide = Number(request.nextUrl.searchParams.get("slide"))
    if (!slide){
        const activeSlide = await prisma.slide.findFirst({
            where: {
                current: true
            }
        })
        return NextResponse.json(activeSlide)
    } else {
        const queriedSlide = await prisma.slide.findFirst({
            where: {
                id: slide!
            }
        })
        return NextResponse.json(queriedSlide)
    }
}

export async function POST(request: NextRequest){
    const totalSlides = (await prisma.slide.findMany()).length

    const activeSlide = await prisma.slide.findFirst({
        where: {
            current: true
        }, 
        select: {
            id: true
        }
        })
    console.log(wrap(activeSlide!.id, totalSlides), "is wrapped slide")
    const deactivateSlide = await prisma.slide.update({
        where: {
            id: activeSlide!.id
        },
        data: {
            current: false
        }
    })

    //try { 
        const activateNext = await prisma.slide.update({
        where: {
            id: wrap(activeSlide!.id, totalSlides)
        },
        data: {
            current: true
        }
        }) 
    //} catch { 
    //    const activateFirst = await prisma.slide.update({
    //        where: {
    //            id: 1
    //        },
    //        data: { 
    //            current: true
    //        }
    //    })
    //}
    return NextResponse.json(activeSlide)
}