exports.handler = async function(event, context) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    };
  
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: headers,
        body: ''
      };
    }
  
    if (event.httpMethod !== 'GET') {
      return { 
        statusCode: 405, 
        headers: headers,
        body: 'Method Not Allowed' 
      }
    }
  
    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: "online" })
    };
  };