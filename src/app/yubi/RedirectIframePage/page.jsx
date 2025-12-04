// "use client"; 

import React,{Suspense} from "react";
// import RedirectIframePage from "../../../component/Yubi/RedirectIframePage";
import RedirectIframePage from "../../../component/Yubi/WaitingpageAfterAA";
// import { useSearchParams } from "next/navigation";

export default function Page({ params }) {
  // const searchParams = useSearchParams();

  return (
  
      <Suspense fallback={<></>}>
          <div>
      <RedirectIframePage params={params} />
      </div>
      </Suspense>
  );
}
