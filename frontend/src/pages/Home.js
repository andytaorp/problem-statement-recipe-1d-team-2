import { useEffect }from 'react'
import { useRecipesContext } from "../hooks/useRecipesContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import RecipesDetails from '../components/RecipesDetails'
import RecipesForm from '../components/RecipesForm'

const Home = () => {
  const {recipes, dispatch} = useRecipesContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {recipes && recipes.map((recipes) => (
          <RecipesDetails key={recipes._id} recipes={recipes} />
        ))}
      </div>
      <RecipesForm />
    </div>
  )
}

export default Home