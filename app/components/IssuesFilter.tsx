'use client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const statuses: { label: string; value: string }[] = [
  { label: 'All', value: 'all' }, // ✅ give it a non-empty value
  { label: 'Open', value: 'Open' },
  { label: 'In Progress', value: 'In_Progress' },
  { label: 'Closed', value: 'Closed' },
];

const IssuesFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get('status') || 'all'; // use 'all' as fallback

  return (
    <Select.Root
      defaultValue={currentStatus}
      onValueChange={(status) => {
        const params = new URLSearchParams();

        // Only add status if it's not "all"
        if (status !== 'all') {
          params.append('status', status);
        }

        if (searchParams.get('orderBy')) {
          params.append('orderBy', searchParams.get('orderBy')!);
        }

        const query = params.size ? '?' + params.toString() : '';
        router.push('/issues/' + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status, index) => (
          <Select.Item key={index} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssuesFilter;
