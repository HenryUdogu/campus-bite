const Door = () => {
  return (
    <div className="flex justify-around">
        <div className="w-100 h-112.5 rounded-tr-[180px] rounded-br-[180px] overflow-hidden object-cover">
           <img src="/images/man.jpeg" alt="man" className=" w-full h-full object-cover" /> 
        </div>
        <div className="mt-7">
            <h1 className="text-4xl font-bold text-center">From Your Door to More</h1>
            <div className="mt-5">
                <p>At CampusBite our mission is to empower and grow</p>
                <p>local economies by opening doors that connect us</p>
                <p>to each other.When yyou order something you need,</p>
                <p>local merchants get buisnesses, and Dashers get paid.</p>
            </div>
        </div>
    </div>
  )
};

export default Door;