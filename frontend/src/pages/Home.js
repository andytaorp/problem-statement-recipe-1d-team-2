import { useEffect, useState } from "react";
import { useRecipesContext } from "../hooks/useRecipesContext";
import { useAuthContext } from "../hooks/useAuthContext";

import RecipesDetails from "../components/RecipesDetails";
import RecipesForm from "../components/RecipesForm";

const Home = () => {
    const { recipes, dispatch } = useRecipesContext();
    const { user } = useAuthContext();

    // 🔍 Search State
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchRecipes = async () => {
            if (!user) return;

            const response = await fetch("/api/recipes", {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: "SET_RECIPES", payload: json });
                console.log("Fetched Recipes:", json);
            }
        };

        fetchRecipes();
    }, [dispatch, user]);

    // 🔍 Filter Recipes by Search Query
    const filteredRecipes = recipes
        ? recipes.filter((recipe) =>
              recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];

    return (
        <div className="home">
            {/* 📌 Main Recipe List (Left Side, Bigger) */}
            <main className="recipes-container">
                <h2>🍽️ Recipes</h2>
                <div className="recipes">
                    {filteredRecipes.length > 0 ? (
                        filteredRecipes.map((recipe) => (
                            <RecipesDetails key={recipe._id} recipe={recipe} />
                        ))
                    ) : (
                        <p className="no-results">No recipes found.</p>
                    )}
                </div>
            </main>

            {/* 🔹 Sidebar for Search & Create Recipe (Right Side) */}
            <aside className="sidebar">
                <h3>🔍 Search Recipes</h3>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />

                <hr className="sidebar-divider" />

                <h3>📝 Create New Recipe</h3>
                <RecipesForm />
            </aside>
        </div>
    );
};

export default Home;
