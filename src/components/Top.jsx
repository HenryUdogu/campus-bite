import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Top = () => {
     const navigate = useNavigate();
    return (
        <div className="flex flex-row justify-around mt-7 ">
            <div className="flex flex-col justify-around">
                <div>
                    <h1 className="text-5xl font-bold text-orange-400">You Crave it</h1>
                    <h1 className="text-5xl font-bold text-orange-400">We Deliver.</h1>
                    <div className="mt-3">
                        <p className="text-black">From hostels to lecture hall discover meals you love from</p>
                        <p className="text-black">your favourite campus vendors and enjoy fast stress-</p>
                        <p className="text-black">free delivery right to you.</p></div>
                </div>
                <div className="flex gap-8">
                    <button className="flex bg-orange-400 rounded-2xl h-10 w-45 items-center p-3 gap-10 text-white" onClick={() => navigate("/signup")}>Order Now <div><ArrowRight /></div></button>
                    <button className="flex bg-white rounded-2xl h-10 w-50 items-center p-3 gap-6 border border-amber-500 text-orange-400" onClick={() => navigate("/signup")}>Become a Vendor <div><ArrowRight /></div></button>
                </div>
            </div>
            <div className="flex flex-col gap-3 mt-9">
                <div className="flex flex-row gap-3">
                    <img src="/images/drink.jpeg" alt="food" className="h-40 w-40 rounded-tl-[120px] object-cover"/>
                    <img src="/images/sharwama.jpeg" alt="food" className="h-40 w-40 rounded-tr-[120px] object-cover" />
                </div>
                <div className="flex flex-row gap-3">
                    <img src="/images/spag.jpeg" alt="food" className="h-40 w-40 rounded-bl-[120px] object-cover" />
                    <img src="/images/wrice.jpeg" alt="food" className="h-40 w-40 rounded-br-[120px] object-cover" />
                </div>
            </div>
        </div>
    )
}

export default Top;