export const fetchJobs = async (offset) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    limit: 10,
    offset,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  const response = (
    await fetch(
      'https://api.weekday.technology/adhoc/getSampleJdJSON',
      requestOptions
    )
  ).json();
  const data = await response;
  return data;
};
