import {useAuthState} from "@/stores/auth.store.ts";
import {Input} from "@/components/ui/input.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {loginSchema} from "@/lib/validation.ts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx";
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useState} from "react";
import {auth} from "@/firebase";
import {useNavigate} from "react-router-dom";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
import FillLoading from "@/components/shared/fill-loading.tsx";
import {useUserState} from "@/stores/user.store.ts";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const {setAuth} = useAuthState()
  const {setUser} = useUserState()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {email: '', password: ''},
  })
  const onSubmit = async (values:z.infer<typeof loginSchema>)=>{
    const {email, password} = values
    setIsLoading(true)
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      setUser(res.user)
      navigate('/')
    }catch (error){
      const result = error as Error
      setError(result.message )
    }finally {
      setIsLoading(false)
    }
  }
  return (
    <div className='flex flex-col'>
      {isLoading && <FillLoading/>}
      <h2 className='text-xl font-bold'>Login</h2>
      <p className='text-foreground'>
        Don't have an account {' '}
        <span className='text-blue-500 hover:underline cursor-pointer' onClick={() => setAuth('register')}>
          Sign up
        </span>
      </p>
      <Separator className='my-3'/>
      {error && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="******"
                    type={'password'}
                    disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit" className='w-full h-10 mt-2'>Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;