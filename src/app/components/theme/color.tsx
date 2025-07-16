// Color utility for consistent theming
// Import this file when you need to use these predefined colors
// These colors match Radix UI's theme tokens

export const colors = {
  // Jade colors (Radix UI jade theme)
  jade: {
    primary: "var(--jade-9)", // Main jade color
    soft: "var(--jade-3)", // Light jade background
    surface: "var(--jade-2)", // Very light jade surface
    outline: "var(--jade-8)", // Jade for borders/outlines
    text: "var(--jade-12)", // Dark jade for text
    hover: "var(--jade-10)", // Hover state
    pressed: "var(--jade-11)", // Pressed state
  },
  
  // Mauve colors (Radix UI mauve theme)
  mauve: {
    primary: "var(--mauve-9)", // Main mauve color
    soft: "var(--mauve-3)", // Light mauve background
    surface: "var(--mauve-2)", // Very light mauve surface
    outline: "var(--mauve-8)", // Mauve for borders/outlines
    text: "var(--mauve-12)", // Dark mauve for text
    hover: "var(--mauve-10)", // Hover state
    pressed: "var(--mauve-11)", // Pressed state
  },
  
  // Red colors (Radix UI red theme)
  red: {
    primary: "var(--red-9)", // Main red color
    soft: "var(--red-3)", // Light red background
    surface: "var(--red-2)", // Very light red surface
    outline: "var(--red-8)", // Red for borders/outlines
    text: "var(--red-12)", // Dark red for text
    hover: "var(--red-10)", // Hover state
    pressed: "var(--red-11)", // Pressed state
  },
};

// Helper function to get color with opacity
export const getColorWithOpacity = (color: string, opacity: number) => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Tailwind CSS classes for easy use
// Note: These are fallback classes, but using CSS variables above is preferred
export const colorClasses = {
  jade: {
    primary: "bg-emerald-500 text-white",
    soft: "bg-emerald-50 text-emerald-800",
    surface: "bg-emerald-25 text-emerald-900",
    outline: "border-emerald-500 text-emerald-500 bg-transparent",
  },
  mauve: {
    primary: "bg-purple-500 text-white",
    soft: "bg-gray-50 text-gray-800",
    surface: "bg-gray-25 text-gray-900",
    outline: "border-purple-500 text-purple-500 bg-transparent",
  },
  red: {
    primary: "bg-red-500 text-white",
    soft: "bg-red-50 text-red-800",
    surface: "bg-red-25 text-red-900",
    outline: "border-red-500 text-red-500 bg-transparent",
  },
};
