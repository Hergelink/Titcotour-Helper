const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const correctEnglish = async (req, res) => {
  const userPrompt = req.body.editedPrompt;

  try {
    const reponse = await openai.createCompletion({
      model: 'text-davinci-003',
      // prompt: `Correct this to standard English: ${userPrompt}`,
      prompt: userPrompt,
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const aiOutput = reponse.data.choices[0].text;

    res.status(200).json({
      success: true,
      data: aiOutput,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'Promp cannot be generated',
    });
  }
};

module.exports = { correctEnglish };
