import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useBookingForm } from "@/lib/useBookingForm";
import { useLDClient } from "launchdarkly-react-client-sdk";

const destinations = [
  {
    id: 1,
    name: "Paris, France",
    image: "/paris.jpg",
    price: "From $399",
  },
  {
    id: 2,
    name: "Santorini, Greece",
    image: "/Santorini.jpg",
    price: "From $499",
  },
  {
    id: 3,
    name: "Venice, Italy",
    image: "/Venice.jpg",
    price: "From $449",
  },
  {
    id: 4,
    name: "Dubai, UAE",
    image: "/dubai.jpg",
    price: "From $599",
  },
];

export default function PopularDestinations() {
  const ldClient = useLDClient();
  const { setDestination } = useBookingForm();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {destinations.map((destination) => (
        <Button
          key={destination.id}
          variant="ghost"
          className="p-0 h-auto hover:bg-transparent"
          onClick={() => {
            if(ldClient){
                ldClient.track('destination_clicked', {
                destinationName: destination.name,
                destinationPrice: destination.price
                  
              });
              console.log(destination.name);
            }
            
            setDestination(destination.name.split(',')[0]); // Only use the city name
            // Scroll to booking form
            document.querySelector('[value="book"]')?.scrollIntoView({ 
              behavior: 'smooth',
              block: 'center'
            });
          }}
        >
          <Card className="w-full transition-transform hover:scale-105">
            <CardContent className="p-0">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="rounded-t-lg object-cover w-full h-full"
                />
              </AspectRatio>
              <div className="p-4">
                <h3 className="font-semibold">{destination.name}</h3>
                <p className="text-sm text-muted-foreground">{destination.price}</p>
              </div>
            </CardContent>
          </Card>
        </Button>
      ))}
    </div>
  );
}