import { SubmiteButton } from '@/components/SubmiteButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link'
const page = (params) => {

    console.log(params.id);
  return (
    <Card>
      <form action={''}>
        <CardHeader>
          <CardTitle>New Note</CardTitle>
          <CardDescription>You can create a new note</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="gap-y-2 flex flex-col">
            <Label>Title</Label>
            <Input type="text" required name='title' placeholder="Title for your note"/>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea name='description' required placeholder='describe your note as you want' />
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

export default page