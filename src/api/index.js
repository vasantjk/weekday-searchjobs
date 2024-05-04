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

  try {
    const response = await fetch(
      'https://api.weekday.technology/adhoc/getSampleJdJSON',
      requestOptions
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle the error
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error for the caller to handle
  }
};
