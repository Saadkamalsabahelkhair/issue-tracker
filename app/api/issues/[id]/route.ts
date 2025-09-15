
import { patchIssueSchema } from "@/app/validationSchemas";
import {prisma} from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);
    
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const issueId = parseInt(params.id);

    const updatedIssue = await prisma.issue.update({
        where: { id: issueId },
        data: {
            title: body.title,
            description: body.description,
            status: body.status,
        },
    });

    return NextResponse.json(updatedIssue, { status: 200 });

}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const issueId = parseInt(params.id);
    const existingIssue = await prisma.issue.findUnique({ where: { id: issueId } });

    if (!existingIssue) {
        return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    await prisma.issue.delete({ where: { id: issueId } });

    return NextResponse.json({ message: "Issue deleted successfully" }, { status: 200 });
}