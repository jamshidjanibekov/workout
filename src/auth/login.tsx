import {useAuthState} from "@/stores/auth.store.ts";
import {Input} from "@/components/ui/input.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";

const Login = () => {
  const {setAuth} = useAuthState()
  return (
    <div className='flex flex-col'>
      <h2 className='text-xl font-bold'>Login</h2>
      <p className='text-foreground'>
        Don't have an account {' '}
        <span className='text-blue-500 hover:underline cursor-pointer' onClick={() => setAuth('register')}>
          Sign up
        </span>
      </p>
      <Separator className='my-3'/>
      <div>
        <span>Email</span>
        <Input placeholder='example@gmail.com'/>
      </div>
      <div className='mt-2'>
        <span>Password</span>
        <Input placeholder='*****' type='password'/>
      </div>
      <Button className='w-full h-10 mt-2'>Login</Button>
    </div>
  );
};

export default Login;