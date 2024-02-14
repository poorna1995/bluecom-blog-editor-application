// This function is used for fetching data from authentication apis/ app apis
async function appFetch(url = "", data = {}, method) {
  // try {
  const response = await fetch(url, {
    method: method || "POST",
    // mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.error(response);
    throw Error("Problem in loading data!");
  }
  return response.json();
}

export default appFetch;
