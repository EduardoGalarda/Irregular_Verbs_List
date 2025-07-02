"use client"

import { useState } from "react"
import { Play, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen } from "lucide-react"
import { verbs } from "@/lib/verbs-data"
import { Navigation } from "@/components/navigation"

export default function VerbListPage() {
  const [playingVerb, setPlayingVerb] = useState<string | null>(null)

  const speakText = (text: string, lang = "en-US"): Promise<void> => {
    return new Promise((resolve) => {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = lang
        utterance.rate = 0.8
        utterance.onend = () => resolve()
        speechSynthesis.speak(utterance)
      } else {
        resolve()
      }
    })
  }

  const playVerbAudio = async (verb: any) => {
    if (playingVerb === verb.id) {
      speechSynthesis.cancel()
      setPlayingVerb(null)
      return
    }

    setPlayingVerb(verb.id)

    try {
      await speakText(verb.conjugation.infinitive)
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (verb.id === "be") {
        await speakText("I am, you are, he is")
      } else {
        await speakText(`He ${verb.conjugation.simplePresent}`)
      }
      await new Promise((resolve) => setTimeout(resolve, 500))

      await speakText(verb.conjugation.pastSimple)
      await new Promise((resolve) => setTimeout(resolve, 500))

      await speakText(verb.conjugation.pastParticiple)
      await new Promise((resolve) => setTimeout(resolve, 500))

      await speakText(verb.conjugation.gerund)
    } catch (error) {
      console.error("Error playing audio:", error)
    } finally {
      setPlayingVerb(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Irregular Verbs List</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Complete list of irregular verbs with main forms: infinitive, simple present (he/she/it), past simple, past
            participle, and gerund.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center">
          <Navigation />
        </div>

        {/* Verbs List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Irregular Verbs ({verbs.length} verbs)</span>
              <Badge variant="secondary">Essential Forms</Badge>
            </CardTitle>
            <CardDescription>Essential forms of each irregular verb with Portuguese translations</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Table Header */}
            <div className="grid grid-cols-7 gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg font-semibold text-sm mb-4">
              <div>Infinitive</div>
              <div className="text-orange-600 dark:text-orange-400">Simple Present</div>
              <div>Past Simple</div>
              <div>Past Participle</div>
              <div className="text-green-600 dark:text-green-400">Gerund</div>
              <div>Translation</div>
              <div className="text-center">Audio</div>
            </div>

            {/* Verbs List */}
            <div className="space-y-2">
              {verbs.map((verb, index) => (
                <div
                  key={verb.id}
                  className={`grid grid-cols-7 gap-4 p-4 rounded-lg border transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"
                  }`}
                >
                  <div className="font-semibold text-blue-600 dark:text-blue-400">{verb.conjugation.infinitive}</div>
                  <div className="font-medium text-orange-600 dark:text-orange-400">
                    {verb.conjugation.simplePresent}
                  </div>
                  <div className="font-medium">{verb.conjugation.pastSimple}</div>
                  <div className="font-medium">{verb.conjugation.pastParticiple}</div>
                  <div className="font-medium text-green-600 dark:text-green-400">{verb.conjugation.gerund}</div>
                  <div className="text-gray-600 dark:text-gray-400">{verb.translation}</div>
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => playVerbAudio(verb)}
                      className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900"
                      disabled={playingVerb !== null && playingVerb !== verb.id}
                    >
                      {playingVerb === verb.id ? (
                        <Square className="h-4 w-4 text-red-500" />
                      ) : (
                        <Play className="h-4 w-4 text-blue-600" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Quick Reference</h3>
              <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <p>
                  <strong>Infinitive:</strong> Base form of the verb (to + verb)
                </p>
                <p className="text-orange-700 dark:text-orange-300">
                  <strong>Simple Present:</strong> Third person singular form (he/she/it) - highlighted in orange
                </p>
                <p>
                  <strong>Past Simple:</strong> Used for completed actions in the past
                </p>
                <p>
                  <strong>Past Participle:</strong> Used in perfect tenses and passive voice
                </p>
                <p className="text-green-700 dark:text-green-300">
                  <strong>Gerund:</strong> Verb acting as a noun (-ing form) - highlighted in green
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
