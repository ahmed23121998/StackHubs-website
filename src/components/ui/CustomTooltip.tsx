import React from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface CustomTooltipProps {
  label: string; // النص اللي هيظهر في التولتيب
  side?: "top" | "bottom" | "left" | "right"; // اتجاه الظهور
  align?: "start" | "center" | "end"; // محاذاة التولتيب
  children: React.ReactNode; // العنصر اللي بيظهر فوقه التولتيب
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  label,
  side = "bottom",
  align = "center",
  children,
}) => {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-lg"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
