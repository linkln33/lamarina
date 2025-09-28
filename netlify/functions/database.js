// Netlify function for database operations
exports.handler = async (event, context) => {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      },
      body: '',
    };
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const { method, path } = event;
    const body = event.body ? JSON.parse(event.body) : {};

    // Route handling
    if (path.includes('/listings')) {
      if (method === 'GET') {
        // Get all listings
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ listings: [] }),
        };
      } else if (method === 'POST') {
        // Create new listing
        const listing = {
          id: Date.now().toString(),
          ...body,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({ listing }),
        };
      }
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server error' }),
    };
  }
};


