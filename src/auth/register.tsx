import {useAuthState} from "@/stores/auth.store.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import { registerSchema} from "@/lib/validation.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";

const Register = () => {
  const {setAuth} = useAuthState()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {email: '', password: ''},
  })

  const onSubmit = async (values:z.infer<typeof registerSchema>)=>{
    const {email, password} = values
  }

  return (
    <div className='flex flex-col'>
      <h2 className='text-xl font-bold'>Register</h2>
      <p className='text-foreground'>
        Already have an account{' '}
        <span className='text-blue-500 hover:underline cursor-pointer' onClick={() => setAuth('login')}>
          Sign in
        </span>
      </p>
      <Separator className='my-3'/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-2 gap-2'>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="******" type={'password'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="******" type={'password'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button type="submit" className='w-full h-10 mt-2'>Create account</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Register;