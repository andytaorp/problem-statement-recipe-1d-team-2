import { useEffect }from 'react'
import { useRecipesContext } from "../hooks/useRecipesContext"
import { useAuthContext } from "../hooks/useAuthContext"

import RecipesDetails from "../components/RecipesDetails";
import RecipesForm from "../components/RecipesForm";

const Home = () => {
  const {recipes, dispatch} = useRecipesContext()
  const {user} = useAuthContext()

    useEffect(() => {
        const fetchRecipes = async () => {
        const response = await fetch('/api/recipes', {
            headers: {'Authorization': `Bearer ${user.token}`},
        })
        const json = await response.json()

            if (response.ok) {
            dispatch({type: 'SET_RECIPES', payload: json})
            }
        }

        if ( user ) {
            fetchRecipes()
        }

    }, [dispatch, user])

    return (
        <div className='home'>
            <div className='recipes'>
                {recipes && recipes.map((recipe) => (
                    <RecipesDetails key={recipe._id} recipe={recipe} />
                ))}
            </div>
            <RecipesForm />  
        </div>
    )
}

export default Home;