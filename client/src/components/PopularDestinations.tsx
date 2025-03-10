import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const destinations = [
  {
    id: 1,
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1554366347-897a5113f6ab",
    price: "From $399",
  },
  {
    id: 2,
    name: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a",
    price: "From $499",
  },
  {
    id: 3,
    name: "Venice, Italy",
    image: "https://images.unsplash.com/photo-1606944331341-72bf6523ff5e",
    price: "From $449",
  },
  {
    id: 4,
    name: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1594661745200-810105bcf054",
    price: "From $599",
  },
];

export default function PopularDestinations() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {destinations.map((destination) => (
        <Card key={destination.id}>
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
      ))}
    </div>
  );
}
