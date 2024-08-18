import {Separator} from "@radix-ui/react-separator";
import {Button} from "@/components/ui/button.tsx";
import {FaGithub, FaGoogle} from "react-icons/fa";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {signInWithPopup} from 'firebase/auth'
import {auth} from "@/firebase";
import FillLoading from "@/components/shared/fill-loading.tsx";
import {GoogleAuthProvider} from 'firebase/auth'
import {GithubAuthProvider} from 'firebase/auth'



const Social = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const onGoogle = () => {
    setIsLoading(true)
    const googleProvider = new GoogleAuthProvider()
    signInWithPopup(auth, googleProvider).then(() => {
      navigate('/')
    }).finally(() => setIsLoading(false))
  }

  const onGithub = () => {
    setIsLoading(true)
    const githubProvider = new GithubAuthProvider()
    signInWithPopup(auth, githubProvider).then(() => {
      navigate('/')
    }).finally(() => setIsLoading(false))
  }
  return (
    <div>
      {isLoading && <FillLoading/>}
      <Separator className='my-3'/>
      <div className='grid grid-cols-2 gap-4'>
        <Button variant={'secondary'} disabled={isLoading} onClick={onGithub}>
          <FaGithub className='mr-2'/>
          <span>Sign in with Github</span>
        </Button>
        <Button variant={'destructive'} disabled={isLoading} onClick={onGoogle}>
          <FaGoogle className='mr-2'/>
          <span>Sign in with Google</span>
        </Button>
      </div>
    </div>
  );
};

export default Social;