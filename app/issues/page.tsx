import { Badge, Button, Table } from '@radix-ui/themes';
import Link from 'next/link';
import { prisma } from '@/prisma/client';
import IssuesFilter from '../components/IssuesFilter';
import Pagination from '../components/Pagination';

type Status = 'Open' | 'In_Progress' | 'Closed' | 'All';

const page = async ({ searchParams }: { searchParams: Promise<{ page?: string; status?: Status }> }) => {
  const { status = "All", page } = await searchParams;
  
  const pageSize = 10;
  const currentPage = page ? parseInt(page as string) : 1;
  const skip = (currentPage - 1) * pageSize;

  const where = status !== "All" ? { status } : {};

  const issues = await prisma.issue.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    skip,
    take: pageSize
  });


  const totalCount = await prisma.issue.count({ where });

  return (
    <div>
      <div className='flex justify-between items-center mb-5'>
        <IssuesFilter />
        <Button variant="soft">
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
      <div className='border-2 border-zinc-400 rounded-lg'>
        <Table.Root variant="surface">
          <Table.Header className='bg-zinc-100'>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`} className='font-medium'>
                    {issue.title}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Badge color={issue.status === "Open" ? "red" : issue.status === "In_Progress" ? "violet" : "green"}>
                    {issue.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
      <div className="mt-5">
        <Pagination
          itemCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default page;
