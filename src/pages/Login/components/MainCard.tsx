import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import LoginForm from "./LoginForm";
import ExternLogin from "./ExternLogin";

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
          Log In
        </h1>
        <h2 className='text-purple-300 text-center text-md mx-auto'>
          Welcome back.
        </h2>
      </CardHeader>
      <CardBody>
        <LoginForm />
      </CardBody>
      <CardFooter className='justify-center'>
        <ExternLogin />
      </CardFooter>
    </Card>
  );
}

export default MainCard;
