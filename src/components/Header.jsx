import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
    const [open, setOpen] = useState(false);

    return (
      <nav className="bg-orange-100 px-6 py-5">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="logo" className="size-12" />
            <h1 className="text-2xl text-orange-400 font-bold">CampusBite</h1>
          </div>

          <div className="hidden md:flex gap-20 items-center">
            <ul className="flex gap-9">
              <li className="text-xl">
                <a href="#home">Home</a>
              </li>

              <li className="text-xl">
                <a href="#services">Services</a>
              </li>

              <li className="text-xl">
                <a href="#blog">Blog</a>
              </li>

              <li className="text-xl">
                <a href="#about">About Us</a>
              </li>
            </ul>

            <button
              className="flex bg-orange-400 rounded-2xl h-10 items-center px-4 gap-3 text-white whitespace-nowrap"
              onClick={() => navigate("/signup")}
            >
              Order Now <ArrowRight size={18} />
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setOpen(!open)}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-4 flex flex-col gap-4 items-center">
            <a href="#home" onClick={() => setOpen(false)}>
              Home
            </a>
            <a href="#services" onClick={() => setOpen(false)}>
              Services
            </a>
            <a href="#blog" onClick={() => setOpen(false)}>
              Blog
            </a>
            <a href="#about" onClick={() => setOpen(false)}>
              About Us
            </a>

            <button className="bg-orange-400 flex items-center gap-2 rounded-2xl px-4 py-2">
              <p className="text-white">Deliver with us</p>
              <ArrowRight className="text-white" />
            </button>
          </div>
        )}
      </nav>
    );
};

export default Header;