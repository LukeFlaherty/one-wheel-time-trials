import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prismadb.course.delete({
            where: {
                id: params.id
            }
        });

        return NextResponse.json({ message: "Course deleted" });
    } catch (error) {
        console.log("[COURSE_DELETE]", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}