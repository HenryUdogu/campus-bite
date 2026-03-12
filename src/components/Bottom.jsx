import Card from "./Card";

const Bottom = () => {
  return (
    <div className="bg-white py-16 px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
        Get Started With CampusBite
      </h1>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 justify-center items-center md:items-stretch">
        <Card
          image="/images/pic.jpeg"
          title="Study Hard. Eat Smart. To pass well."
          desc="PRE-Order, or get it Delivered to your Doorstep"
          path="/signup"
        />
        <Card
          image="/images/merchant.jpeg"
          title="Become a Vendor"
          desc="Boost your sales and reach new customers. Start with 0% commission for your first 60 days"
          path="/vendor-signup"
        />
        <Card
          image="/images/bike.jpeg"
          title="Start Earning More as a Rider"
          desc="Turn your free time into money. Drive when and earn more!"
          path="/rider-signup"
        />
      </div>
    </div>
  );
};

export default Bottom;