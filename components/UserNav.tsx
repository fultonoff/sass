
'use client'
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Home, Settings, CreditCard, DoorClosed } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";


export const navItems = [
  {
    name: "Home",
    href: "/dashboard",
    icon: Home,
    id: 1,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    id: 2,
  },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
    id: 3,
  },
];

export const UserNav = ({name, email, image}: {name:string, email: string, image: string}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full relative w-10 h-10">
          <Avatar className="w-10 h-10 rounded-full">
            <AvatarImage src={image} alt="" />
            <AvatarFallback>Supa</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navItems.map((item) => {
            return (
              <DropdownMenuItem asChild key={item.id}>
                <Link href={item.href} className="w-full flex justify-between items-center">
                  
                  {item.name}
                <item.icon className="w-4 h-4"/>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator/>
          <DropdownMenuItem className="flex w-full justify-between items-center" asChild>
            <LogoutLink>
          Logout 
          <span><DoorClosed className="h-4 w-4"/></span>

            </LogoutLink>
          </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
