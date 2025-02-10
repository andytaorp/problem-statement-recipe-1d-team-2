<<<<<<< HEAD
import { RecipesContext } from '../context/RecipesContext'
import { useContext } from 'react'

export const useRecipesContext = () => {
  const context = useContext(RecipesContext)

  if (!context) {
    throw Error('useRecipesContext must be used inside an RecipesContextProvider')
  }

  return context
=======
import { RecipesContext } from "../context/RecipesContext";
import { useContext } from "react";

export const useRecipesContext = () => {
    const context = useContext(RecipesContext)

    if (!context) {
        throw Error('useRecipesContext must be used within a AuthContextProvider')
    }
    
    return context
>>>>>>> b21faca77ec7712e041897843d783b3f21167970
}