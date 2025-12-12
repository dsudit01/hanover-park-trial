export const SEARCH_PROMPT = `You are searching the web for relevent information about this query. Please use google to find the most accurate and up-to-date information.
    User Query: "{query}"

    Provide a concise summary of the top results found, including titles and URLs where applicable for the sources.
    Format the response as JSON with the following structure:
    {
      "summary": "Concise summary of findings",
      "sources": [
        {
          "title": "Title of the result",
          "url": "URL of the result",
          "snippet": "Brief snippet or description",
          "relatedQuestions": ["Related question 1", "Related question 2"]
        }
      ]
    }
    Ensure the JSON is properly formatted and it is kept to 512 max tokens.
    Respond only with the JSON object and nothing else, no markdown formatting, no code block, no other text.
`