"use client";
import { TextField ,Button , Callout, Text } from '@radix-ui/themes'
import { useForm , Controller} from 'react-hook-form';
import axios from 'axios';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '@/app/issueSchema';
import Spinner from '@/app/components/Spinner';



interface IssueForm {
    title:string;
    description:string;

}
const page = () => {
    const {register, control , handleSubmit , formState : { errors }} = useForm<IssueForm>({
        resolver:zodResolver(schema)
    });
    const router = useRouter();
    const [error , setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <form className='max-w-xl space-y-4' onSubmit={handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
        } catch (error) {
            setIsSubmitting(false);
            setError("Failed to create issue. Please try again.");
        }
        })}>
        

        {error && (<Callout.Root color="red"><Callout.Text>{error}</Callout.Text></Callout.Root>)}
        <TextField.Root placeholder='Title' {...register("title")} className=' font-medium text-[16px}'/>
        {errors.title && <Text as='p' color='red'>{errors.title.message}</Text>}
        <Controller
            name="description"
            control={control}
            render={({ field }) => <SimpleMDE placeholder='Description'{...field} />}
            />
        {errors.description && <Text as='p' color='red'>{errors.description.message}</Text>}
        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
    </form>
  )
}

export default page