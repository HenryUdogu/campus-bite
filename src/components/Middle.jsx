import { ArrowRight } from "lucide-react";
const Middle = () => {
    return (
        <div className="flex justify-around mt-10">
            <div className="flex flex-col justify-around">
                <div>
                    <h1 className="text-3xl ">Everything you crave, delivered.</h1>
                    <div className="mt-4">
                        <p>Your favourite local restaurants. Get a slice of pizza or the</p>
                        <p>whole pie delivered, or pick up fro takeout spot</p>
                        <p>you've been meaning to try.</p>
                    </div>
                </div>
                <div>
                    <button className="flex bg-orange-400 rounded-2xl h-10 w-45 items-center p-3 gap-10 text-white" onClick={() => navigate("/signup")}>Order Now <div><ArrowRight /></div></button>
                </div>
            </div>
            <div className="mt-8">
                <img src="/images/eat.jpeg" alt="food" className="rounded-2xl h-70 w-70 object-cover" />
            </div>
        </div>
    )
}

export default Middle;