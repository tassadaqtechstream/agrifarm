
import { 
  Apple, 
  Wheat, 
  Flower2, 
  Beef, 
  Leaf, 
  Carrot, 
  Egg, 
  CircleEllipsis
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Fruits",
    icon: <Apple className="h-7 w-7 text-earth-terracotta" />,
    description: "Fresh seasonal fruits from local farms",
    bgColor: "bg-red-50",
    path: "/categories/fruits"
  },
  {
    name: "Vegetables",
    icon: <Carrot className="h-7 w-7 text-earth-terracotta" />,
    description: "Organic and conventional vegetables",
    bgColor: "bg-green-50",
    path: "/categories/vegetables"
  },
  {
    name: "Grains",
    icon: <Wheat className="h-7 w-7 text-earth-terracotta" />,
    description: "Premium quality wheat, rice, and cereals",
    bgColor: "bg-amber-50",
    path: "/categories/grains"
  },
  {
    name: "Spices",
    icon: <Leaf className="h-7 w-7 text-earth-terracotta" />,
    description: "Authentic regional spices and herbs",
    bgColor: "bg-orange-50",
    path: "/categories/spices"
  },
  {
    name: "Flowers",
    icon: <Flower2 className="h-7 w-7 text-earth-terracotta" />,
    description: "Ornamental plants and cut flowers",
    bgColor: "bg-pink-50",
    path: "/categories/flowers"
  },
  {
    name: "Livestock",
    icon: <Beef className="h-7 w-7 text-earth-terracotta" />,
    description: "Responsibly raised livestock products",
    bgColor: "bg-yellow-50",
    path: "/categories/livestock"
  },
  {
    name: "Dairy & Eggs",
    icon: <Egg className="h-7 w-7 text-earth-terracotta" />,
    description: "Farm-fresh dairy products and eggs",
    bgColor: "bg-blue-50",
    path: "/categories/dairy-eggs"
  },
  {
    name: "More",
    icon: <CircleEllipsis className="h-7 w-7 text-earth-terracotta" />,
    description: "Explore other agricultural categories",
    bgColor: "bg-gray-50",
    path: "/categories"
  },
];

const Categories = () => {
  return (
    <section id="categories" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-earth-olive-dark mb-3 relative inline-block">
            Discover Our Product Categories
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-earth-terracotta rounded-full"></span>
          </h2>
          <p className="text-base text-earth-olive-dark/80 max-w-2xl mx-auto mt-3">
            Browse through our diverse range of agricultural products from trusted suppliers across the GCC region and beyond.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div 
              key={category.name}
              className={`${category.bgColor} rounded-xl p-4 card-hover shadow-sm`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-2 p-2 rounded-full bg-white/90 shadow-sm">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-earth-olive-dark mb-1">
                  {category.name}
                </h3>
                <p className="text-earth-olive-dark/80 text-sm mb-2">
                  {category.description}
                </p>
                <Link 
                  to={category.path}
                  className="mt-2 text-earth-terracotta hover:text-earth-terracotta-dark font-medium inline-flex items-center text-sm"
                >
                  Explore
                  <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
