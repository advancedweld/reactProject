import { Configuration, OpenAIApi } from 'openai'

/* GPT KEY */
const GPT_KEY = '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'

const GPT_KEY_0618 = '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'

const ORGANAZITION = 'org-710rWrUjqW0hgrsoSdY5baXh'

const configuration = new Configuration({
  apiKey: GPT_KEY_0618,
})
const openai = new OpenAIApi(configuration)

const requestGpt = async () => {
  /* generate image */
  // const response = await openai.createImage({
  //   prompt: 'A cute baby sea otter',
  //   n: 2,
  //   size: '1024x1024',
  // })

  /* 完成 */
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'Say this is a test',
    max_tokens: 7,
    temperature: 0,
  })
  console.log(response)
}

export { requestGpt }
