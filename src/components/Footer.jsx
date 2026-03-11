const Footer = () => {
  return (
    <div className="bg-black px-8 py-10">

      
      <div className="flex flex-col md:flex-row flex-wrap justify-around gap-10">

        
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <img src="/images/logo.png" alt="logo" className="size-12" />
            <h1 className="text-2xl text-orange-400 font-bold">CampusBite</h1>
          </div>
          <div className="flex flex-row gap-3">
            <img src="/images/facebook.svg" alt="icon" className="bg-white size-6 p-1 rounded" />
            <img src="/images/instagram.svg" alt="icon" className="bg-white size-6 p-1 rounded" />
            <img src="/images/x.svg" alt="icon" className="bg-white size-6 p-1 rounded" />
          </div>
        </div>

        
        <div className="flex flex-col gap-2">
          <h1 className="text-xl text-white font-semibold">Get to Know Us</h1>
          <ul className="flex flex-col gap-1 text-gray-400 text-sm">
            <li>About Us</li>
            <li>Career</li>
            <li>Blogs</li>
            <li>Discover</li>
          </ul>
        </div>

        
        <div className="flex flex-col gap-2">
          <h1 className="text-xl text-white font-semibold">Let Us Help You</h1>
          <ul className="flex flex-col gap-1 text-gray-400 text-sm">
            <li>Account Details</li>
            <li>Order History</li>
            <li>Help</li>
          </ul>
        </div>

       
        <div className="flex flex-col gap-2">
          <h1 className="text-xl text-white font-semibold">Doing Business</h1>
          <ul className="flex flex-col gap-1 text-gray-400 text-sm">
            <li>Sell on CampusBite</li>
            <li>Get CampusBite for Business</li>
          </ul>
        </div>

        
        <div className="flex flex-col gap-2">
          <h1 className="text-xl text-white font-semibold">Terms and Conditions</h1>
          <ul className="flex flex-col gap-1 text-gray-400 text-sm">
            <li>Privacy</li>
            <li>Cookies</li>
            <li>Resource</li>
            <li>Places</li>
          </ul>
        </div>

      </div>

      
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-sm">
         {new Date().getFullYear()} CampusBite. All rights reserved.
      </div>

    </div>
  );
};

export default Footer;
