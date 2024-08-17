import {useAuthState} from "@/stores/auth.store.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

const Register = () => {
  const {setAuth} = useAuthState()
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
      <div>
        <span>Email</span>
        <Input placeholder='example@gmail.com'/>
      </div>
      <div className='grid grid-cols-2 gap-2 mt-2'>
        <div>
          <span>Password</span>
          <Input placeholder='*****' type='password'/>
        </div>
        <div>
          <span>Confirm password</span>
          <Input placeholder='*****' type='password'/>
        </div>
      </div>
      <Button className='w-full h-10 mt-2'>Register</Button>
    </div>
  );
};

export default Register;