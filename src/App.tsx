import "./App.css";
import { Button, Input } from "@heroui/react";

function App() {
  return (
    <div>
      <h1 className='text-center'>Hi</h1>
      <Button className='ml-2' color='primary' variant='shadow'>
        Button
      </Button>
      <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
        <Input label='Email' type='email' />
        <Input label='Email' placeholder='Enter your email' type='email' />
      </div>
    </div>
  );
}

export default App;
