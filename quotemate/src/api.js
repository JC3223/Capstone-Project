const baseURL = 'http://localhost:8000';

async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${baseURL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'API Error');
  }

  return response.json();
}

// New function to get Quotations
export async function getQuotations() {
  try {
    const response = await fetchAPI('/QuotationInfo/', {
      method: 'GET', // Now it's a GET request
    });
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
//this is for delete Quotations
export async function deleteQuotation(qID) {
  try {
    const response = await fetchAPI(`/QuotationInfo/${qID}`, {
      method: 'DELETE', // Now it's a GET request
    });
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
//Corrected function
export async function processMessage(message) {
  try {
    const response = await fetchAPI('/chatbot/process-message/', { //Correct endpoint
      method: 'POST',
      body: JSON.stringify({ message }),
    });
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
