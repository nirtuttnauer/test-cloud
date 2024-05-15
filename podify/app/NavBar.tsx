"use client"

import * as React from "react"
import Link from "next/link"
import { SelectBook } from "./SelectBook"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useBook } from "@/contexts/BookContext"
import { set } from "react-hook-form"


export default function NavBar() {
  const { selectedBook, setSelectedBook } = useBook();
  return (
    <div className="flex justify-center py-4 mb-1§0">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
          <SelectBook
          selectedBook={selectedBook}
          onSelectBook={setSelectedBook}
          />
            </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Options</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Home
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        The Best Place to Find Podcasts By Tomer Mizrahi
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/AddPod" title="Add New Podcast">
                  Add a new podcast to the list.
                </ListItem>
                <ListItem href="/DelPod" title="Delete a Podcast">
                  Delete a podcast from the list.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
