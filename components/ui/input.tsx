import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & {
    maxLength?: number;
    minLength?: number;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    addonBeforeWidth?: string | number;
    addonAfterWidth?: string | number;
    textRight?: boolean;
    error?:boolean,
  }
>(
  (
    {
      className,
      type,
      maxLength = 255,
      minLength = 0,
      addonBefore,
      addonAfter,
      addonBeforeWidth,
      addonAfterWidth = 70,
      textRight = false,
      error = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("flex items-center w-full", className)}>
        {addonBefore && (
          <div
            className={cn(
              "flex items-center px-2 border border-input bg-muted rounded-l-md h-9"
            )}
            style={{ width: addonBeforeWidth }}
          >
            {addonBefore}
          </div>
        )}
        <input
          type={type}
          maxLength={maxLength}
          minLength={minLength}
          className={cn(
            "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 data-[placeholder]:text-gray-400 !mt-0",
            addonAfter ? " rounded-r-none" : "",
            addonBefore ? " rounded-l-none" : "",
            "focus:outline-primary",
            textRight && "text-right",
            error
            ? "border-red-500 outline-red-500 focus:ring-red-500"
            : "",
            className
          )}
          ref={ref}
          {...props}
        />

        {addonAfter && (
          <div
            className={cn(
              "flex items-center px-2 border border-input bg-muted rounded-r-md h-9"
            )}
            style={{ width: addonAfterWidth }}
          >
            {addonAfter}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
