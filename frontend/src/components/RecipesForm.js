import { useState } from "react";
import { useRecipesContext } from '../hooks/useRecipesContext'
import { useAuthContext } from '../hooks/useAuthContext'

const RecipesForm = () => {
    const {dispatch} = useRecipesContext();
    const {user} = useAuthContext();
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            setError('You must be logged in.');
            return;
        }
        const recipes = { name, ingredients, instructions, prepTime, difficulty };
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes`, {
            method: 'POST',
            body: JSON.stringify(recipes),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setName('');
            setIngredients([]);
            setInstructions('');
            setPrepTime('');
            setDifficulty('easy');
            setError(null);
            setEmptyFields([]);
            console.log('Recipe added successfully', json);
            dispatch({type: 'CREATE_RECIPE', payload: json});
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create a recipe</h3>

            <label>Recipe Name:</label>
            <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={emptyFields.includes('name') ? 'error' : ''}
            />

            <label>Ingredients:</label>
            <input
            type="text"
            onChange={(e) => setIngredients(e.target.value)}
            value={ingredients}
            className={emptyFields.includes('ingredients') ? 'error' : ''}
            />

            <label>Instructions:</label>
            <input
            type="text"
            onChange={(e) => setInstructions(e.target.value)}
            value={instructions}
            className={emptyFields.includes('instructions') ? 'error' : ''}
            />

            <label>Preparation Time:</label>
            <input
            type="number"
            onChange={(e) => setPrepTime(e.target.value)}
            value={prepTime}
            className={emptyFields.includes('prepTime') ? 'error' : ''}
            />

            <label>Difficulty Level:</label>
            <select
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
            >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            </select>

            <button>Create Recipe</button>
            {error && <div className="error">{error}</div>}
        </form>   
    )
}

export default RecipesForm;