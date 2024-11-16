import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prismadb.boardType.delete({
            where: { id: params.id }
        });

        return NextResponse.json({ message: "Board type deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting board type" }, { status: 500 });
    }
}