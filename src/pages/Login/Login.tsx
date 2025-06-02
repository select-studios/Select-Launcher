import MainCard from "./components/MainCard";
import { Button, Image } from "@heroui/react";
import SelectIcon from "../../assets/icon.png";
import { FaQuestion } from "react-icons/fa";
import FloatingSquares from "../../components/FloatingSquares/FloatingSquares";

function Login() {
  return (
    <main>
      <section className='bg-[url(/backdrops/MainBG.png)] h-screen w-screen flex flex-col justify-center items-center'>
        <Image src={SelectIcon} className='h-30 w-30 mb-5' />
        <MainCard className='mx-auto w-[32rem] z-20' />
        <Button
          isIconOnly
          radius='lg'
          size='lg'
          className='absolute bottom-2 right-2'
          variant='faded'
        >
          <FaQuestion />
        </Button>
      </section>
      <FloatingSquares />
    </main>
  );
}

export default Login;
