"use client"

import { useState, useEffect } from "react"

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // Carregar favoritos do localStorage na inicialização
  useEffect(() => {
    const savedFavorites = localStorage.getItem("verb-favorites")
    if (savedFavorites) {
      try {
        const favoritesArray = JSON.parse(savedFavorites)
        setFavorites(new Set(favoritesArray))
      } catch (error) {
        console.error("Error loading favorites:", error)
      }
    }
  }, [])

  // Salvar favoritos no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("verb-favorites", JSON.stringify(Array.from(favorites)))
  }, [favorites])

  const toggleFavorite = (verbId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(verbId)) {
        newFavorites.delete(verbId)
      } else {
        newFavorites.add(verbId)
      }
      return newFavorites
    })
  }

  const isFavorite = (verbId: string) => favorites.has(verbId)

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    favoritesCount: favorites.size,
  }
}
