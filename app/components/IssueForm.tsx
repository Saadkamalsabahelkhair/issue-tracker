'use client';

import Spinner from '@/app/components/Spinner';
import { schema } from '@/app/issueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Callout,
  DropdownMenu,
  TextField,
} from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';
import { Issue } from '../generated/prisma';
import axios from 'axios';

type IssueFormData = z.infer<typeof schema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: issue?.title || '',
      description: issue?.description || '',
    },
  });

  const [error, setError] = useState('');
  const [status, setStatus] = useState(issue ? issue.status : 'Open');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      const payload = { ...data, status };

      if (issue) await axios.patch('/api/issues/' + issue.id, payload);
      else await axios.post('/api/issues', payload);
      router.push('/issues');
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-4" onSubmit={onSubmit}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField.Root
              {...field}
              placeholder="Title"
              className={errors.title ? 'border-red-500' : ''}
            />
          )}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}

        <Box>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft">{status}</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item onSelect={() => setStatus('Open')}>
                Open
              </DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => setStatus('In_Progress')}>
                In Progress
              </DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => setStatus('Closed')}>
                Closed
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Box>

        <Button type="submit" disabled={isSubmitting}>
          Update Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
