enum RESTMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

const API_URL = process.env.REACT_APP_API_URL;

const fetchAPI = async (
  route: string,
  method: RESTMethods = RESTMethods.GET,
  body?: string
) => {
  try {
    const response = await fetch(API_URL + route, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      cache: "default",
      credentials: "include",
      body: body,
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(error);
  }
};

const getRequest = async (route: string) => {
  try {
    const getResponseData = await fetchAPI(route, RESTMethods.GET);
    return getResponseData;
  } catch (error) {
    throw new Error(error);
  }
};

const postRequest = async (route: string, body?: string) => {
  try {
    const getResponseData = await fetchAPI(route, RESTMethods.POST, body);
    return getResponseData;
  } catch (error) {
    throw new Error(error);
  }
};

export { getRequest, postRequest };
