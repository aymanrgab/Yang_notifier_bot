const faunadb = require('faunadb')
const q = faunadb.query

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
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
      body: JSON.stringify({ message: 'Stats recorded successfully' })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Failed to record stats' })
    }
  }
}
