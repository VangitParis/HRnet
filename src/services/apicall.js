/**
 * Performs an API call with the provided parameters.
 *
 * @param {string} url - The URL of the API.
 * @param {string} method - The HTTP method (GET, POST, PUT, etc.).
 * @param {Object} [data=null] - The data to be sent with the request (null if no data is required).
 * @returns {Promise<Object>} - A promise with the JSON response data from the API.
 * @throws {Error} - An error if the request fails.
 */
export async function callApi(url, data, method) {
  const headers = {
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method,
    headers,
  };
  if (data) {
    requestOptions.body = JSON.stringify(data);
  }
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error("Error during the promise");
       }
       const responseData = await response.json();
       return responseData;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  