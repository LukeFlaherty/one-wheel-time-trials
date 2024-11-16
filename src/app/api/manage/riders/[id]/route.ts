import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prismadb.rider.delete({
            where: { id: params.id }
        });

        return NextResponse.json({ message: "Rider deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting rider" }, { status: 500 });
    }
}