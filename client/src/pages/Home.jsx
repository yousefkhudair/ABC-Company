import Header from "@/components/Header";
import BookingForm from "@/components/BookingForm";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-[500px]">
          <div className="container mx-auto px-4 py-24 text-white">
            <h1 className="text-5xl font-bold mb-4">Explore the world with us</h1>
            <p className="text-xl">Book your next adventure today</p>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold">Search Flights</h2>
          </div>
          <BookingForm />
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-xl font-semibold">New York</h3>
            <p className="text-gray-600">from $299</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-xl font-semibold">London</h3>
            <p className="text-gray-600">from $499</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-xl font-semibold">Tokyo</h3>
            <p className="text-gray-600">from $699</p>
          </div>
        </div>
      </div>
    </div>
  );
}