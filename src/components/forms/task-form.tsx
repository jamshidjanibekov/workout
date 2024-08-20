import {useForm} from "react-hook-form";
import {z} from "zod";
import {taskSchema} from "@/lib/validation.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem,  FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {useUserState} from "@/stores/user.store.ts";
import {toast} from "sonner";
import FillLoading from "@/components/shared/fill-loading.tsx";

interface Props{
  title?:string,
  isEdit?:boolean,
  onClose?:() => void,
  handler:(values:z.infer<typeof  taskSchema>) => Promise<void>
}

const TaskForm = ({ title ='', handler, isEdit, onClose}: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const {user} = useUserState()

  const form = useForm<z.infer<taskSchema>>({
    resolver:zodResolver(taskSchema),
    defaultValues:{title},
  })
  const onSubmit = async (values:z.infer<typeof taskSchema>)=>{
    if (!user) return null
    setIsLoading(true)

    const promise =  handler(values).finally(() => setIsLoading(false))

    toast.promise(promise,{
      loading: 'Loading...',
      success: 'Success!',
      error: 'Something went wrong!'
    })
  }
  return  <>
    {isLoading && <FillLoading/>}
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter a task" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className='flex justify-end gap-2'>
          {isEdit && (
          <Button type={'button'} disabled={isLoading} variant={'destructive'} onClick={onClose}>Cancel</Button>
          )}
          <Button type={'submit'} disabled={isLoading}>Submit</Button>
        </div>
      </form>
    </Form>
  </>
};

export default TaskForm;