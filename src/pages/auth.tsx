import {Card} from "@/components/ui/card.tsx";
import {useAuthState} from "@/stores/auth.store.ts";
import Login from "@/auth/login.tsx";
import Register from "@/auth/register.tsx";
import Social from "@/auth/social.tsx";

const Auth = () => {
  const {authState} = useAuthState()
  return (
    <div className='w-full h-screen bg-gradient-to-b from-foreground to-background flex items-center justify-center'>
      <Card className='p-8 w-1/3'>
        {authState === 'login' && <Login/>}
        {authState === 'register' && <Register/>}
        <Social/>
      </Card>
    </div>
  );
};

export default Auth;