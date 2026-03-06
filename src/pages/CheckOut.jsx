import MenuTop from "../components/MenuTop"
import { Landmark,IdCard,Building } from "lucide-react"
const CheckOut = () => {
  return (
    <div>
        <MenuTop/>
        <div className="m-10">
            <h1 className="text-3xl font-bold">Choose Your Payment Method</h1>
            <div className="flex flex-col m-10 border border-black h-64 rounded-lg p-7 bg-orange-100 ">
                <h1 className="text-2xl font-bold flex mb-7 flex text-left">PayStack</h1>
                <ul className="flex flex-col gap-8 ">
                    <li className="flex text-xl gap-1"><IdCard/>Pay with Card</li>
                    <li className="flex text-xl gap-1"><Landmark/>Pay with Bank Transfer</li>
                    <li className="flex text-xl gap-1"><Building/>Pay with Bank</li>
                </ul>
            </div>
            <button className="bg-orange-400 w-full p-2 mt-10 font-bold text-2xl">#Amount</button>
        </div>
    </div>
  )
}

export default CheckOut;