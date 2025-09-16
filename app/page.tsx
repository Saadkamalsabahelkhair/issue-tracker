export const dynamic = "force-dynamic";

import { Badge, Box } from "@radix-ui/themes";
import IssuesChart from "./components/IssuesChart";
import { prisma } from "@/prisma/client"

;
import Link from "next/link";

export default async function Home() {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  const open = await prisma.issue.count({
    where:{status:"Open"}
  });
  const inProgress = await prisma.issue.count({
    where: { status: 'In_Progress' },
  });
  const closed = await prisma.issue.count({
    where: { status: 'Closed' },
  });
  return (
    <div className="flex items-center justify-center md:gap-5 gap-y-40 h-full w-full flex-wrap md:flex-nowrap ">
      <div className="md:w-1/2 sm:w-full h-130">
        <div className="flex gap-4">
          <Box className="flex flex-col gap-4 items-center border-zinc-400 border-2 p-4 rounded-lg">
            <h3>Open Issues</h3>
            <strong>{open}</strong>
          </Box>
          <Box className="flex flex-col gap-4 border-zinc-400 border-2 p-4 rounded-lg">
            <h3>In-Progress Issues</h3>
            <strong>{inProgress}</strong>
          </Box>
          <Box className="flex flex-col gap-4 border-zinc-400 border-2 p-4 rounded-lg">
            <h3>Closed Issues</h3>
            <strong>{closed}</strong>
          </Box>
        </div>
        <IssuesChart
          Open={open}
          InProgress={inProgress}
          Closed={closed}
        />
      </div>
      <div className="border-zinc-400 border-2 mb-5 md:mb-0 w-full md:w-1/2 : rounded-lg p-3 h-130">
        <h2 className="text-xl font-semibold">Latest Issues</h2>
        {issues.map((issue , index) => (
          <Box className="mt-5" key={issue.id}>
            <p className="text-zinc-500"><Link href={`/issues/${issue.id}`}>{issue.title}</Link></p>
            <Badge color={`${issue.status == "Open" ? "red" : issue.status == "In_Progress" ? "violet" : "green"}`} className="my-3">{issue.status}</Badge>
             {index < issues.length - 1 && (
              <div className="w-full h-0.5 bg-zinc-300" />
            )}
        </Box>
        ))}
      </div>
    </div>
  )
}
