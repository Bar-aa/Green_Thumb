const express = require("express");
const cors = require("cors");
require('dotenv').config(); 
const bodyParser = require("body-parser");

const cropsRotations = require('./routes/CropPlaning');
const RouteKnowledge = require('./routes/KnowledgeRoute');
const gardensRouter = require('./routes/gardensRouter');
const plotsr = require('./routes/plotsRouter');
const signAuthRoutes = require('./routes/signinAuthRoute');
const usersRoute=require('./routes/userRoute');
const resource=require('./routes/resourceRoute');
const localpartnerships=require('./routes/LocalPartnershipRoute');
const crops = require('./routes/Crops');
const RouteVolunteers=require('./routes/VolunteerRoutes');
const weather=require('./routes/weatherRoute');
const RouteSignUp=require('./routes/UserSignUpRoutes');
const SoilInfo=require('./routes/SoilInfoRoute');
const PestInfo=require('./routes/PestRoute');
const RouteEmail=require('./routes/EmailRoute');
// Middleware
const app = express(); 
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


// Routes
app.use('/Green_Thumb/localpartner', localpartnerships);
app.use('/Green_Thumb/KnowledgeSharing', RouteKnowledge);
app.use('/Green_Thumb/user', usersRoute);
app.use('/Green_Thumb/auth', signAuthRoutes);
app.use('/Green_Thumb/Gardens', gardensRouter);
app.use('/Green_Thumb/weather', weather);
app.use('/Green_Thumb/Crops', crops);
app.use('/Green_Thumb/Crop-rotations', cropsRotations);
app.use('/Green_Thumb/Plots', plotsr);
app.use('/Green_Thumb/Volunteer', RouteVolunteers);
app.use('/Green_Thumb/resource',resource);
app.use('/Green_Thumb/SignUp',RouteSignUp);
app.use('/Green_Thumb/SoilInfo', SoilInfo);
app.use('/Green_Thumb/PestInfo', PestInfo);
app.use('/Green_Thumb/Email',RouteEmail);
// Error handling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Index Error";
    res.status(err.statusCode).json({
        message: err.message,
    });
});

// Start the server
const PORT = process.env.PORT || 4400; // Use the PORT environment variable or default to 4400
app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`);
});
