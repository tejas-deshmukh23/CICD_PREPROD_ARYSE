import axios from 'axios';

export const select = async (payloadForSelect) => {
  try {

    console.log("The payload for select before hitting the api is : ",payloadForSelect);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}select`,payloadForSelect,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic dXNlcjphNzc5NmI1Mi02MDgyLTQ2Y2EtOWIyOC0yZjU0ODUyYTI3ZDc=",
        },
      }
    );

    // console.log("the response when the status is : ",payloadForSelect," and the response is : ",response);

    return response;
  } catch (error) {
    console.log("Error in select API:", error);
  }
};

export const init = async (payloadForInit) => {
  try {

    console.log("The payload for init before hitting the api is : ",payloadForInit);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}init`,payloadForInit,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic dXNlcjphNzc5NmI1Mi02MDgyLTQ2Y2EtOWIyOC0yZjU0ODUyYTI3ZDc=",
        },
      }
    );

    // console.log("the response when the status is : ",payloadForInit," and the response is : ",response);

    return response;
  } catch (error) {
    console.log("Error in init API : ", error);
  }
};

export const confirm = async (payloadForConfirm) => {
  try {

    console.log("The payload for confirm before hitting the api is : ",payloadForConfirm);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}confirm`,payloadForConfirm,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic dXNlcjphNzc5NmI1Mi02MDgyLTQ2Y2EtOWIyOC0yZjU0ODUyYTI3ZDc=",
        },
      }
    );
    // console.log("the response when the status is : ",payloadForConfirm," and the response is : ",response);
    return response;
  } catch (error) {
    console.log("Error in confirm API : ", error);
  }
};
