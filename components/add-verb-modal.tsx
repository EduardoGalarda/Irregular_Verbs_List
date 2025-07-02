"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Save, X } from "lucide-react"
import type { Verb } from "@/lib/verbs-data"

interface AddVerbModalProps {
  onAddVerb: (verb: Verb) => void
}

export function AddVerbModal({ onAddVerb }: AddVerbModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    infinitive: "",
    translation: "",
    category: "irregular",
    pastSimple: "",
    pastParticiple: "",
    presentParticiple: "",
    gerund: "",
    thirdPersonSingular: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.infinitive.trim()) {
      newErrors.infinitive = "Infinitive is required"
    }
    if (!formData.translation.trim()) {
      newErrors.translation = "Translation is required"
    }
    if (!formData.pastSimple.trim()) {
      newErrors.pastSimple = "Past Simple is required"
    }
    if (!formData.pastParticiple.trim()) {
      newErrors.pastParticiple = "Past Participle is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateMissingForms = () => {
    const infinitive = formData.infinitive.toLowerCase().trim()

    // Auto-generate present participle if not provided
    if (!formData.presentParticiple) {
      let presentParticiple = infinitive
      if (infinitive.endsWith("e")) {
        presentParticiple = infinitive.slice(0, -1) + "ing"
      } else if (infinitive.endsWith("ie")) {
        presentParticiple = infinitive.slice(0, -2) + "ying"
      } else {
        presentParticiple = infinitive + "ing"
      }
      setFormData((prev) => ({ ...prev, presentParticiple }))
    }

    // Auto-generate gerund (same as present participle)
    if (!formData.gerund) {
      const gerund = formData.presentParticiple || infinitive + "ing"
      setFormData((prev) => ({ ...prev, gerund }))
    }

    // Auto-generate third person singular if not provided
    if (!formData.thirdPersonSingular) {
      let thirdPerson = infinitive
      if (
        infinitive.endsWith("s") ||
        infinitive.endsWith("sh") ||
        infinitive.endsWith("ch") ||
        infinitive.endsWith("x") ||
        infinitive.endsWith("z")
      ) {
        thirdPerson = infinitive + "es"
      } else if (infinitive.endsWith("y") && !["a", "e", "i", "o", "u"].includes(infinitive[infinitive.length - 2])) {
        thirdPerson = infinitive.slice(0, -1) + "ies"
      } else {
        thirdPerson = infinitive + "s"
      }
      setFormData((prev) => ({ ...prev, thirdPersonSingular: thirdPerson }))
    }
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    generateMissingForms()

    const newVerb: Verb = {
      id: formData.infinitive.toLowerCase().replace(/\s+/g, "-"),
      infinitive: formData.infinitive.toLowerCase(),
      translation: formData.translation,
      category: formData.category as "irregular" | "regular",
      conjugation: {
        infinitive: formData.infinitive.toLowerCase(),
        pastSimple: formData.pastSimple.toLowerCase(),
        pastParticiple: formData.pastParticiple.toLowerCase(),
        presentParticiple: formData.presentParticiple.toLowerCase() || formData.infinitive.toLowerCase() + "ing",
        gerund: formData.gerund.toLowerCase() || formData.infinitive.toLowerCase() + "ing",
        thirdPersonSingular: formData.thirdPersonSingular.toLowerCase() || formData.infinitive.toLowerCase() + "s",
        presentContinuous: `am/is/are ${formData.presentParticiple.toLowerCase() || formData.infinitive.toLowerCase() + "ing"}`,
        simplePresent:
          formData.infinitive.toLowerCase() === "be"
            ? "am/is/are"
            : formData.thirdPersonSingular.toLowerCase() || formData.infinitive.toLowerCase() + "s",
      },
    }

    onAddVerb(newVerb)
    handleReset()
    setOpen(false)
  }

  const handleReset = () => {
    setFormData({
      infinitive: "",
      translation: "",
      category: "irregular",
      pastSimple: "",
      pastParticiple: "",
      presentParticiple: "",
      gerund: "",
      thirdPersonSingular: "",
    })
    setErrors({})
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Verb
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Verb
          </DialogTitle>
          <DialogDescription>
            Add a new irregular verb to the collection. Required fields are marked with *.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Infinitive */}
          <div className="grid gap-2">
            <Label htmlFor="infinitive">Infinitive *</Label>
            <Input
              id="infinitive"
              placeholder="e.g., speak"
              value={formData.infinitive}
              onChange={(e) => handleInputChange("infinitive", e.target.value)}
              className={errors.infinitive ? "border-red-500" : ""}
            />
            {errors.infinitive && <p className="text-sm text-red-500">{errors.infinitive}</p>}
          </div>

          {/* Translation */}
          <div className="grid gap-2">
            <Label htmlFor="translation">Translation (Portuguese) *</Label>
            <Input
              id="translation"
              placeholder="e.g., falar"
              value={formData.translation}
              onChange={(e) => handleInputChange("translation", e.target.value)}
              className={errors.translation ? "border-red-500" : ""}
            />
            {errors.translation && <p className="text-sm text-red-500">{errors.translation}</p>}
          </div>

          {/* Category */}
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="irregular">Irregular</SelectItem>
                <SelectItem value="regular">Regular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Past Simple */}
          <div className="grid gap-2">
            <Label htmlFor="pastSimple">Past Simple *</Label>
            <Input
              id="pastSimple"
              placeholder="e.g., spoke"
              value={formData.pastSimple}
              onChange={(e) => handleInputChange("pastSimple", e.target.value)}
              className={errors.pastSimple ? "border-red-500" : ""}
            />
            {errors.pastSimple && <p className="text-sm text-red-500">{errors.pastSimple}</p>}
          </div>

          {/* Past Participle */}
          <div className="grid gap-2">
            <Label htmlFor="pastParticiple">Past Participle *</Label>
            <Input
              id="pastParticiple"
              placeholder="e.g., spoken"
              value={formData.pastParticiple}
              onChange={(e) => handleInputChange("pastParticiple", e.target.value)}
              className={errors.pastParticiple ? "border-red-500" : ""}
            />
            {errors.pastParticiple && <p className="text-sm text-red-500">{errors.pastParticiple}</p>}
          </div>

          {/* Optional Fields */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Optional Fields (auto-generated if empty)
            </h4>

            <div className="grid gap-4">
              {/* Present Participle */}
              <div className="grid gap-2">
                <Label htmlFor="presentParticiple">Present Participle (-ing form)</Label>
                <Input
                  id="presentParticiple"
                  placeholder="e.g., speaking (auto-generated)"
                  value={formData.presentParticiple}
                  onChange={(e) => handleInputChange("presentParticiple", e.target.value)}
                />
              </div>

              {/* Gerund */}
              <div className="grid gap-2">
                <Label htmlFor="gerund">Gerund</Label>
                <Input
                  id="gerund"
                  placeholder="e.g., speaking (auto-generated)"
                  value={formData.gerund}
                  onChange={(e) => handleInputChange("gerund", e.target.value)}
                />
              </div>

              {/* Third Person Singular */}
              <div className="grid gap-2">
                <Label htmlFor="thirdPersonSingular">Third Person Singular</Label>
                <Input
                  id="thirdPersonSingular"
                  placeholder="e.g., speaks (auto-generated)"
                  value={formData.thirdPersonSingular}
                  onChange={(e) => handleInputChange("thirdPersonSingular", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleReset} className="flex items-center gap-2 bg-transparent">
            <X className="h-4 w-4" />
            Reset
          </Button>
          <Button onClick={handleSubmit} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Add Verb
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
