import {Button} from "@/components/ui/button.tsx";
import {featuredItems, programs} from "@/constants";
import men from '@/assets/men.png'
import {Card} from "@/components/ui/card.tsx";
import {FaArrowRightLong} from "react-icons/fa6";

const Home = () => {
  return (
    <>
      <div className='w-full h-screen flex items-center'>
        <div className='max-w-xl ml-60 flex w-full flex-col justify-center mt-10'>
          <h1 className='text-9xl font-semibold uppercase '>Workout with me</h1>
          <p className='text-muted-foreground'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim esse eum ipsam omnis porro quam qui quidem repudiandae sequi velit.
          </p>
          <Button className='w-fit mt-6 font-bold h-12'>Join club now</Button>

          <div className='mt-24'>
            <p className='text-muted-foreground'>AS FEATURED IN</p>
            <div className='flex items-center gap-4 mt-2'>
              {featuredItems.map((Icon,index) =>(
                <Icon key={index} className='w-12 h-12'/>
              ))}
            </div>
          </div>
        </div>
        <img src={men} alt="image" className='w-1/4 mt-10'/>
      </div>
      <div className='container max-w-5xl mx-auto'>
        <h1 className='text-4xl '>Not sure where to start?</h1>
        <p className='mt-2 text-muted-foreground'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci deserunt expedita maxime obcaecati omnis quibusdam.</p>
        <div className='grid grid-cols-3 gap-4 my-8 '>
          {programs.map(item =>(
            <Card key={item} className='p-8 relative cursor-pointer group'>
              <h3 >{item.title}</h3>
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