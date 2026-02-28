"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "support"
  timestamp: Date
}

export function LiveChatWidget() {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: language === "tr" ? "Merhaba! Size nasıl yardımcı olabilirim?" : "Hello! How can I help you today?",
      sender: "support",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setInputMessage("")

    // Simulate auto-reply
    setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        text:
          language === "tr"
            ? "Mesajınız için teşekkürler. Bir temsilcimiz en kısa sürede size dönüş yapacaktır."
            : "Thank you for your message. A representative will get back to you shortly.",
        sender: "support",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, autoReply])
    }, 1000)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">{language === "tr" ? "Canlı Destek" : "Live Support"}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString(language === "tr" ? "tr-TR" : "en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex gap-2"
              >
                <Input
                  placeholder={language === "tr" ? "Mesajınızı yazın..." : "Type your message..."}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
