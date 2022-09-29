import gitIcon from '../../../assets/gitIcon.svg';

function GitError() {
  return (
    <div className="overflow-x-hidden">
      <div className="container flex items-center justify-center h-screen ml-12">
        <div className="bg-base-100 bg-opacity-50 rounded-2xl p-8 flex flex-col w-fit backdrop-blur-md">
          <h1 className="prose text-4xl font-extrabold title-font mb-5 text-center prose-slate">
            <strong className="text-red-500">Git</strong> is Missing
          </h1>
          <img
            src={gitIcon}
            alt="Git Logo"
            height={192}
            width={192}
            className="ml-auto mr-auto"
          />
          <p className="prose prose-slate mt-2 text-2xl text-center">
            <strong className="text-red-500">Git</strong> is used to keep out
            games upto date <br /> without it, the launcher doesn’t work. <br />
            After Installing, restart the launcher.
          </p>
          <a
            href="https://git-scm.com/download/win"
            className="btn btn-primary mt-4"
          >
            Download <strong className="text-red-500 ml-1">Git</strong>
          </a>
        </div>
      </div>
    </div>
  );
}

export default GitError;
