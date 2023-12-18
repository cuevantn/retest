import { RetestBlockClient } from "@/lib/retest/client";
import { RetestBlockServer } from "@/lib/retest/server";

import { Button } from "@retestlabs/ui/button";
import Link from "next/link";
function Page(): JSX.Element {
  return (
    <main className="mx-auto w-max text-center space-y-4 my-4">
      <h1 className="font-bold text-lg">Server rendered page</h1>
      <div className="flex space-x-8">
        <RetestBlockServer
          experiment="mobile-hamburguer-icon-experiment"
          variant="variantA"
        >
          <Button>Variant A Server Component</Button>
        </RetestBlockServer>

        <RetestBlockClient
          experiment="mobile-hamburguer-icon-experiment"
          variant="variantA"
        >
          <Button>Variant A Client Component</Button>
        </RetestBlockClient>
      </div>

      <Button variant="secondary" asChild>
        <Link href="/client-page">Go to Client Page</Link>
      </Button>
    </main>
  );
}

export default Page;
