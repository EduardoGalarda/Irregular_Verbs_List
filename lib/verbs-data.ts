export interface VerbConjugation {
  infinitive: string
  pastSimple: string
  pastParticiple: string
  presentParticiple: string
  gerund: string
  thirdPersonSingular: string
  presentContinuous: string
  simplePresent: string
}

export interface Verb {
  id: string
  infinitive: string
  translation: string
  category: string
  conjugation: VerbConjugation
}

export const verbs: Verb[] = [
  {
    id: "be",
    infinitive: "be",
    translation: "ser/estar",
    category: "irregular",
    conjugation: {
      infinitive: "be",
      pastSimple: "was/were",
      pastParticiple: "been",
      presentParticiple: "being",
      gerund: "being",
      thirdPersonSingular: "is",
      presentContinuous: "am/is/are being",
      simplePresent: "am/is/are",
    },
  },
  {
    id: "become",
    infinitive: "become",
    translation: "tornar-se",
    category: "irregular",
    conjugation: {
      infinitive: "become",
      pastSimple: "became",
      pastParticiple: "become",
      presentParticiple: "becoming",
      gerund: "becoming",
      thirdPersonSingular: "becomes",
      presentContinuous: "am/is/are becoming",
      simplePresent: "becomes",
    },
  },
  {
    id: "begin",
    infinitive: "begin",
    translation: "começar",
    category: "irregular",
    conjugation: {
      infinitive: "begin",
      pastSimple: "began",
      pastParticiple: "begun",
      presentParticiple: "beginning",
      gerund: "beginning",
      thirdPersonSingular: "begins",
      presentContinuous: "am/is/are beginning",
      simplePresent: "begins",
    },
  },
  {
    id: "break",
    infinitive: "break",
    translation: "quebrar",
    category: "irregular",
    conjugation: {
      infinitive: "break",
      pastSimple: "broke",
      pastParticiple: "broken",
      presentParticiple: "breaking",
      gerund: "breaking",
      thirdPersonSingular: "breaks",
      presentContinuous: "am/is/are breaking",
      simplePresent: "breaks",
    },
  },
  {
    id: "bring",
    infinitive: "bring",
    translation: "trazer",
    category: "irregular",
    conjugation: {
      infinitive: "bring",
      pastSimple: "brought",
      pastParticiple: "brought",
      presentParticiple: "bringing",
      gerund: "bringing",
      thirdPersonSingular: "brings",
      presentContinuous: "am/is/are bringing",
      simplePresent: "brings",
    },
  },
  {
    id: "buy",
    infinitive: "buy",
    translation: "comprar",
    category: "irregular",
    conjugation: {
      infinitive: "buy",
      pastSimple: "bought",
      pastParticiple: "bought",
      presentParticiple: "buying",
      gerund: "buying",
      thirdPersonSingular: "buys",
      presentContinuous: "am/is/are buying",
      simplePresent: "buys",
    },
  },
  {
    id: "come",
    infinitive: "come",
    translation: "vir",
    category: "irregular",
    conjugation: {
      infinitive: "come",
      pastSimple: "came",
      pastParticiple: "come",
      presentParticiple: "coming",
      gerund: "coming",
      thirdPersonSingular: "comes",
      presentContinuous: "am/is/are coming",
      simplePresent: "comes",
    },
  },
  {
    id: "do",
    infinitive: "do",
    translation: "fazer",
    category: "irregular",
    conjugation: {
      infinitive: "do",
      pastSimple: "did",
      pastParticiple: "done",
      presentParticiple: "doing",
      gerund: "doing",
      thirdPersonSingular: "does",
      presentContinuous: "am/is/are doing",
      simplePresent: "does",
    },
  },
  {
    id: "eat",
    infinitive: "eat",
    translation: "comer",
    category: "irregular",
    conjugation: {
      infinitive: "eat",
      pastSimple: "ate",
      pastParticiple: "eaten",
      presentParticiple: "eating",
      gerund: "eating",
      thirdPersonSingular: "eats",
      presentContinuous: "am/is/are eating",
      simplePresent: "eats",
    },
  },
  {
    id: "go",
    infinitive: "go",
    translation: "ir",
    category: "irregular",
    conjugation: {
      infinitive: "go",
      pastSimple: "went",
      pastParticiple: "gone",
      presentParticiple: "going",
      gerund: "going",
      thirdPersonSingular: "goes",
      presentContinuous: "am/is/are going",
      simplePresent: "goes",
    },
  },
]
