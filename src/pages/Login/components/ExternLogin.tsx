import { Button, Link, Divider } from "@heroui/react";
import { FaGoogle, FaSteam, FaFacebook } from "react-icons/fa";

function ExternLogin() {
  return (
    <div className='flex flex-col'>
      <h1 className='text-purple-300 mx-auto'>Log in via</h1>
      <section className='flex flex-row mt-3 justify-center'>
        <Button isIconOnly radius='full' className='h-16 w-16' isDisabled>
          <FaGoogle className='h-8 w-8' />
        </Button>
        <Button
          isIconOnly
          radius='full'
          size='lg'
          className='ml-5 h-16 w-16'
          isDisabled
        >
          <FaSteam className='h-8 w-8' />
        </Button>
        <Button
          isIconOnly
          radius='full'
          size='lg'
          className='ml-5 h-16 w-16'
          isDisabled
        >
          <FaFacebook className='h-8 w-8' />
        </Button>
      </section>
      <Divider className='mt-5 h-1 mb-2 w-96 bg-white' />
      <p className='mx-auto mb-5 mt-5'>
        Dont have an account?{" "}
        <Link color='foreground' underline='always' showAnchorIcon>
          Sign up!
        </Link>
      </p>
    </div>
  );
}

export default ExternLogin;
