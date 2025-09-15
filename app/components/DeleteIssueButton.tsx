'use client';
import { useRouter } from 'next/navigation';
import { AlertDialog, Button, Flex} from '@radix-ui/themes';
import axios from 'axios';
import { useState } from 'react';
import Spinner from '@/app/components/Spinner';
import React from 'react'



const DeleteIssueButton = ({issue} : {issue:Number}) => {
  const router = useRouter();
  if (!issue) return null; // Ensure issue is defined before proceeding


    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(false);
    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await axios.delete('/api/issues/' + issue);
            router.push('/issues');
            router.refresh();
        } catch (err) {
            setError(true);
        } finally {
            setIsDeleting(false);
        }
    };
  return (
    <>
        <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="3" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" className='w-20' onClick={handleDelete} disabled={isDeleting}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted.
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton