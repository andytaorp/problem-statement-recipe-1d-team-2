import { useEffect }from 'react'
import { useRecipesContext } from "../hooks/useRecipesContext"
import { useAuthContext } from "../hooks/useAuthContext"

<<<<<<< HEAD
// components
import RecipesDetails from '../components/RecipesDetails'
import RecipesForm from '../components/RecipesForm'
=======
import RecipesDetails from "../components/RecipesDetails";
import RecipesForm from "../components/RecipesForm";
>>>>>>> b21faca77ec7712e041897843d783b3f21167970

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

<<<<<<< HEAD
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
=======
    return (
        <div className='home'>
            <div className='recipes'>
                {recipes && recipes.map((recipe) => {
                    <RecipesDetails key={recipe._id} recipe={recipe} />
                })}
            </div>
            <RecipesForm />  
        </div>
    )
>>>>>>> b21faca77ec7712e041897843d783b3f21167970
}

export default Home