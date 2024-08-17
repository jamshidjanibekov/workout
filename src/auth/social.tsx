import {Separator} from "@radix-ui/react-separator";
import {Button} from "@/components/ui/button.tsx";
import {FaGithub, FaGoogle} from "react-icons/fa";

const Social = () => {
  return (
    <div>
      <Separator className='my-3'/>
      <div className='grid grid-cols-2 gap-4'>
        <Button variant={'secondary'}>
          <FaGithub className='mr-2'/>
          <span>Sign in with Github</span>
        </Button>
        <Button variant={'destructive'}>
          <FaGoogle className='mr-2'/>
          <span>Sign in with Google</span>
        </Button>
      </div>
    </div>
  );
};

export default Social;