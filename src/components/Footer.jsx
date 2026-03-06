const Footer = () => {
  return (
    <div className="bg-black flex flex-row justify-around h-50 p-8">
      <div className="flex flex-col justify-around">
        <div className="flex">
          <img src="/vite.svg" alt="logo" />
          <h1 className="text-2xl text-orange-400 font-bold">CampusBite</h1>
        </div>
        <div className="flex flex-row gap-2">
          <img src="" alt="icon" className="text-white"/>
          <img src="" alt="icon" className="text-white"/>
          <img src="" alt="icon" className="text-white"/>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl text-white">Get to Know Us</h1>
        <ul className="text-white">
          <li className="text-white">About Us</li>
          <li className="text-white">Career</li>
          <li className="text-white">Blogs</li>
          <li className="text-white">Discover</li>
        </ul>
      </div>
      <div className="flex flex-col">
        <h1 className="text-white text-2xl">Let us help You</h1>
        <ul>
          <li className="text-white">Account Details</li>
          <li className="text-white">Order History</li>
          <li className="text-white">Help</li>
        </ul>
      </div>
      <div className="flex flex-col">
        <h1 className="text-white text-2xl">Doing Buisness</h1>
        <ul>
          <li className="text-white">Sell on CampusBite</li>
          <li className="text-white" >Get CampusBite for Buisness</li>
        </ul>
      </div>
      <div className="flex flex-col">
        <h1 className="text-white text-2xl">Terms and Conditions</h1>
        <ul>
          <li className="text-white">Privacy</li>
          <li className="text-white">Cookies</li>
          <li className="text-white">Resource</li>
          <li className="text-white">Places</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer