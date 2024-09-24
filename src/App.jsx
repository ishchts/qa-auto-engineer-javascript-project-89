import '@hexlet/chatbot-v2/styles'
import Widget from '@hexlet/chatbot-v2';
import steps from '@hexlet/chatbot-v2/example-steps';

function App() {
  return (
    <>
      {Widget(steps)}
    </>
  )
}

export default App
