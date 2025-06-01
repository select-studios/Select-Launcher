import MainCard from "./components/MainCard";
import { Image } from "@heroui/react";
import SelectIcon from "../../assets/icon.png";

function Login() {
  return (
    <section className='bg-gradient-to-t from-purple-700 to-slate-800 h-screen flex flex-col justify-center items-center'>
      <Image src={SelectIcon} className='h-30 w-30 mb-5' />
      <div style={{ width: "32rem" }}>
        <MainCard className='mx-auto' />
      </div>
    </section>
  );
}

export default Login;
