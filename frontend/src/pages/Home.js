import { useState, useEffect } from "react";

import RecipeDetails from "./components/RecipeDetails";

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
                    <RecipeDetails key={recipe._id} recipe={recipe} />
                })}
            </div>
        </div>
    )
}

export default Home