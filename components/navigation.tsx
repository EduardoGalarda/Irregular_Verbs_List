"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, List } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-2 mb-6">
      <Button asChild variant={pathname === "/" ? "default" : "outline"} className="flex items-center gap-2">
        <Link href="/">
          <BookOpen className="h-4 w-4" />
          Conjugations
        </Link>
      </Button>
      <Button asChild variant={pathname === "/list" ? "default" : "outline"} className="flex items-center gap-2">
        <Link href="/list">
          <List className="h-4 w-4" />
          Verb List
        </Link>
      </Button>
    </nav>
  )
}
