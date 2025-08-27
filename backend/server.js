const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/recipeDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Recipe model
const RecipeSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  instructions: String,
});
const Recipe = mongoose.model("Recipe", RecipeSchema);

// Routes
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.get("/recipes", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.post("/recipes", async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  res.json(recipe);
});

app.delete("/recipes/:id", async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: "Recipe deleted" });
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
