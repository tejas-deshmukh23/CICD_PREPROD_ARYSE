// "use client";

import React,{Suspense} from "react";
import RedirectingPageOnRysa from "../../../component/Yubi/RedirectingPageOnRysa";
// import { useSearchParams } from "next/navigation";

export default function Page({ params }) {
  // const searchParams = useSearchParams();

  return (
   
      <Suspense fallback={<></>}>
         <div>
      <RedirectingPageOnRysa params={params} />
      </div>
      </Suspense>
  );
}
