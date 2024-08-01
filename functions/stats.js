const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET })

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': 'chrome-extension://cghfdfnnfndgopbgmphmljjjbegnkeep',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers: headers,
      body: 'Method Not Allowed' 
    }
  }

  const { extensionId, isRunning, lastActive } = JSON.parse(event.body)

  try {
    await client.query(
      q.Create(
        q.Collection('extension_stats'),
        {
          data: { extensionId, isRunning, lastActive }
        }
      )
    )

    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ message: 'Stats recorded successfully' })
    }
  } catch (error) {
    return {
      statusCode: 400,
      headers: headers,
      body: JSON.stringify({ error: 'Failed to record stats' })
    }
  }
}