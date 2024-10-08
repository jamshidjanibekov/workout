import {useUserState} from "@/stores/user.store.ts";
import {LuLoader2} from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {LogOut} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {auth} from "@/firebase";
import {CgGym} from "react-icons/cg";

const UserBox = () => {
  const {user, setUser} = useUserState()

  const navigate = useNavigate()

  if (!user) return <LuLoader2 className='animate-spin'/>

  const onLogout = () => {
    auth.signOut().then(() => {
      setUser(null)
      navigate('/auth')
    })
  }

  return <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar className='cursor-pointer'>
        <AvatarImage src={user.photoURL!} />
        <AvatarFallback className='uppercase'>{user.email![0] }</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='w-80' align='start' alignOffset={11} forceMount>
      <div className='flex flex-col space-y-4 p-2'>
        <p className='text-xs font-medium leading-none text-muted-foreground'>
          {user.email}
        </p>
        <div className='flex items-center gap-x-2'>
          <div className='rounded-md bg-secondary p-1'>
            <Avatar>
              <AvatarImage src={user.photoURL!} />
              <AvatarFallback className='uppercase'>{user.email![0] }</AvatarFallback>
            </Avatar>
          </div>

          <div className='space-y-1'>
            <p className='line-clamp-1 text-sm'>
              {user.displayName ?? user.email}
            </p>
          </div>
        </div>
      </div>
      <DropdownMenuSeparator/>
      <DropdownMenuGroup>
        <DropdownMenuItem className='cursor-pointer' onClick={onLogout}>
          <CgGym className='w-4 h-4 mr-2' />
          <span>Gym</span>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer bg-destructive' onClick={onLogout}>
          <LogOut className='w-4 h-4 mr-2' />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>;
};

export default UserBox;