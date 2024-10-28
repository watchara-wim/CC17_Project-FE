import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
   "inline-flex items-center justify-center whitespace-nowrap rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
   {
      variants: {
         variant: {
            default: "bg-brand-gray hover:bg-brand-darkgray hover:text-white",
            link: "no-underline border-0 hover:bg-brand-gray hover:text-black disabled:bg-brand-gray",
            brand: "bg-brand-pinegreen text-white border-0 hover:bg-brand-teal hover:scale-110 transition-transform duration-200",
            white: "bg-white border hover:bg-brand-gray",
            select: "bg-brand-green text-white border-0",
            add: "bg-brand-green text-white border-0 hover:bg-green-800",
            confirm: "bg-brand-blue text-white border-0 hover:bg-blue-800",
            cancel: "bg-brand-crimson text-white border-0 hover:bg-red-800",
         },
         size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 px-3 py-1",
            lg: "h-12 px-6 py-3",
            icon: "h-10 w-10",
         },
      },
      defaultVariants: {
         variant: "default",
         size: "default",
      },
   }
);

const Button = ({
   variant,
   size,
   className,
   type = "button",
   children,
   ...props
}) => {
   const buttonClass = cn(buttonVariants({ variant, size }), className);

   return (
      <button className={buttonClass} type={type} {...props}>
         {children}
      </button>
   );
};

export default Button;
