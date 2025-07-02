"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Clock, Star } from "lucide-react"
import { verbs, type Verb } from "@/lib/verbs-data"
import { Navigation } from "@/components/navigation"

interface TenseExample {
  tense: string
  structure: string
  example: string
  translation: string
  highlighted?: boolean
}

function generateTenseExamples(verb: Verb): TenseExample[] {
  const { conjugation } = verb

  return [
    {
      tense: "Simple Present",
      structure: "I/You/We/They + base form | He/She/It + -s/-es",
      example: `I ${conjugation.infinitive} / He ${conjugation.thirdPersonSingular}`,
      translation: "Presente simples - ações habituais",
      highlighted: true,
    },
    {
      tense: "Present Continuous",
      structure: "am/is/are + -ing",
      example: `I am ${conjugation.presentParticiple}`,
      translation: "Presente contínuo - ações em progresso",
    },
    {
      tense: "Present Perfect",
      structure: "have/has + past participle",
      example: `I have ${conjugation.pastParticiple}`,
      translation: "Presente perfeito - ações concluídas com relevância presente",
    },
    {
      tense: "Present Perfect Continuous",
      structure: "have/has been + -ing",
      example: `I have been ${conjugation.presentParticiple}`,
      translation: "Presente perfeito contínuo - ações que começaram no passado e continuam",
    },
    {
      tense: "Simple Past",
      structure: "past form",
      example: `I ${conjugation.pastSimple}`,
      translation: "Passado simples - ações concluídas no passado",
    },
    {
      tense: "Past Continuous",
      structure: "was/were + -ing",
      example: `I was ${conjugation.presentParticiple}`,
      translation: "Passado contínuo - ações em progresso no passado",
    },
    {
      tense: "Past Perfect",
      structure: "had + past participle",
      example: `I had ${conjugation.pastParticiple}`,
      translation: "Passado perfeito - ações anteriores a outras no passado",
    },
    {
      tense: "Past Perfect Continuous",
      structure: "had been + -ing",
      example: `I had been ${conjugation.presentParticiple}`,
      translation: "Passado perfeito contínuo - ações contínuas anteriores a outras no passado",
    },
    {
      tense: "Simple Future",
      structure: "will + base form",
      example: `I will ${conjugation.infinitive}`,
      translation: "Futuro simples - ações futuras",
    },
    {
      tense: "Future Continuous",
      structure: "will be + -ing",
      example: `I will be ${conjugation.presentParticiple}`,
      translation: "Futuro contínuo - ações em progresso no futuro",
    },
    {
      tense: "Future Perfect",
      structure: "will have + past participle",
      example: `I will have ${conjugation.pastParticiple}`,
      translation: "Futuro perfeito - ações que estarão concluídas no futuro",
    },
    {
      tense: "Future Perfect Continuous",
      structure: "will have been + -ing",
      example: `I will have been ${conjugation.presentParticiple}`,
      translation: "Futuro perfeito contínuo - ações contínuas até um ponto no futuro",
    },
  ]
}

export default function EnglishVerbsPage() {
  const [selectedVerb, setSelectedVerb] = useState<Verb>(verbs[0])
  const tenseExamples = generateTenseExamples(selectedVerb)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">English Verbs Conjugation</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore English verb conjugations across all tenses. Select a verb to see its complete conjugation patterns.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center">
          <Navigation />
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Verb Selection Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Select Verb
                </CardTitle>
                <CardDescription>Choose a verb to explore its conjugations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {verbs.map((verb) => (
                  <Button
                    key={verb.id}
                    variant={selectedVerb.id === verb.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedVerb(verb)}
                  >
                    <div className="text-left">
                      <div className="font-semibold">{verb.infinitive}</div>
                      <div className="text-xs opacity-70">{verb.translation}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Verb Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{selectedVerb.infinitive.toUpperCase()}</CardTitle>
                    <CardDescription className="text-lg">{selectedVerb.translation}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {selectedVerb.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Infinitive</div>
                    <div className="font-semibold">{selectedVerb.conjugation.infinitive}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Past Simple</div>
                    <div className="font-semibold">{selectedVerb.conjugation.pastSimple}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Past Participle</div>
                    <div className="font-semibold">{selectedVerb.conjugation.pastParticiple}</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-2 border-orange-200 dark:border-orange-800">
                    <div className="text-sm text-orange-600 dark:text-orange-400 flex items-center justify-center gap-1">
                      <Star className="h-3 w-3" />
                      Simple Present (3rd person)
                    </div>
                    <div className="font-semibold text-orange-700 dark:text-orange-300">
                      {selectedVerb.conjugation.simplePresent}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-200 dark:border-green-800">
                    <div className="text-sm text-green-600 dark:text-green-400 flex items-center justify-center gap-1">
                      <Star className="h-3 w-3" />
                      Gerund
                    </div>
                    <div className="font-semibold text-green-700 dark:text-green-300">
                      {selectedVerb.conjugation.gerund}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tense Conjugations */}
            <Card>
              <CardHeader>
                <CardTitle>All Tenses</CardTitle>
                <CardDescription>
                  Complete conjugation of "{selectedVerb.infinitive}" across all English tenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {tenseExamples.map((tense, index) => (
                    <div key={index}>
                      <div
                        className={`flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg ${
                          tense.highlighted
                            ? "bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800"
                            : "bg-gray-50 dark:bg-gray-800"
                        }`}
                      >
                        <div className="md:w-1/4">
                          <Badge
                            variant={tense.highlighted ? "default" : "outline"}
                            className={`mb-2 ${tense.highlighted ? "bg-orange-600 hover:bg-orange-700" : ""}`}
                          >
                            {tense.highlighted && <Star className="h-3 w-3 mr-1" />}
                            {tense.tense}
                          </Badge>
                        </div>
                        <div className="md:w-1/3">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Structure:</div>
                          <div className="font-mono text-sm">{tense.structure}</div>
                        </div>
                        <div className="md:w-1/3">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Example:</div>
                          <div
                            className={`font-semibold ${
                              tense.highlighted
                                ? "text-orange-600 dark:text-orange-400"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {tense.example}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 px-4">{tense.translation}</div>
                      {index < tenseExamples.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
