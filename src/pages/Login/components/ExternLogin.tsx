import { Button, Link  } from "@heroui/react";
import { FaGoogle, FaSteam, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router";

interface ExternLoginProps {
  variant: "LogIn" | "SignUp";
}

function ExternLogin({ variant }: ExternLoginProps) {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col'>
      {variant == "LogIn" ? (
        <h1 className='text-purple-300 mx-auto'>Log in via</h1>
      ) : (
        <h1 className='text-purple-300 mx-auto'>Sign up via</h1>
      )}
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
      {variant == "LogIn" ? (
        <p className='mx-auto mb-5 mt-5 text-purple-300'>
          Dont have an account?{" "}
          <Link
            color='secondary'
            underline='always'
            showAnchorIcon
            onClick={() => navigate("/signup")}
          >
            Sign up!
          </Link>
        </p>
      ) : (
        <p className='mx-auto mb-5 mt-5 text-purple-300'>
          Already have an account?{" "}
          <Link
            color='secondary'
            underline='always'
            showAnchorIcon
            onClick={() => navigate("/login")}
          >
            Log in!
          </Link>
        </p>
      )}
    </div>
  );
}

export default ExternLogin;
