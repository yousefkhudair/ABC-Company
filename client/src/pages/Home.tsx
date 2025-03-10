import Header from "@/components/Header";
import BookingForm from "@/components/BookingForm";
import StatusForm from "@/components/StatusForm";
import PopularDestinations from "@/components/PopularDestinations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/90" />
          <div className="container relative mx-auto px-4 py-24 text-white">
            <h1 className="text-5xl font-bold mb-4">Explore a new city</h1>
            <p className="text-xl mb-2">from $115* one way</p>
          </div>
        </div>

        {/* Booking Section */}
        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Tabs defaultValue="book">
              <TabsList className="mb-6">
                <TabsTrigger value="book">Book</TabsTrigger>
                <TabsTrigger value="status">Flight Status</TabsTrigger>
              </TabsList>
              <TabsContent value="book">
                <BookingForm />
              </TabsContent>
              <TabsContent value="status">
                <StatusForm />
              </TabsContent>
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
