interface PageTitleProps {
  pageTitle: string;
}

function PageTitle({ pageTitle }: PageTitleProps) {
  return (
    <div
      className="fixed bg-base-100 w-screen ml-20 bg-opacity-40 backdrop-blur-md z-10 border-b-2 border-slate-500 border-opacity-20"
      style={{ height: '5.4rem' }}
    >
      <h1 className="prose prose-2xl prose-stone font-extrabold text-4xl ml-8 mt-5">
        {pageTitle}
      </h1>
    </div>
  );
}

export default PageTitle;
