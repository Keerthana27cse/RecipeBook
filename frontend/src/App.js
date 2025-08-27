import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({ name: "", ingredients: "", instructions: "" });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const res = await axios.get("http://localhost:5000/recipes");
    setRecipes(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.ingredients || !form.instructions) return;
    await axios.post("http://localhost:5000/recipes", form);
    setForm({ name: "", ingredients: "", instructions: "" });
    fetchRecipes();
  };

  const deleteRecipe = async (id) => {
    await axios.delete(`http://localhost:5000/recipes/${id}`);
    fetchRecipes();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🍴 Recipe Book</h2>

      {/* Form */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5 className="card-title">Add New Recipe</h5>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Recipe Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Ingredients"
              value={form.ingredients}
              onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Instructions"
              value={form.instructions}
              onChange={(e) => setForm({ ...form, instructions: e.target.value })}
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary w-100">Add Recipe</button>
          </div>
        </form>
      </div>

      {/* Recipe List */}
      <div className="row">
        {recipes.map((r) => (
          <div key={r._id} className="col-md-4 mb-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{r.name}</h5>
                <p className="card-text"><b>Ingredients:</b> {r.ingredients}</p>
                <p className="card-text"><b>Instructions:</b> {r.instructions}</p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteRecipe(r._id)}
                >
                  ❌ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
