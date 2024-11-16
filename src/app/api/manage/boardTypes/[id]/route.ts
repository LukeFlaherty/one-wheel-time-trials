import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prismadb.boardType.delete({
            where: {
                id: params.id
            }
        });

        return NextResponse.json({ message: "Board type deleted" });
    } catch (error) {
        console.log("[BOARD_TYPE_DELETE]", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}