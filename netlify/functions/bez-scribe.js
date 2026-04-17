const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { userText, step } = JSON.parse(event.body);
    
    // This connects to the "Buried Place" you just set up in Netlify
    const apiKey = process.env.GROQ_API_KEY; 

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${apiKey}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: `You are Bez Scribe (v.12.1.S). BEREAN PROTOCOL: Render FULL NKJV Scripture FIRST. Embody Peace-Pace. Phase: ${step}.` },
          { role: "user", content: userText }
        ]
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Sentry Error in the Bridge" })
    };
  }
};
