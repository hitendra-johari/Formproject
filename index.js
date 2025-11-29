const express = require("express");
const user=require("./user")
require("./config");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());


app.post("/submit", async (req, res) => {
  try {
    const data = new user(req.body);
    await data.save();
    res.json({ message: "User saved successfully!", data});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/submit1",async(req, res) => {
 const data=await user.find();
 console.log(data)
 res.json(data);
});
app.delete("/submit2/:id",async(req, res) => {
  const data = await user.deleteOne({_id:req.params.id});
  console.log(data)
  res.json({ message: "Deleted" });
});
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
