"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useSession, signIn, signOut } from "next-auth/react";

function getFirstTwoCapitalLetters(str?: string | null) {
  const match = (str || "").match(/[A-Z]/g);
  return match ? match.slice(0, 2).join("") : "GT";
}

export default function UserButton() {
  const { data: session, status } = useSession();

  console.log(session);

  return (
    <div>
      {status === "authenticated" && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain */}
              <AvatarImage src={session?.user?.image!} />
              <AvatarFallback>
                {getFirstTwoCapitalLetters(session?.user?.name)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                signOut();
              }}
            >
              SignOUt
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {status === "unauthenticated" && (
        <Button
          onClick={() => {
            signIn();
          }}
        >
          Sign in
        </Button>
      )}
    </div>
  );
}
