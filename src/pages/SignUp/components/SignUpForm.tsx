import { Input, Button, Form } from "@heroui/react";

function SignUpForm() {
  return (
    <Form className='w-auto mx-10'>
      <div className='flex flex-row gap-2 w-full'>
        <Input
          isRequired
          errorMessage='Please enter a valid email'
          label='Email'
          labelPlacement='inside'
          name='email'
          placeholder='Enter your email'
          type='email'
          variant='faded'
          className='mb-2'
        />
        <Input
          isRequired
          errorMessage='Please enter a valid backup email'
          label='Backup Email'
          labelPlacement='inside'
          name='backup email'
          placeholder='Enter your email'
          type='email'
          className='mb-2'
          variant='faded'
        />
      </div>
      <Input
        isRequired
        errorMessage='Please enter a valid username'
        label='Username'
        labelPlacement='inside'
        name='username'
        placeholder='Enter your username'
        type='text'
        className='mb-2'
        variant='faded'
      />
      <Input
        isRequired
        errorMessage='Please enter a valid password'
        label='password'
        labelPlacement='inside'
        name='password'
        placeholder='Enter your password'
        variant='faded'
        type='password'
      />
      <Button
        color='secondary'
        type='submit'
        variant='shadow'
        className='mt-5 mb-3 mx-auto w-48'
        size='lg'
      >
        Sign up now
      </Button>
    </Form>
  );
}

export default SignUpForm;
