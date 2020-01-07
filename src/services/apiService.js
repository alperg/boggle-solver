// API Service

// Fetches words from the Rapid API endpoint based on letters passed
// Parameter letters should be a string with length of 16 characters
export async function fetchWords(letters) {
  const url = `https://codebox-boggle-v1.p.rapidapi.com/${letters}`;
  
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Host': 'codebox-boggle-v1.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY
    }
  };

  const response = await fetch(url, options);

  return await response.json();
};
