const Started = () => {
  return (
    <div className="m-8">
      <h1 className="text-3xl sm:text-5xl font-bold text-center">How To Get Started</h1>

      
      <div className="flex justify-center items-center mt-8 bg-orange-100 w-fit mx-auto rounded-2xl overflow-hidden">
        <button className="bg-orange-400 rounded-2xl h-10 px-6 text-white">As Vendor</button>
        <button className="bg-white rounded-2xl h-10 px-6 border border-amber-500 text-orange-400">As Rider</button>
      </div>

      
      <div className="flex flex-col md:flex-row gap-10 mt-8 justify-center items-center md:items-start">

        
        <div className="w-full max-w-xs md:max-w-sm lg:max-w-md flex-shrink-0">
          <img
            src="/images/bike.jpeg"
            alt="bikeman"
            className="w-full h-64 sm:h-80 md:h-100 object-cover rounded-2xl"
          />
        </div>

        
        <div className="flex flex-col gap-4 w-full max-w-md">

          <div className="bg-orange-100 p-6 rounded-xl w-full sm:w-4/5">
            <h1 className="text-xl sm:text-2xl font-bold text-center">Create an Account</h1>
            <p className="text-sm sm:text-base">Sign up and complete profile verification</p>
            <ol className="list-decimal pl-6 text-sm sm:text-base">
              <li>Full Name</li>
              <li>Phone Number</li>
              <li>NIN No.</li>
              <li>Approval Letter</li>
            </ol>
          </div>

          <div className="bg-orange-100 p-6 rounded-xl w-full sm:w-4/5 sm:ml-auto">
            <h1 className="text-xl sm:text-2xl font-bold text-center">Get Approved</h1>
            <p className="text-sm sm:text-base">Submit your document and get approved.</p>
          </div>

          <div className="bg-orange-100 p-6 rounded-xl w-full sm:w-4/5">
            <h1 className="text-xl sm:text-2xl font-bold text-center">Pick Up Orders</h1>
            <p className="text-sm sm:text-base">Pick up Orders and deliver to students</p>
          </div>

          <div className="bg-orange-100 p-6 rounded-xl w-full sm:w-4/5 sm:ml-auto">
            <h1 className="text-xl sm:text-2xl font-bold text-center">Earn Money</h1>
            <p className="text-sm sm:text-base">Get paid for every successful delivery</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Started;