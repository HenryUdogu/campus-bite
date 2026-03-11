const Rider = () => {
    return (
        <div className="m-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-center">How To Get Started</h1>


            <div className="flex justify-center items-center mt-8 bg-orange-100 w-fit mx-auto rounded-2xl overflow-hidden">
                <button className="bg-orange-400 rounded-2xl h-10 px-6 text-white">As Rider</button>
            </div>


            <div className="flex flex-col md:flex-row-reverse gap-10 mt-8 justify-center items-center md:items-start">


                <div className="w-full max-w-xs md:max-w-sm lg:max-w-md flex-shrink-0">
                    <img
                        src="/images/girl.jpeg"
                        alt="girl"
                        className="w-full h-64 sm:h-80 md:h-100 object-cover rounded-2xl"
                    />
                </div>


                <div className="flex flex-col gap-4 w-full max-w-md">

                    <div className="bg-orange-100 p-6 rounded-xl w-full sm:w-4/5">
                        <h1 className="text-xl sm:text-2xl font-bold text-center">Create an Account</h1>
                        <p className="text-sm sm:text-base">Sign up and complete profile verification</p>
                        <ol className="list-decimal pl-6 text-sm sm:text-base">
                            <li>Shop Name</li>
                            <li>Phone Number</li>
                            <li>NIN No.</li>
                            <li>CAC ID</li>
                            <li>Approval Letter</li>
                        </ol>
                    </div>

                    <div className="bg-orange-100 p-6 rounded-xl w-full sm:w-4/5 sm:ml-auto">
                        <h1 className="text-xl sm:text-2xl font-bold text-center">List Your Menu</h1>
                        <p className="text-sm sm:text-base">Add your meals with photo, price and details.</p>
                    </div>

                    <div className="bg-orange-100 p-6 rounded-xl w-full sm:w-4/5">
                        <h1 className="text-xl sm:text-2xl font-bold text-center">Receive Orders</h1>
                        <p className="text-sm sm:text-base">Get orders from students on campus</p>
                    </div>

                    <div className="bg-orange-100 p-6 rounded-xl w-full sm:w-4/5 sm:ml-auto">
                        <h1 className="text-xl sm:text-2xl font-bold text-center">Prepare Meals</h1>
                        <p className="text-sm sm:text-base">Prepare order and make it ready</p>
                    </div>

                    <div className="bg-orange-100 p-6 rounded-xl w-full sm:w-4/5">
                        <h1 className="text-xl sm:text-2xl font-bold text-center">Earn Money</h1>
                        <p className="text-sm sm:text-base">Drivers pick it up and you earn</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Rider;