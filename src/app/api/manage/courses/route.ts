import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const courses = await prismadb.course.findMany({
            orderBy: { name: 'asc' }
        });

        return NextResponse.json(courses, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching courses" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, description, distance, difficulty, location, elevation, isActive } = await request.json();

        const course = await prismadb.course.create({
            data: {
                name,
                description: description || null,
                distance: distance ? parseFloat(distance) : null,
                difficulty: difficulty || null,
                location: location || null,
                elevation: elevation ? parseInt(elevation) : null,
                isActive: isActive ?? true,
            },
        });

        return NextResponse.json(course, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating course" }, { status: 500 });
    }
}
