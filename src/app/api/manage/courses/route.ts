import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const courses = await prismadb.course.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return NextResponse.json(courses);
    } catch (error) {
        console.log("[COURSES_GET]", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const course = await prismadb.course.create({
            data: {
                name: body.name,
                description: body.description || null,
                distance: body.distance ? parseFloat(body.distance) : null,
                difficulty: body.difficulty || null,
                location: body.location || null,
                elevation: body.elevation ? parseInt(body.elevation) : null,
                isActive: body.isActive ?? true,
            }
        });

        return NextResponse.json(course);
    } catch (error) {
        console.log("[COURSES_POST]", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}