
import DeleteIssueButton from '@/app/components/DeleteIssueButton'
import EditIssueButton from '@/app/components/EditIssueButton'
import { prisma } from '@/prisma/client'
import { Badge, Box, Flex, Grid} from '@radix-ui/themes'
import React from 'react'
interface Params {
    params: {
        id: string;
    }
}
const page = async ({params} : Params) => {
    const { id } = await params;
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(id)
        }
    });
  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
        <div className='md:col-span-4'>
            <h1 className='text-xl font-bold'>{issue?.title}</h1>
            <div className='flex items-center gap-2'>
                <Badge color={`${issue?.status == "Open" ? "red": issue?.status == "In_Progress" ? "violet" : "green"}`}  className='my-3'>{issue?.status}</Badge>
                <p>{issue?.createdAt.toDateString()}</p>
            </div>
            <div className='mt-3 border-zinc-300 border-2 rounded-lg p-5'>
                <p>{issue?.description}</p>
            </div>
        </div>
        <Box >
            <Flex direction="column" gap="2">
                <EditIssueButton issueId={Number(issue?.id)} />
                <DeleteIssueButton issue={Number(issue?.id)}/>
            </Flex>
        </Box>
    </Grid>
  )
}

export default page