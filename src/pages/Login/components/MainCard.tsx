import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  Button,
  Link,
  Divider,
} from "@heroui/react";
import { FaGoogle, FaSteam, FaDiscord } from "react-icons/fa";

interface MainCardProps {
  className?: string;
}

function MainCard({ className }: MainCardProps) {
  return (
    <Card
      className={`${className} backdrop-blur-2xl h-auto bg-black opacity-75`}
      shadow='lg'
    >
      <CardHeader className='flex flex-col'>
        <h1 className='text-purple-300 text-center text-6xl mx-auto mb-2'>
          Log In
        </h1>
        <h2 className='text-purple-300 text-center text-md mx-auto'>
          Welcome back.
        </h2>
      </CardHeader>
      <CardBody>
        <Form className='w-auto mx-10'>
          <Input
            isRequired
            errorMessage='Please enter a valid email'
            label='Email'
            labelPlacement='inside'
            name='email'
            placeholder='Enter your email'
            type='email'
          />
          <Input
            isRequired
            errorMessage='Please enter a valid password'
            label='password'
            labelPlacement='inside'
            name='password'
            placeholder='Enter your password'
            type='password'
          />
        </Form>
        <Link
          color='foreground'
          className='justify-end mt-2 mr-10'
          underline='hover'
        >
          Forgot Password?
        </Link>
        <Button
          color='secondary'
          type='submit'
          variant='shadow'
          className='mt-5 mb-3 mx-auto w-48'
          size='lg'
        >
          Log in now
        </Button>
      </CardBody>
      <CardFooter className='flex flex-col'>
        <h1 className='text-purple-300 mx-auto'>Log in via</h1>
        <section className='flex- flex-row mt-3'>
          <Button isIconOnly radius='full' className='h-16 w-16'>
            <FaGoogle className='h-8 w-8' />
          </Button>
          <Button isIconOnly radius='full' size='lg' className='ml-5 h-16 w-16'>
            <FaSteam className='h-8 w-8' />
          </Button>
          <Button isIconOnly radius='full' size='lg' className='ml-5 h-16 w-16'>
            <FaDiscord className='h-8 w-8' />
          </Button>
        </section>
        <Divider className='mt-5 h-1 mb-2 w-96 bg-white' />
        <p className='mx-auto mb-5 mt-5'>
          Dont have an account?{" "}
          <Link color='foreground' underline='always' showAnchorIcon>
            Sign up!
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default MainCard;
