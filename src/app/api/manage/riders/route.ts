import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const riders = await prismadb.rider.findMany({
            orderBy: { name: 'asc' }
        });

        return NextResponse.json(riders, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching riders" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, email, experienceLevel } = await request.json();

        const rider = await prismadb.rider.create({
            data: {
                name,
                email: email || null,
                experienceLevel: experienceLevel || null,
            },
        });

        return NextResponse.json(rider, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating rider" }, { status: 500 });
    }
}