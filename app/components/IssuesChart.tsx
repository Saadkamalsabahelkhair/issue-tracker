"use client";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Box } from '@radix-ui/themes';

interface Props {
    Open: number;
    InProgress: number;
    Closed: number;
}
const IssuesChart = ({Open ,InProgress ,Closed}:Props) => {
    const data = [
        {label:"Open" , value : Open},
        {label:"In-Progress" , value : InProgress},
        {label:"Closed" , value : Closed},
    ]
  return (
    <Box className='w-full h-full border-2 border-zinc-400 rounded-lg p-4 mt-5'>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <XAxis dataKey="label" />
                <YAxis />
                <Bar
                    dataKey="value" 
                    barSize={60}
                    style={{ fill:"#0090ff" }} 
                />
            </BarChart>
        </ResponsiveContainer>
    </Box>
  )
}

export default IssuesChart