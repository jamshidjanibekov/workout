import {Card} from "@/components/ui/card.tsx";
import {useAuthState} from "@/stores/auth.store.ts";
import Login from "@/components/auth/login.tsx";
import Register from "@/components/auth/register.tsx";
import Social from "@/components/auth/social.tsx";

const Auth = () => {
  const {authState} = useAuthState()
  return (
    <div className='w-full h-screen bg-gradient-to-b from-foreground to-background flex items-center justify-center px-3'>
      <Card className='p-8 lg:w-1/3 md:w-1/2 w-full  relative'>
        {authState === 'login' && <Login/>}
        {authState === 'register' && <Register/>}
        <Social/>
      </Card>
    </div>
  );
};

export default Auth;