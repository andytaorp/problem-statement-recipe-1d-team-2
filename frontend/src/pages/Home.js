import { useState, useEffect } from "react";

import RecipesDetails from "../components/RecipesDetails";
import RecipesForm from "../components/RecipesForm";

const Home = () => {
    const [recipes, setRecipes] = useState(null)

    useEffect(() => {
        const fetchRecipes = async () => {
            const res = await fetch('/api/recipes')
            const json = await res.json()
            
            if (res.ok) {
                setRecipes(json)
            }
        }

        fetchRecipes()
    }, [])

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
}

export default Home