import axios from "axios";
import { generateTransactionId } from "../KeyGenerationApis/KeyGeneration";

export const Search = async (
  setFormSubmissionData,
  formSubmissionData,
  mobileNumber,
  panNumber,
  uid,
  setUId
) => {
  const UIDResponse = await checkUIDWithinSevenDays(mobileNumber);
  if (UIDResponse === true) {
    //returning from here because user already have hit search api within 7 days
    return;
  }

  //If here we haven't hit the search api before for this user then firstly we will check the bre and getSortedProducts for this user
  const sortedLendersResponse = await getSortedLenders(mobileNumber, panNumber);
  // if()
  if (sortedLendersResponse === false) {
    //here we shall be reidrecting to embedded list of credithaat because user got no product
    return;
  }

  try {
    const transactionIdResponse = await generateTransactionId();
    setUId(transactionIdResponse.data); // ✅ safe now

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}search`,
      {
        transactionId: transactionIdResponse.data,
        mobileNumber: mobileNumber,
        stage: 1,
      },
      {
        headers: {
          "Content-Type": "application/json", // ✅ Proper header
        },
      }
    );

    // ======== Add MIS save call here =========================================================
    const offerFlag = response.status === 200 ? 1 : 0; // 1 if success, 0 if failed

    try {
      const misResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}api/mis/saveTransactionId`,
        null, // body is null since we are sending params
        {
          params: {
            mobileNumber: mobileNumber,
            transactionId: transactionIdResponse.data,
            // offerFlag: offerFlag, // pass offerFlag here
          },
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("MIS saveTransactionId response:", misResponse.data);
    } catch (misError) {
      console.error(
        "Error saving transactionId and offerFlag to MIS:",
        misError
      );
    }

    // ====================================================================================================

    if (response.status === 200) {
      console.log("Search API call successful");

      if (response.data.gateway_response?.message?.ack?.status === "ACK") {
        console.log("Search acknowledged, waiting for callbacks...");

        // Set data dynamically from response
        const formData = response.data.ONDCFormData;

        console.log("The formData is : ", formData);

        // alert("tejas");

        if (formData) {
          setFormSubmissionData(formData);
        } else {
          console.warn("No form data returned from backend.");
        }
      } else {
        console.log("Search not acknowledged:", response.data);
      }
    }
  } catch (error) {
    console.log("error while hitting search api : ",error);
  }
};

const checkUIDWithinSevenDays = async (mobileNumber) => {
  try {
    const response = await callbacksLoadByMobileNumber(mobileNumber);

    // const sevenDaysAgo = new Date();
    // sevenDaysAgo.setDate(now.getDate() - 7);
    //here we will firsst check that the callback that we got are of within seven days are not
    //pending.....
    return response;
  } catch (error) {
    console.log("The error we got in checkUIDWithinSevenDays is : ", error);
    return false;
  }
};

const callbacksLoadByMobileNumber = async (mobileNumber) => {
  try {
    const formData = new FormData();
    formData.append("mobileNumber", mobileNumber);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}getFirstPageData`,
      formData
    );

    if (response.status === 200) {
      console.log("The response that we got is : ", response);
      if (response.data && response.data.length > 0) {
        // const processDataResponse = await processData(response.data);
        // console.log("The processDataResponse is : ", processDataResponse);
        const filteredResponse = response.data.filter((item) => !item.error);

        if (filteredResponse.length > 0) {
          //here we will check if their is any onSelect
          const selectResponse = filteredResponse.filter(
            (item) => item.context.action === "on_select"
          );
          // setOnSelectResponses((prev) => [...prev, selectResponse]);

          const firstTimestamp =
            filteredResponse[0].context?.timestamp || response[0].timestamp;

          const now = new Date();
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(now.getDate() - 7);

          const itemDate = new Date(firstTimestamp);

          const isWithinSevenDays = itemDate >= sevenDaysAgo && itemDate <= now;

          console.log("Result of isWithinSevenDays is : ", isWithinSevenDays);
          // const sevenDaysAgo = new Date();
          // sevenDaysAgo.setDate(now.getDate() - 7);

          // return true;
          return isWithinSevenDays;
        }
      } else {
        // router.push(`/ondc?mobilenumber=${mobileNumber}`);
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log("getting errors while loading the callbacks : ", error);
    return false;
  }
};

const getSortedLenders = async (mobileNumber, panNumber) => {
  try {
    const formData = new FormData();
    formData.append("mobile", mobileNumber);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}getSortedProducts`,
      {
        params: {
          mobile: mobileNumber,
        },
      }
    );

    if (response.status === 200) {
      if (Object.keys(response.data).length >= 1) {
        if (Object.keys(response.data).length === 1) {
          // const hdbObject = response.data.find(item => item.productName === "HDB");
          const hdbObject = response.data.find(
            (item) => item.productName?.toLowerCase() === "hdb"
          );

          if (hdbObject) {
            return false;
          }
        }

        try {
          const otpPayload = {
            Mobilenumber: mobileNumber,
            pan: panNumber,
          };
          const digitapResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/digitapapi`,
            otpPayload
          );

          console.log("digitap uan api response is as below:", digitapResponse);

          let message = "";
          try {
            // The response structure shows `msg` is a stringified JSON
            const parsedMsg = JSON.parse(digitapResponse.data.msg);
            message = parsedMsg?.message || "";
          } catch (e) {
            console.warn("⚠️ Failed to parse msg JSON:", e);
          }

          // Step 3️⃣ — If message contains "No record(s) found", hit the PAN API
          if (message.includes("No record(s) found")) {
            console.log("ℹ️ No record found — hitting PAN API...");

            const digitapPanResponse = await axios.post(
              `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/digitappanapi`,
              otpPayload
            );

            console.log(
              "✅ Digitap PAN API Response:",
              digitapPanResponse.data
            );
            // return digitapPanResponse.data;
          } else {
            console.log("✅ Record found — using UAN API response.");
            // return digitapResponse.data;
          }
        } catch (error) {
          console.log("digitap error", error);
        }
        console.log("setting the sortedProduct flag as true");
        // setGotSortedProductFlag(true);
        // useWebSocketONDC(handleWebSocketMessage);
        return true;
      } else if (Object.keys(response.data).length === 0) {
        return false;
        // handleEmbeddedRedirection();
      }
    }

    return false;
  } catch (error) {
    console.log("error in fetching lenders by pincode : ", error);
    return false;
  }
};
