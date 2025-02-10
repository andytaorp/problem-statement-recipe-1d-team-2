import { useRecipesContext } from '../hooks/useRecipesContext'
import { useAuthContext } from '../hooks/useAuthContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const RecipesDetails = ({ recipe }) => {
    const { dispatch } = useRecipesContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if ( !user ) {
            return
        }

        const res = await fetch(`/api/recipes/${recipe._id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${user.token}` }
        })

        const json = await res.json()
        if ( res.ok ) {
            dispatch( { type: 'DELETE_RECIPE', payload: json})
        }
    }

    return (
        <div className='recipe-details'>
            <h4>{recipe.name}</h4>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <p><strong>Prep Time:</strong> {recipe.prepTime}</p>
            <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
            <p>{formatDistanceToNow(new Date(recipe.createdAt), {addSuffix: true})}</p>
            <span className='material-symbols-outlined' onClick={handleClick}>Delete</span>
        </div>
    )
}

export default RecipesDetails