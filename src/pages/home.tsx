import {Button} from "@/components/ui/button.tsx";
import {featuredItems, programs} from "@/constants";
import men from '@/assets/men.png'
import {Card} from "@/components/ui/card.tsx";
import {FaArrowRightLong} from "react-icons/fa6";
import {Link, useNavigate} from "react-router-dom";
import {useUserState} from "@/stores/user.store.ts";
import {CgGym} from "react-icons/cg";
import {LogOut} from "lucide-react";
import {auth} from "@/firebase";

const Home = () => {
  const {user, setUser} = useUserState()

  const navigate = useNavigate()
  const onLogout = () => {
    auth.signOut().then(() => {
      setUser(null)
      navigate('/auth')
    })
  }
  return (
    <>
      <div className='w-full h-screen flex items-center'>
        <div className='max-w-xl ml-60 flex w-full flex-col justify-center mt-10'>
          <h1 className='text-9xl font-semibold uppercase '>Workout with me</h1>
          <p className='text-muted-foreground'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim esse eum ipsam omnis porro quam qui quidem repudiandae sequi velit.
          </p>
          {user ? (
            <div className='flex gap-4'>
              <Link to={'/dashboard'}>
                <Button className='w-fit mt-6 font-bold h-12' size={'lg'}>
                  <span>Go to Gym</span>
                  <CgGym className='h-5 w-5 ml-2'/>
                </Button>
              </Link>
                <Button className='w-fit mt-6 font-bold h-12' variant='destructive' size={'lg'} onClick={onLogout}>
                  <span>Logout</span>
                  <LogOut className='h-5 w-5 ml-2'/>
                </Button>
            </div>
          ) : (
            <Link to='/auth'>
              <Button className='w-fit mt-6 font-bold h-12'>Join club now</Button>
            </Link>
          )}
          <div className='mt-24'>
            <p className='text-muted-foreground'>AS FEATURED IN</p>
            <div className='flex items-center gap-4 mt-2'>
              {featuredItems.map((Icon,index) =>(
                <Icon key={index} className='w-12 h-12'/>
              ))}
            </div>
          </div>
        </div>
        <img src={men} className='w-1/4 mt-10' alt={'image'}/>
      </div>
      <div className='container max-w-5xl mx-auto'>
        <h1 className='text-4xl '>Not sure where to start?</h1>
        <p className='mt-2 text-muted-foreground'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci deserunt expedita maxime obcaecati omnis quibusdam.</p>
        <div className='grid grid-cols-3 gap-4 my-8 '>
          {programs.map(item =>(
            <Card  className='p-8 relative cursor-pointer group'>
              <h3>{item.title}</h3>
              <p className='text-sm text-muted-foreground mt-2'>{item.descr}</p>
              <Button
                size='icon'
                variant='ghost'
                className='absolute right-2 top-1/2 group-hover:translate-x-1 transition-transform'
              >
                <FaArrowRightLong/>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;