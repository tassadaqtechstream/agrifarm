import React from "react";

interface Category {
    id: number;
    name: string;
    icon: string;
}

const categories: Category[] = [
    { id: 1, name: "All", icon: "" },
    { id: 2, name: "Fruits", icon: "🍎" },
    { id: 3, name: "Vegetables", icon: "🥦" },
    { id: 4, name: "Grains", icon: "🌾" },
    { id: 5, name: "Spices", icon: "🌶️" },
    { id: 6, name: "Flowers", icon: "🌸" },
    { id: 7, name: "Livestock", icon: "🐄" },
    { id: 8, name: "Dairy & Eggs", icon: "🥚" },
    { id: 9, name: "More", icon: "..." },
];

const CategoryFilters: React.FC = () => {
    return (
        <div className="flex flex-wrap gap-3 justify-center category-filters">
            {categories.map((category) => (
                <button
                    key={category.id}
                    className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${
                        category.id === 1
                            ? "hover:bg-primary/90 h-10 px-4 py-2 rounded-full bg-earth-olive text-white"
                            : "border bg-background hover:text-accent-foreground h-10 px-4 py-2 rounded-full text-earth-olive-dark border-earth-olive/30 hover:bg-earth-olive/5"
                    }`}
                >
                    {category.icon && <span className="mr-2">{category.icon}</span>}
                    {category.name}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilters;
