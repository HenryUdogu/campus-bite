import { ArrowRight } from "lucide-react";

const Header = () => {
    return (
        <div>
            <nav className="flex flex-row px-6 py-5 bg-orange-100 items-center justify-around">
                <div className="flex">
                    <img src="/vite.svg" alt="logo" />
                    <h1 className="text-2xl text-orange-400 font-bold">CampusBite</h1>
                </div>
                <div className="flex gap-20 items-center ml-10">
                    <ul className="flex flex-row gap-9">
                        <li className="text-xl">Home</li>
                        <li className="text-xl">Services</li>
                        <li className="text-xl">Blog</li>
                        <li className="text-xl">About Us</li>
                    </ul>
                    <button className="bg-orange-400 flex flex-row h-10 w-45 gap-9 rounded-2xl items-center p-2">
                        <p className="text-white">Deliver with us</p>
                        <div className="text-white"><ArrowRight /></div>
                    </button>
                
                </div>
                
            </nav>
        </div>
    )
}

export default Header;