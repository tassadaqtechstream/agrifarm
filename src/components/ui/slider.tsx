import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn(
            "relative flex w-full touch-none select-none items-center py-3",
            className
        )}
        {...props}
    >
      <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full bg-gradient-to-r from-gray-100 to-gray-200 shadow-inner">
        <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-earth-olive to-earth-olive-dark shadow-lg rounded-full transition-all duration-300 ease-out" />
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb className="block h-6 w-6 rounded-full border-3 border-white bg-gradient-to-br from-earth-olive to-earth-olive-dark shadow-lg ring-2 ring-earth-olive/20 ring-offset-2 ring-offset-white transition-all duration-200 ease-out hover:scale-110 hover:shadow-xl hover:ring-4 hover:ring-earth-olive/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-earth-olive focus-visible:ring-offset-2 focus-visible:scale-110 disabled:pointer-events-none disabled:opacity-50 active:scale-95" />

      {/* Second thumb for range sliders */}
      <SliderPrimitive.Thumb className="block h-6 w-6 rounded-full border-3 border-white bg-gradient-to-br from-earth-olive to-earth-olive-dark shadow-lg ring-2 ring-earth-olive/20 ring-offset-2 ring-offset-white transition-all duration-200 ease-out hover:scale-110 hover:shadow-xl hover:ring-4 hover:ring-earth-olive/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-earth-olive focus-visible:ring-offset-2 focus-visible:scale-110 disabled:pointer-events-none disabled:opacity-50 active:scale-95" />
    </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

// Alternative beautiful slider with different styling
const SliderAlt = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn(
            "relative flex w-full touch-none select-none items-center py-4",
            className
        )}
        {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-200/80 backdrop-blur-sm">
        <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 rounded-full shadow-md transition-all duration-300 ease-out" />
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb className="relative block h-5 w-5 rounded-full bg-white shadow-lg ring-2 ring-emerald-500/30 ring-offset-1 ring-offset-white transition-all duration-200 ease-out hover:scale-125 hover:shadow-xl hover:ring-emerald-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:scale-125 disabled:pointer-events-none disabled:opacity-50 active:scale-90 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-emerald-400 before:to-emerald-600 before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100" />

      <SliderPrimitive.Thumb className="relative block h-5 w-5 rounded-full bg-white shadow-lg ring-2 ring-emerald-500/30 ring-offset-1 ring-offset-white transition-all duration-200 ease-out hover:scale-125 hover:shadow-xl hover:ring-emerald-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:scale-125 disabled:pointer-events-none disabled:opacity-50 active:scale-90 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-emerald-400 before:to-emerald-600 before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100" />
    </SliderPrimitive.Root>
))
SliderAlt.displayName = "SliderAlt"

// Modern glassmorphism slider
const SliderGlass = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn(
            "relative flex w-full touch-none select-none items-center py-4",
            className
        )}
        {...props}
    >
      <SliderPrimitive.Track className="relative h-2.5 w-full grow overflow-hidden rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-inner">
        <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-blue-400/80 via-purple-500/80 to-pink-500/80 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ease-out" />
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb className="block h-6 w-6 rounded-full bg-white/90 backdrop-blur-md border border-white/50 shadow-2xl ring-2 ring-purple-500/20 ring-offset-2 ring-offset-transparent transition-all duration-200 ease-out hover:scale-110 hover:bg-white hover:shadow-purple-500/25 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:scale-110 disabled:pointer-events-none disabled:opacity-50 active:scale-95" />

      <SliderPrimitive.Thumb className="block h-6 w-6 rounded-full bg-white/90 backdrop-blur-md border border-white/50 shadow-2xl ring-2 ring-purple-500/20 ring-offset-2 ring-offset-transparent transition-all duration-200 ease-out hover:scale-110 hover:bg-white hover:shadow-purple-500/25 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:scale-110 disabled:pointer-events-none disabled:opacity-50 active:scale-95" />
    </SliderPrimitive.Root>
))
SliderGlass.displayName = "SliderGlass"

// Minimalist elegant slider
const SliderMinimal = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn(
            "relative flex w-full touch-none select-none items-center py-3",
            className
        )}
        {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-200">
        <SliderPrimitive.Range className="absolute h-full bg-gray-900 rounded-full transition-all duration-200 ease-out" />
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full bg-gray-900 shadow-md transition-all duration-150 ease-out hover:scale-125 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:scale-125 disabled:pointer-events-none disabled:opacity-50 active:scale-90" />

      <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full bg-gray-900 shadow-md transition-all duration-150 ease-out hover:scale-125 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:scale-125 disabled:pointer-events-none disabled:opacity-50 active:scale-90" />
    </SliderPrimitive.Root>
))
SliderMinimal.displayName = "SliderMinimal"

export { Slider, SliderAlt, SliderGlass, SliderMinimal }