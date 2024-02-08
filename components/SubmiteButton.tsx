"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export const SubmiteButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-fit">Save now</Button>
      )}
    </>
  );
};

export const StripeSubscriptionButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          Create subscription
        </Button>
      )}
    </>
  );
};


export function StripePortal(){
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-fit">
          View payment
        </Button>
      )}
    </>
  );
}