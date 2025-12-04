import React, { Suspense } from "react";
import SubmitPage from "../../../component/Yubi/SubmitPage";
function page() {
  return (
    <div>
      <Suspense fallback={<></>}>
        <div>
          <SubmitPage />
        </div>
      </Suspense>
    </div>
  );
}

export default page;
