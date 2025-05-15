
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const featuredProducts = [
  {
    id: 9,
    title: "Premium Wheat",
    price: "28.00",
    unit: "kg",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1c5a6ec32?w=400",
    category: "grains",
  },
  {
    id: 1,
    title: "Premium Dates",
    price: "120.00",
    unit: "kg",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400",
    category: "fruits",
  },
  {
    id: 2,
    title: "Organic Livestock",
    price: "2,500.00",
    unit: "head",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400",
    category: "livestock",
  },
  {
    id: 3,
    title: "Fresh Saffron",
    price: "75.00",
    unit: "gram",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400",
    category: "spices",
  },
  {
    id: 4,
    title: "Premium Bananas",
    price: "45.00",
    unit: "kg",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400",
    category: "fruits",
  },
  {
    id: 5,
    title: "Organic Honey",
    price: "35.00",
    unit: "bottle",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400",
    category: "honey",
  },
  {
    id: 6,
    title: "Fresh Olives",
    price: "25.00",
    unit: "kg",
    image: "https://images.unsplash.com/photo-1632684867975-f3cd489c0b06?w=400",
    category: "fruits",
  },
  {
    id: 7,
    title: "Organic Rice",
    price: "15.00",
    unit: "kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    category: "grains",
  },
  {
    id: 8,
    title: "Premium Coffee",
    price: "40.00",
    unit: "kg",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400",
    category: "coffee",
  },
  {
    id: 11,
    title: "Road Grass",
    price: "18.00",
    unit: "sqm",
    image: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=400",
    category: "grass",
  }
];

const FeaturedProducts = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-b from-earth-olive-light/10 to-earth-sand-light/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-earth-olive-dark mb-4 relative">
              Featured Products
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-28 h-1.5 bg-earth-gold rounded-full"></span>
            </h2>
            <p className="text-earth-olive-dark/80 text-lg">
              Connecting GCC Agriculture with Global Markets
            </p>
          </div>
          <Button 
            onClick={() => navigate('/categories')}
            variant="outline" 
            className="mt-6 text-earth-terracotta hover:text-earth-terracotta-dark hover:bg-earth-sand-light/50 transition-all group text-base py-4 px-6 border-earth-terracotta"
          >
            View all products
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Card className="overflow-hidden border-none rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                    <div 
                      className="relative cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                        <p className="text-white/90 text-sm font-medium mb-2">
                          Category: <span className="capitalize">{product.category}</span>
                        </p>
                        <Button
                          size="sm"
                          className="w-full bg-earth-terracotta hover:bg-earth-terracotta-dark transition-colors py-2 text-sm"
                        >
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                      <div className="h-52 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-earth-olive-dark line-clamp-1">
                              {product.title}
                            </h3>
                            <p className="text-earth-olive mt-1 font-medium text-base">
                              {product.price} USD/<span className="text-sm">{product.unit}</span>
                            </p>
                          </div>
                          <div className="mt-1 bg-earth-gold/20 text-earth-gold-dark px-2 py-0.5 rounded-full text-xs font-medium">
                            Featured
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative static mx-3 bg-earth-sand-light border-earth-sand-dark text-earth-olive hover:bg-earth-sand hover:text-earth-olive-dark h-10 w-10" />
              <CarouselNext className="relative static mx-3 bg-earth-sand-light border-earth-sand-dark text-earth-olive hover:bg-earth-sand hover:text-earth-olive-dark h-10 w-10" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
