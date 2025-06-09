import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import ExternLogin from "../../Login/components/ExternLogin";
import SignUpForm from "./SignUpForm";

interface MainCardProps {
  className?: string;
}

function MainCard({ className }: MainCardProps) {
  return (
    <Card
      className={`${className} backdrop-blur-xs h-auto bg-background/40`}
      shadow='lg'
    >
      <CardHeader className='flex flex-col'>
        <h1 className='text-purple-300 text-center text-6xl mx-auto mb-2'>
          Sign Up
        </h1>
        <h2 className='text-purple-300 text-center text-md mx-auto'>
          Welcome.
        </h2>
      </CardHeader>
      <CardBody>
        <SignUpForm />
      </CardBody>
      <CardFooter className='justify-center'>
        <ExternLogin variant='SignUp' />
      </CardFooter>
    </Card>
  );
}

export default MainCard;
