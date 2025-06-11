import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

const Pagination = ({
  className,
  currentPage,
  totalPages,
  ...props
}: React.ComponentProps<"nav"> & { currentPage: number; totalPages: number }) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("ml-auto flex w-full justify-end mt-5", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
  disabled?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"button">

const PaginationLink = ({
  className,
  isActive,
  disabled,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <button
    aria-current={isActive ? "page" : undefined}
    disabled={disabled}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      disabled && "opacity-30 cursor-not-allowed",
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  currentPage,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { currentPage: number }) => {
  const { t } = useTranslation()

  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      disabled={currentPage === 1}
      className={cn("gap-1 pl-2.5", className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>{t("buttons.previous")}</span>
    </PaginationLink>
  )
}

const PaginationNext = ({
  className,
  currentPage,
  totalPages,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  currentPage: number
  totalPages: number
}) => {
  const { t } = useTranslation()

  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      disabled={currentPage === totalPages}
      className={cn("gap-1 pr-2.5", className)}
      {...props}
    >
      <span>{t("buttons.next")}</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  )
}

PaginationPrevious.displayName = "PaginationPrevious"

PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
