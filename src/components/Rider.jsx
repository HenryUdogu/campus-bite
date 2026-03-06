const Rider = () => {
  return (
    <div className="m-8">
            <h1 className ="text-5xl font-bold text-center">How To Get Started</h1>
            <div className="flex justify-center gap-1 items-center mt-8 bg-orange-100  w-fit mx-auto">
                <button className="flex bg-orange-400 rounded-2xl h-10 w-45 items-center p-3 text-white justify-center">As Rider</button>
                <button className="flex bg-white rounded-2xl h-10 w-50 items-center p-3  border border-amber-500 text-orange-400 justify-center">As Vendor</button>
            </div>
            <div className="flex flex-row-reverse gap-20 mt-8 justify-center">
                <div>
                    <img src="/images/girl.jpeg" alt="girl" className="h-100 w-100 object-cover rounded-2xl ml-8" />
                </div>
                <div className="flex flex-col gap-3 w-full max-w-xl">
                    <div className="bg-orange-100 w-80 p-6 rounded-xl">
                        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
                        <p>Sign up and complete profile verification</p>
                        <ol className="list-decimal pl-6">
                            <li>Shop Name</li>
                            <li>Phone Number</li>
                            <li>NIN No.</li>
                            <li>CAC ID</li>
                            <li>Approval Letter</li>
                        </ol>
                    </div>
                    <div className="bg-orange-100 w-72 p-6 rounded-xl ml-auto">
                        <h1 className="text-2xl font-bold text-center">List Your Menu</h1>
                        <p>Ad your meals with photo,price and details.</p>
                    </div>


                    <div className="bg-orange-100 w-72 p-6 rounded-xl">
                        <h1 className="text-2xl font-bold text-center">Receive Orders</h1>
                        <p>Get orders from students on campus</p>
                    </div>
                    <div className="bg-orange-100 w-72 p-6 rounded-xl ml-auto">
                        <h1 className="text-2xl font-bold text-center">Prepare Meals</h1>
                        <p>Prepare order as make as ready</p>
                    </div>
                     <div className="bg-orange-100 w-72 p-6 rounded-xl ">
                        <h1 className="text-2xl font-bold text-center">Receive Orders</h1>
                        <p>Drivers pick it up and you earn</p>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Rider;