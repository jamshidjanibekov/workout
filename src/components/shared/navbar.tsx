import {navLinks} from "@/constants";
import {Button} from "@/components/ui/button.tsx";
import {ModeToggle} from "@/components/shared/mode-toggle.tsx";
import {Link} from "react-router-dom";
import {useUserState} from "@/stores/user.store.ts";
import UserBox from "@/components/shared/user-box.tsx";

const Navbar = () => {
  const {user} = useUserState()
  console.log(user)

  return (
    <div className='w-full h-[10vh] border-b fixed inset-0 z-50 bg-background'>
      <div className='container max-w-6xl  w-full h-full flex justify-between  items-center'>
        <Link to='/'>
          <h1 className='text-2xl font-bold uppercase'>Workout</h1>
        </Link>
        <div className='flex items-center gap-3'>
          {navLinks.map(nav => (
            <a href={nav.path} key={nav.path} className='font-medium hover:underline'>{nav.label} </a>
          ))}
          <ModeToggle/>
          {user ? (
            <UserBox/>
          ):(
            <Link to='/auth'>
              <Button variant='secondary'>Join Free</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;