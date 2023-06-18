import axios from 'axios'
import { Configuration, OpenAIApi } from 'openai'

import { message } from 'antd'

/* GPT KEY */
const GPT_KEY = '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'

const GPT_KEY_0618 = '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'

const ORGANAZITION = 'org-710rWrUjqW0hgrsoSdY5baXh'
const url = 'https://api.openai.com/v1/chat/completions'
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${GPT_KEY_0618}`,
}

const data = {
  model: 'gpt-3.5-turbo',
  // model: 'gpt-3.5-turbo-0613',
  messages: [
    // { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Who won the world series in 2020?' },
  ],
}
const fetchRequest = () => {
  console.log('@@fetchRequest in login is -----')
  message.info('发起请求----')
  axios
    .post(url, data, { headers })
    .then((response) => {
      const reply = response.data.choices[0].message.content
      console.log('ChatGPT reply:', reply)
      // 进行进一步处理或展示生成的回复消息
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

const configuration = new Configuration({
  apiKey: GPT_KEY_0618,
})
const openai = new OpenAIApi(configuration)

const fetchRequestNode = async () => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Hello world' },
    ],
  })
  console.log(completion.data.choices[0].message)
}

export { fetchRequest, fetchRequestNode }
