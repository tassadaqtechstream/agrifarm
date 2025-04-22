import React, { useState } from "react";

interface FilterState {
    priceRange: [number, number];
    isOrganic: boolean;
    locations: string[];
}

interface FilterSidebarProps {
    onFilterChange?: (filters: FilterState) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState<FilterState>({
        priceRange: [0, 20],
        isOrganic: false,
        locations: [],
    });

    const locations = ["Saudi Arabia", "UAE", "Qatar", "Kuwait", "Oman", "Bahrain"];

    const handlePriceChange = (value: number) => {
        const newFilters: FilterState = {
            ...filters,
            priceRange: [filters.priceRange[0], value] as [number, number],
        };
        setFilters(newFilters);
        onFilterChange?.(newFilters);
    };

    const handleOrganicChange = (checked: boolean) => {
        const newFilters: FilterState = {
            ...filters,
            isOrganic: checked,
        };
        setFilters(newFilters);
        onFilterChange?.(newFilters);
    };

    const handleLocationChange = (location: string) => {
        const newLocations = filters.locations.includes(location)
            ? filters.locations.filter((l) => l !== location)
            : [...filters.locations, location];

        const newFilters: FilterState = {
            ...filters,
            locations: newLocations,
        };
        setFilters(newFilters);
        onFilterChange?.(newFilters);
    };

    const handleReset = () => {
        const newFilters: FilterState = {
            priceRange: [0, 20],
            isOrganic: false,
            locations: [],
        };
        setFilters(newFilters);
        onFilterChange?.(newFilters);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-earth-olive-dark">Filters</h3>
                <button
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent py-2 h-8 px-2 text-sm text-earth-terracotta hover:text-earth-terracotta-dark"
                >
                    Reset All
                </button>
            </div>

            <div className="shrink-0 bg-border h-[1px] w-full my-4"></div>

            <div className="mb-6">
                <h4 className="text-sm font-medium mb-2 text-earth-olive-dark">Price Range</h4>
                <div className="relative flex w-full touch-none select-none items-center mb-2">
                    <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                        <div
                            className="absolute h-full bg-primary"
                            style={{
                                left: `${(filters.priceRange[0] / 20) * 100}%`,
                                right: `${100 - (filters.priceRange[1] / 20) * 100}%`,
                            }}
                        ></div>
                    </div>
                    <div
                        className="absolute h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        style={{ left: `calc(${(filters.priceRange[1] / 20) * 100}% - 10px)` }}
                        onMouseDown={(e) => {
                            const slider = e.currentTarget.parentElement;
                            if (!slider) return;

                            const handleMouseMove = (e: MouseEvent) => {
                                const rect = slider.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const percentage = Math.max(0, Math.min(1, x / rect.width));
                                const value = Math.round(percentage * 20);
                                handlePriceChange(value);
                            };

                            const handleMouseUp = () => {
                                document.removeEventListener("mousemove", handleMouseMove);
                                document.removeEventListener("mouseup", handleMouseUp);
                            };

                            document.addEventListener("mousemove", handleMouseMove);
                            document.addEventListener("mouseup", handleMouseUp);
                        }}
                    ></div>
                </div>
                <div className="flex justify-between text-sm text-earth-olive-dark/70">
                    <span>${filters.priceRange[0].toFixed(2)}</span>
                    <span>${filters.priceRange[1].toFixed(2)}</span>
                </div>
            </div>

            <div className="shrink-0 bg-border h-[1px] w-full my-4"></div>

            <div className="mb-6">
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="organic"
                        checked={filters.isOrganic}
                        onChange={(e) => handleOrganicChange(e.target.checked)}
                        className="h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <label
                        htmlFor="organic"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-earth-olive-dark"
                    >
                        Organic Products Only
                    </label>
                </div>
            </div>

            <div className="shrink-0 bg-border h-[1px] w-full my-4"></div>

            <div className="mb-6">
                <h4 className="text-sm font-medium mb-2 text-earth-olive-dark">Country of Origin</h4>
                <div className="space-y-2">
                    {locations.map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={`location-${location}`}
                                checked={filters.locations.includes(location)}
                                onChange={() => handleLocationChange(location)}
                                className="h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <label
                                htmlFor={`location-${location}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-earth-olive-dark"
                            >
                                {location}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
