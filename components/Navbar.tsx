export const Navbar = () => {
  return (
    <div className="flex flex-wrap place-items-center z-40 sticky top-0">
      <section className="relative mx-auto">
        <nav className="flex justify-between bg-red-800 text-white w-screen">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center">
            <a className="text-3xl font-bold font-heading" href="#">
              Logo Here
            </a>
          </div>
          <a className="navbar-burger self-center mr-6" href="#">
            hello
          </a>
        </nav>
      </section>
    </div>
  );
};
