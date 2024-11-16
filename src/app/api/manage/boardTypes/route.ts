import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const boardTypes = await prismadb.boardType.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return NextResponse.json(boardTypes);
    } catch (error) {
        console.log("[BOARD_TYPES_GET]", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const boardType = await prismadb.boardType.create({
            data: {
                name: body.name,
                description: body.description || null,
            }
        });

        return NextResponse.json(boardType);
    } catch (error) {
        console.log("[BOARD_TYPES_POST]", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}