import { SubmiteButton } from '@/components/SubmiteButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link'
import prisma from '@/app/libs/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';



async function getData({userId, noteId}: {userId: string, noteId: string}){
    const data = await prisma.note.findUnique({
        where:{
            id: noteId,
            userId: userId
        },
        select:{
            title: true,
            description: true,
            id: true
        }
    })

    return data
}


const DynamicRoute = async({params}: {params: {id: string}}) => {

    const {getUser} = getKindeServerSession()
    const user = await getUser()
    const data = await getData({userId: user?.id as string, noteId: params.id as string})
   

    async function postData(formData: FormData){
        'use server'

        if(!user){
            throw new Error('You are not allowed')
        }

        const title = formData.get('title') as string
        const description = formData.get('description') as string

        await prisma.note.update({
            where: {
                id: data?.id,
                userId: user.id
            },
            data:{
                description: description,
                title: title
            }
        })
        revalidatePath('/dashabord')

        return redirect('/dashboard')
    }
  return (
    <Card>
      <form action={postData}>
        <CardHeader>
          <CardTitle>Edit Note</CardTitle>
          <CardDescription>You can edit your note</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="gap-y-2 flex flex-col">
            <Label>Title</Label>
            <Input type="text" required name='title' placeholder="Title for your note" defaultValue={data?.title}/>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea name='description' required placeholder='describe your note as you want' defaultValue={data?.description}/>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
        <Button asChild variant='destructive'>
            <Link href='/dashboard'>Cancel</Link>
        </Button>
        <SubmiteButton/>
        </CardFooter>
      </form>
    </Card>
  )
}

export default DynamicRoute