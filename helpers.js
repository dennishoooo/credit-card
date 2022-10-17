import fetch from "node-fetch";

// function _uuid() {
//   var d = Date.now();
//   if (
//     typeof performance !== "undefined" &&
//     typeof performance.now === "function"
//   ) {
//     d += performance.now(); //use high-precision timer if available
//   }
//   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
//     var r = (d + Math.random() * 16) % 16 | 0;
//     d = Math.floor(d / 16);
//     return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
//   });
// }

// for (var i = 0; i < 10; i++) {
//   console.log(_uuid());
// }

export async function getFetchApi(url, accessToken) {
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
