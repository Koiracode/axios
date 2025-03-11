import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// Helper function to handle rendering with consistent data
const renderPage = (res, data, error = null, activity = null, type = '', participants = '') => {
  res.render("index.ejs", { 
    data: data || [], 
    activity: activity, 
    type: type, 
    participants: participants, 
    error: error
  });
};

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:4000/random");
    const result = response.data;
    renderPage(res,result);

    
  } catch (error) {
    console.error("Failed to make request:", error.message);
    renderPage(res, [], error.message, null, type || '', participants || '');
  }
});

app.post("/", async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:4000/filter?type=${req.body.type}&participants=${req.body.participants}`);
    const result = response.data;
    let findActivity = result.length > 0 ? result[Math.floor(Math.random() * result.length)] : null;
    console.log(findActivity);
    renderPage(res, findActivity );

  } catch (error) {
    renderPage(res, [], error.message, null, '', '');
  }

});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
