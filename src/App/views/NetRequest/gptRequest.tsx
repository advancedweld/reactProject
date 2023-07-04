import { Configuration, OpenAIApi } from 'openai'

/* GPT KEY */
const GPT_KEY = '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'

const GPT_KEY_ZHY = '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'
const ORGANAZITION = 'org-710rWrUjqW0hgrsoSdY5baXh'

const configuration = new Configuration({
  // apiKey: GPT_KEY_0618,
  apiKey: GPT_KEY_ZHY,
})
const openai = new OpenAIApi(configuration)

const requestGpt = async (requestStr: string) => {
  /* generate image */
  // const response = await openai.createImage({
  //   prompt: 'A cute baby sea otter',
  //   n: 2,
  //   size: '1024x1024',
  // })

  /* 完成 */
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: requestStr,
    // max_tokens: 7,
    temperature: 0,
  })
  return response
}

export { requestGpt }
