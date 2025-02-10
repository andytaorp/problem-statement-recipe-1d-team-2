const RecipesDetails = ({ recipe }) => {
    return (
        <div className='recipe-details'>
            <h4>{recipe.title}</h4>
            <p><strong>Ingredients:</strong> {recipe.ingredient}</p>
            <p><strong>Prep Time:</strong> {recipe.prepTime}</p>
            <p><strong>Difficulty:</strong> {recipe.diffculty}</p>
        </div>
    )
}

export default RecipesDetails