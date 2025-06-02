import { Input, Link, Button, Form } from "@heroui/react";

function LoginForm() {
  return (
    <Form className='w-auto mx-10'>
      <Input
        isRequired
        errorMessage='Please enter a valid email'
        label='Email'
        labelPlacement='inside'
        name='email'
        placeholder='Enter your email'
        type='email'
        className='mb-2'
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
      <Link color='foreground' className='ml-auto' underline='hover'>
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
    </Form>
  );
}

export default LoginForm;
