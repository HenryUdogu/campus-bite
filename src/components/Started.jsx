const Started = () => {
    return (
        <div className="m-8">
            <h1 className ="text-5xl font-bold text-center">How To Get Started</h1>
            <div className="flex justify-center items-center mt-8 bg-orange-100 w-fit mx-auto">
                <button className="flex bg-orange-400 rounded-2xl h-10 w-45 items-center p-3 text-white justify-center">As Vendor</button>
                <button className="flex bg-white rounded-2xl h-10 w-50 items-center p-3  border border-amber-500 text-orange-400 justify-center">As Rider</button>
            </div>
            <div className="flex flex-row gap-20 mt-8 justify-center">
                <div>
                    <img src="/images/bike.jpeg" alt="bikeman" className="h-100 w-100 object-cover rounded-2xl ml-8" />
                </div>
                <div className="flex flex-col gap-3 w-full max-w-xl">
                    <div className="bg-orange-100 w-80 p-6 rounded-xl">
                        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
                        <p>Sign up and complete profile verification</p>
                        <ol className="list-decimal pl-6">
                            <li>Full Name</li>
                            <li>Phone Number</li>
                            <li>NIN No.</li>
                            <li>Approval Letter</li>
                        </ol>
                    </div>
                    <div className="bg-orange-100 w-72 p-6 rounded-xl ml-auto">
                        <h1 className="text-2xl font-bold text-center">Get Approved</h1>
                        <p>Submit your document and get approved.</p>
                    </div>


                    <div className="bg-orange-100 w-72 p-6 rounded-xl">
                        <h1 className="text-2xl font-bold text-center">Pick Up Orders</h1>
                        <p>Pick up Orders and delliver to students</p>
                    </div>
                    <div className="bg-orange-100 w-72 p-6 rounded-xl ml-auto">
                        <h1 className="text-2xl font-bold text-center">Earn Money</h1>
                        <p>Get paid for every successful delivery</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Started;