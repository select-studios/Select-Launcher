import { getCurrentWindow } from "@tauri-apps/api/window";
import { Button } from "@heroui/react";
import { MdClose, MdOutlineCropSquare } from "react-icons/md";
import { FaRegWindowMinimize } from "react-icons/fa6";

function Titlebar() {
  return (
    <div
      className='h-[40px] z-50 filter bg-opacity-100 backdrop-blur-lg screen sticky top-0 bg-background flex flex-row'
      data-tauri-drag-region
    >
      <h1 className='mt-auto ml-10 text-xl'>Select Launcher</h1>
      <section className='ml-auto'>
        <Button
          isIconOnly
          onPress={async () => await getCurrentWindow().minimize()}
          variant='light'
          radius='none'
        >
          <FaRegWindowMinimize />
        </Button>
        <Button
          isIconOnly
          onPress={async () => await getCurrentWindow().toggleMaximize()}
          variant='light'
          color='warning'
          radius='none'
        >
          <MdOutlineCropSquare />
        </Button>
        <Button
          isIconOnly
          onPress={async () => await getCurrentWindow().close()}
          variant='light'
          color='danger'
          radius='none'
        >
          <MdClose />
        </Button>
      </section>
    </div>
  );
}

export default Titlebar;
