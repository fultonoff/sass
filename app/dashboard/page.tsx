import { Button } from '@/components/ui/button';
import Link from 'next/link';
import prisma from '../libs/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { File } from 'lucide-react';



async function getData(userId: string){
  const data = await prisma.note.findMany({
    where:{
      userId: userId
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  return data
}
const Dashboard = async() => {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  const data = await getData(user?.id as string);


  return <div className="grid items-start gap-y-8">
    <div className='flex items-center justify-between px-2'>
      <div className='grid gap-1'>
        <h1 className='text-3xl md:text-4xl' >Your notes</h1>
        <p className='text-lg text-muted-foreground'>Here you can see and create notes</p>
      </div>
      <Button asChild>
      <Link href='/dashboard/new'>Create a new note</Link>
      </Button>
    </div>
    {data.length < 1 ? (
      <div className='flex flex-col min-h-[400px] items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50'>
        <div className='flex h-20 w-20 items-center justify-center rounded-full bg-primary/10'>
          <File className='w-10 h-10 text-primary'/>
        </div>
        <h2 className='mt-6 text-xl font-semibold'>No Notes Yet.</h2>
        <p className='mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground'>You currently do not have any notes. Please create some</p>
      </div>

    ): (

      <div></div>
    )}
  </div>
}

export default Dashboard