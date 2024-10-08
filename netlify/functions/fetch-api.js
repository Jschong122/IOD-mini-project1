const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const dogName = event.queryStringParameters.name;
  const apiKey = process.env.API_KEY;

  const apiUrl = `https://api.api-ninjas.com/v1/dogs?name=${dogName}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error: ${error.message}`,
    };
  }
};
