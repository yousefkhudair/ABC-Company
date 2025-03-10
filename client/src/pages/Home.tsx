import { useFlags } from 'launchdarkly-react-client-sdk';
import Header from "@/components/Header";
import BookingForm from "@/components/BookingForm";
import StatusForm from "@/components/StatusForm";
import PopularDestinations from "@/components/PopularDestinations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  // Safely access flags with a fallback
  let showFlightStatus = false;
  try {
    const flags = useFlags();
    showFlightStatus = flags.showFlightStatus ?? false;
  } catch (error) {
    console.warn('LaunchDarkly flags not available:', error);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <div className="relative">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url("/nyc.jpg")',
            }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="container relative mx-auto px-4 py-24 text-white">
            <h1 className="text-5xl font-bold mb-4">Explore a new city</h1>
            <p className="text-xl mb-2">from $115* one way</p>
          </div>
        </div>

        {/* Booking Section */}
        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="bg-white rounded-lg shadow-lg">
            <Tabs defaultValue="book" className="w-full">
              <TabsList className={`w-full grid ${showFlightStatus ? 'grid-cols-2' : 'grid-cols-1'} rounded-t-lg bg-gray-50`}>
                <TabsTrigger 
                  value="book" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-none py-4"
                >
                  Book
                </TabsTrigger>
                {showFlightStatus && (
                  <TabsTrigger 
                    value="status" 
                    className="data-[state=active]:bg-white data-[state=active]:shadow-none py-4"
                  >
                    Flight Status
                  </TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="book" className="p-6">
                <BookingForm />
              </TabsContent>
              {showFlightStatus && (
                <TabsContent value="status" className="p-6">
                  <StatusForm />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Popular Destinations</h2>
          <PopularDestinations />
        </div>
      </main>
    </div>
  );
}