const Door = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around items-center gap-10 px-6 py-10">

      
      <div className="w-64 h-80 sm:w-80 sm:h-96 md:w-100 md:h-112 rounded-tr-[180px] rounded-br-[180px] overflow-hidden flex-shrink-0">
        <img src="/images/man.jpeg" alt="man" className="w-full h-full object-cover" />
      </div>

      
      <div className="max-w-md text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-center md:text-left">From Your Door to More</h1>
        <div className="mt-5">
          <p className="text-sm sm:text-base">At CampusBite our mission is to empower and grow</p>
          <p className="text-sm sm:text-base">local economies by opening doors that connect us</p>
          <p className="text-sm sm:text-base">to each other. When you order something you need,</p>
          <p className="text-sm sm:text-base">local merchants get business, and Dashers get paid.</p>
        </div>
      </div>

    </div>
  );
};

export default Door;