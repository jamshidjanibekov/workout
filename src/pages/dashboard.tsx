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
import {addDoc, collection, updateDoc, doc, deleteDoc } from "firebase/firestore";
import {db} from "@/firebase";
import {z} from "zod";
import {taskSchema} from "@/lib/validation.ts";
import {useUserState} from "@/stores/user.store.ts";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {TaskService} from "@/service/task.service.ts";
import FillLoading from "@/components/shared/fill-loading.tsx";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {ITask} from "@/types";
import {toast} from "sonner";
import {addMilliseconds, addMinutes, format} from "date-fns";

const Dashboard = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentTask, setCurrentTask] = useState<ITask | null>(null)
  const [open, setOpen] = useState(false)

  const {user} = useUserState()

  const { isPending, error, data, refetch } = useQuery({
    queryKey:['tasks-data'],
    queryFn: TaskService.getTasks
  })

    const onAdd = async ({title}:z.infer<typeof taskSchema>) =>{
    if (!user) return null
    return addDoc(collection(db, 'tasks'), {
      title,
      status:'unstarted',
      startTime:null,
      endTime:null,
      userId:user.uid,
    }).then(() => refetch())
      .finally(() => setOpen(false))
  }
  const onUpdate = async ({title}:z.infer<typeof taskSchema>) => {
    if (!user) return null
    if (!currentTask) return null
    const ref = doc(db, 'tasks', currentTask.id)
      return updateDoc(ref, {title})
        .then(() => refetch())
        .finally(() => setIsEditing(false))
  }

  const  onDelete = async (id:string) => {
    setIsEditing(false)
    const promise = deleteDoc(doc(db, 'tasks', id))
      .then(() => refetch())
      .finally(() => setIsDeleting(false))

    toast.promise(promise, {
      loading:'loading...',
      success:'Successfully deleted',
      error:'Something went wrong!'
    })
  }
  const onStartEditing = (task:ITask) => {
    setIsEditing(true)
    setCurrentTask(task)
  }

  const formatDate = (time:number) => {
    const date = addMilliseconds(new Date(0), time)
    const formattedDate = format(addMinutes(date, date.getTimezoneOffset()), 'HH:mm:ss' )

    return formattedDate

  }


  return (
    <>
      <div className='h-screen max-w-6xl mx-auto flex items-center '>
        <div className='grid lg:grid-cols-2 grid-cols-1 w-full gap-8 items-center max-md:px-6 max-md:mt-[8vh]'>
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
              {(isPending || isDeleting) && <FillLoading/>}
              {
                error &&
                <Alert variant="destructive">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {error.message}
                  </AlertDescription>
                </Alert>
              }
              { data && (
                <div className='flex flex-col space-y-3 w-full'>
                  { !isEditing && data.tasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onStartEditing={() => onStartEditing(task)}
                      onDelete={() => onDelete(task.id)}
                      refetch={refetch}
                    />
                  ))}
                  {isEditing && (
                    <TaskForm
                      handler={onUpdate}
                      title={currentTask?.title}
                      isEdit
                      onClose={() => setIsEditing(false)}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col space-y-3 w-full'>
            <div className='p-4 rounded-md bg-gradient-to-r from-blue-500 to-background relative h-24'>
              <div className='text-2xl font-bold'>Total Week</div>
              {isPending ? (
                <FillLoading/>
              ) : data && (
                <>
                  <div className='text-3xl font-bold'>{formatDate(data.weekTotal)}</div>
                </>
              )}
            </div>
            <div className='p-4 rounded-md bg-gradient-to-r from-secondary to-background relative h-24'>
              <div className='text-2xl font-bold'>Total month</div>
              {isPending ? (
                <FillLoading/>
              ) : data && (
                <>
                  <div className='text-3xl font-bold'>{formatDate(data.monthTotal)}</div>
                </>
              )}
            </div>
            <div className='p-4 rounded-md bg-gradient-to-r from-destructive to-background relative h-24'>
              <div className='text-2xl font-bold'>Total time</div>
              {isPending ? (
                <FillLoading/>
              ) : data && (
                <>
                  <div className='text-3xl font-bold'>{formatDate(data.total)}</div>
                </>
              )}
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