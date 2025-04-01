let lastAnswer = ''; // Global variable to store the last response

const GEMINI_API_KEY = 'AIzaSyA3X-Xhs581e-sr2-arX2_ZWrt7_pvWS94';

const SYSTEM_PROMPT = `You are an expert women's health advisor with deep knowledge in gynecology, obstetrics, mental health, and general wellness. 
You speak like a caring friend who understands both the medical and emotional aspects of women's health. 
Provide empathetic, evidence-based, and human responses strictly related to women's health, especially addressing "how to" queries (e.g., how to wear sanitary pads, how to prevent HIV). 
Respond in a warm and conversational tone. 
Be sensitive to cultural differences, and always encourage consulting healthcare providers for personal advice.`;

const SIMPLE_INSTRUCTION = `\n\nThe user requested a simpler explanation. Please reexplain the following answer using plain language and simpler terms:\n\n`;

export async function generateResponse(prompt) {
  try {
    const trimmedPrompt = prompt.trim();
    
    // Handle greetings in a conversational manner.
    if (/^\s*(hello|hi|hey)\b/i.test(trimmedPrompt)) {
      return "Hey, I'm a women's health chatbot. How can I help you today? Feel free to share what's on your mind.";
    }
    
    // Handle polite responses such as "thank you" or "ok"
    if (/^(thank(s| you)|ok)$/i.test(trimmedPrompt)) {
      return "I'm happy to assist you anytime.";
    }
    
    // Check if the user is asking for a simpler explanation.
    const simplerRequest = /reexplain|explain for a dummy|explain more|i\s*didn't understand/i.test(trimmedPrompt);
    
    let combinedPrompt = '';
    if (simplerRequest && lastAnswer) {
      // Build a prompt to simplify the previous answer.
      combinedPrompt = `${SYSTEM_PROMPT}${SIMPLE_INSTRUCTION}${lastAnswer}`;
    } else {
      // Check if the question is related to women's health.
      const lowerPrompt = trimmedPrompt.toLowerCase();
     if (
  !(
    lowerPrompt.includes('women') ||
    lowerPrompt.includes('female') ||
    lowerPrompt.includes('womens health') ||
    lowerPrompt.includes('pregnancy') ||
    lowerPrompt.includes('prenatal') ||
    lowerPrompt.includes('postnatal') ||
    lowerPrompt.includes('antenatal') ||
    lowerPrompt.includes('obstetric') ||
    lowerPrompt.includes('gynecology') ||
    lowerPrompt.includes('menstruation') ||
    lowerPrompt.includes('period') ||
    lowerPrompt.includes('menstrual cycle') ||
    lowerPrompt.includes('sanitary pad') ||
    lowerPrompt.includes('tampon') ||
    lowerPrompt.includes('breast') ||
    lowerPrompt.includes('pcos') ||
    lowerPrompt.includes('polycystic ovary') ||
    lowerPrompt.includes('fertility') ||
    lowerPrompt.includes('hiv') ||
    lowerPrompt.includes('uterus') ||
    lowerPrompt.includes('womb') ||
    lowerPrompt.includes('ovary') ||
    lowerPrompt.includes('ovulation') ||
    lowerPrompt.includes('menopause') ||
    lowerPrompt.includes('endometriosis') ||
    lowerPrompt.includes('fibroids') ||
    lowerPrompt.includes('cervix') ||
    lowerPrompt.includes('cervical') ||
    lowerPrompt.includes('contraception') ||
    lowerPrompt.includes('birth control') ||
    lowerPrompt.includes('lactation') ||
    lowerPrompt.includes('breastfeeding') ||
    lowerPrompt.includes('ovarian cyst') ||
    lowerPrompt.includes('uterine') ||
    lowerPrompt.includes('vagina') ||
    lowerPrompt.includes('vulva') ||
    lowerPrompt.includes('vaginal') ||
    lowerPrompt.includes('luteal') ||
    lowerPrompt.includes('follicular') ||
    lowerPrompt.includes('infertility') ||
    lowerPrompt.includes('abortion') ||
    lowerPrompt.includes('miscarriage') ||
    lowerPrompt.includes('postpartum') ||
    lowerPrompt.includes('premenstrual') ||
    lowerPrompt.includes('pms') ||
    lowerPrompt.includes('pmdd') ||
    lowerPrompt.includes('heavy period') ||
    lowerPrompt.includes('light period') ||
    lowerPrompt.includes('period pain') ||
    lowerPrompt.includes('period cramps') ||
    (lowerPrompt.includes('am having') &&
      (lowerPrompt.includes('period') || lowerPrompt.includes('cramps') || lowerPrompt.includes('i have')))
  )
) {
  return "I am only a women's health chatbot and cannot answer questions related to men, politics. You can kindly rephrase your question i am just an AI i may not have understood you!";
}

      combinedPrompt = `${SYSTEM_PROMPT}\n\nUser Question: ${trimmedPrompt}`;
    }
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: combinedPrompt }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
          ]
        }),
      }
    );
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }
    
    let responseText = data.candidates[0].content.parts[0].text;
    
    // Remove any ** markers (for example, **text** becomes text)
    responseText = responseText.replace(/\*\*(.*?)\*\*/g, '$1');
    
    // Store the answer for potential reexplanation.
    lastAnswer = responseText;
    
    // Return the response as plain text.
    return responseText;
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to generate response');
  }
}
