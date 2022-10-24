import fetch from "node-fetch";

export async function getFetchApi(url: string, accessToken: string) {
  try {
    let response = await fetch(url, {
      headers: {
        Authorization: accessToken,
      },
    });
    let result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function postFetchApi(
  url: string,
  body: any,
  accessToken: string
) {
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(body),
    });
    let result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}
