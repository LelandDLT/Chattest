import { useEffect, useState } from 'react'
import { createBrowserClient } from '~/utils/supabase.client'

export function useChatMessages() {
  const [messages, setMessages] = useState([])
  const supabase = createBrowserClient()

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('MessagesTable')
        .select('chat_messages')
        .single()
      
      if (data) setMessages(data.chat_messages || [])
    }

    fetchMessages()
  }, [])

  const saveMessage = async (message) => {
    const newMessages = [...messages, message]
    
    await supabase
      .from('MessagesTable')
      .upsert({ chat_messages: newMessages })
    
    setMessages(newMessages)
  }

  return { messages, saveMessage }
}
