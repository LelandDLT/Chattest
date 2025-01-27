import { useState } from 'react'
import { useChatMessages } from '~/hooks/useChatMessages'

export default function ChatInterface() {
  const [newMessage, setNewMessage] = useState('')
  const { messages, saveMessage } = useChatMessages()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    
    await saveMessage({
      content: newMessage,
      timestamp: new Date().toISOString(),
      isBot: false
    })
    setNewMessage('')
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] rounded-lg p-3 ${
              msg.isBot 
                ? 'bg-gray-100 dark:bg-gray-800 self-start'
                : 'bg-blue-500 text-white self-end'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg px-4 py-2 border dark:border-gray-700 dark:bg-gray-900"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
