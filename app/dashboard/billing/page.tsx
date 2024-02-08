import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import prisma from "@/app/libs/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getStripeSession } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { StripeSubscriptionButton } from "@/components/SubmiteButton";

const featureItems = [
  {
    name: "item name",
    id: 1,
  },
  {
    name: "item name",
    id: 2,
  },
  {
    name: "item name",
    id: 3,
  },
  {
    name: "item name",
    id: 4,
  },
  {
    name: "item name",
    id: 5,
  },
];

async function getData(userId: string) {
  const data = await prisma.subscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      status: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });

  return data;
}


const BillingPage = async () => {
  const {getUser} = getKindeServerSession()
  const user = await getUser();
  const data = await getData(user?.id as string);

  async function createSubscription() {
    "use server";

    const dbUser = await prisma.user.findUnique({
      where:{
        id: user?.id
      },
      select:{
        stripeCustomerId: true
      }
    })

    if (!dbUser?.stripeCustomerId) {
      throw new Error("Unable to get customer id");
    }

    const subscriptionUrl = await getStripeSession({
      customerId: dbUser.stripeCustomerId,
      domainUrl: "http://localhost:3000",
      priceId: process.env.STRIPE_PRICE_ID as string,
    });

    return redirect(subscriptionUrl);
  }
  return (
    <div className="max-w-md space-y-4 mx-auto">
      <Card className="flex flex-col">
        <CardContent className="py-8">
          <div>
            <h3 className="text-primary inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10">
              Mothly
            </h3>
          </div>
          <div className="mt-4 flex items-baseline text-6xl font-extrabold">
            $30 <span className="ml-1 text-2xl text-muted-foreground">/mo</span>
          </div>

          <div>
            <p className="mt-5 text-lg text-muted-foreground">
              Write as many notes as you want for $30
            </p>
          </div>
        </CardContent>

        <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-10 sm:pt-6">
          <ul className="space-y-4">
            {featureItems.map((item) => {
              return (
                <li key={item.id} className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="ml-3 text-base">{item.name}</p>
                </li>
              );
            })}
          </ul>

          <form className="w-full" action={createSubscription}>
            <StripeSubscriptionButton/>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default BillingPage;
