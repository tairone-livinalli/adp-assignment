const app = require('./config/app')
const env = require('./config/env')
const axios = require('axios')

app.listen(env.port, async () => {
  const localApiBaseUrl = `http://localhost:${env.port}`
  console.log(`Server running at ${localApiBaseUrl}`)

  try {
    setInterval(async () => {
      const { data: task } = await axios.get(`${env.adpBaseUrl}/get-task`)

      console.log('-------------------------------')
      console.log('Received task:')
      console.log(`Id: ${task.id}`)
      console.log(`Operation: ${task.operation}`)
      console.log(`Left: ${task.left}`)
      console.log(`Right: ${task.right}`)

      const { data: calculatedTask } = await axios.post(`${localApiBaseUrl}/api/tasks`, { ...task })

      const { data: isTaskCorrect } = await axios.post(`${env.adpBaseUrl}/submit-task`, { ...calculatedTask })

      console.log(`Processed task of id: ${task.id} and result: ${calculatedTask.result} is: ${isTaskCorrect}`)
    }, 5000)
  } catch (e) {
    console.error(e)
  }
})
