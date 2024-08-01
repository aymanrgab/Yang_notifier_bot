const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET })

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': 'chrome-extension://cghfdfnnfndgopbgmphmljjjbegnkeep',
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

  const extensionId = event.queryStringParameters.extensionId
  
  try {
    const response = await client.query(
      q.Get(q.Match(q.Index('extension_by_id'), extensionId))
    )
    
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ action: response.data.action })
    }
  } catch (error) {
    return {
      statusCode: 400,
      headers: headers,
      body: JSON.stringify({ error: 'Failed to retrieve control action' })
    }
  }
}