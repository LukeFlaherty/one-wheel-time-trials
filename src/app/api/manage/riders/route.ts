// src/app/api/manage/riders/route.ts
import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const riders = await prismadb.rider.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return NextResponse.json(riders);
    } catch (error) {
        console.log("[RIDERS_GET]", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const rider = await prismadb.rider.create({
            data: {
                name: body.name,
                email: body.email || null,
                experienceLevel: body.experienceLevel || null,
            }
        });

        return NextResponse.json(rider);
    } catch (error) {
        console.log("[RIDERS_POST]", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}