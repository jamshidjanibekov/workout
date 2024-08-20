import {Button} from "@/components/ui/button.tsx";
import {BadgePlus} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import TaskItem from "@/components/shared/task-item.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import TaskForm from "@/components/forms/task-form.tsx";
import {addDoc, collection} from "firebase/firestore";
import {db} from "@/firebase";
import {z} from "zod";
import {taskSchema} from "@/lib/validation.ts";
import {useUserState} from "@/stores/user.store.ts";
import {useState} from "react";

const Dashboard = () => {
  const [open, setOpen] = useState(false)
  const {user} = useUserState()
  const onAdd = async ({title}:z.infer<typeof taskSchema>) =>{
    if (!user) return null
    return addDoc(collection(db, 'tasks'), {
      title,
      status:'unstarted',
      startTime:null,
      endTime:null,
      userId:user.uid,
    }).then(() => setOpen(false))
  }
  return (
    <>
      <div className='h-screen max-w-6xl mx-auto flex items-center '>
        <div className='grid grid-cols-2 w-full gap-8 items-center'>
          <div className='flex flex-col space-y-3'>
            <div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary'>
              <div className='text-2xl font-bold'>
                Training
              </div>
                <Button size='icon' onClick={() => setOpen(true)}>
                  <BadgePlus/>
                </Button>

            </div>
            <Separator/>
            <div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative min-h-60'>
              <div className='flex flex-col space-y-3 w-full'>
                {Array.from({length: 3}).map((_, index) => (
                  <TaskItem/>
                ))}
              </div>
            </div>
          </div>
          <div className='flex flex-col space-y-3 relative w-full'>
            <div className='p-4 rounded-md bg-gradient-to-r from-blue-500 to-background relative h-24'>
              <div className='text-2xl font-bold'>Total Week</div>
              <div className='text-3xl font-bold'>20:12:00</div>
            </div>
            <div className='p-4 rounded-md bg-gradient-to-r from-secondary to-background relative h-24'>
              <div className='text-2xl font-bold'>Total Week</div>
              <div className='text-3xl font-bold'>20:12:00</div>
            </div>
            <div className='p-4 rounded-md bg-gradient-to-r from-destructive to-background relative h-24'>
              <div className='text-2xl font-bold'>Total Week</div>
              <div className='text-3xl font-bold'>20:12:00</div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new task?</DialogTitle>
          </DialogHeader>
          <Separator/>
          <TaskForm handler={onAdd}/>
        </DialogContent>
      </Dialog>

    </>
  );
};

export default Dashboard