interface CardLoaderProps {}

const CardLoader: React.FC<CardLoaderProps> = () => {
  return (
    <div className="border bg-secondaryBG mx-2 shadow rounded-2xl p-4 w-96 h-fit">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-tertiaryBG h-12 w-12" />
        <div className="flex-1 space-y-6 py-1">
          <div className="h-5 bg-tertiaryBG rounded" />
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-4 bg-tertiaryBG rounded col-span-2" />
              <div className="h-4 bg-tertiaryBG rounded col-span-1" />
            </div>
            <div className="h-3 bg-tertiaryBG rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLoader;
