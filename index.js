const { error } = require("console");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
require('./config/dbconnection');

const cropsRotations = require('./routes/CropPlaning');
const RouteKnowledge=require('./routes/KnowledgeRoute');
const gardensRouter=require('./routes/gardensRouter');
const plotsr = require('./routes/plotsRouter');
const usersRoute=require('./routes/userRoute');

const localpartnerships=require('./routes/LocalPartnershipRoute');
const crops = require('./routes/Crops');
const RouteVolunteers=require('./routes/VolunteerRoutes');
const weather=require('./routes/weatherRoute');
const bodyParser=require("body-parser");

const RouteSignUp=require('./routes/UserSignUpRoutes');

const app = express(); 
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use('/Green_Thumb/localpartner',localpartnerships);
app.use('/Green_Thumb/KnowledgeSharing',RouteKnowledge);
app.use('/Green_Thumb/user',usersRoute);


app.use('/Green_Thumb/Gardens',gardensRouter);

app.use('/',weather);

app.use('/Green_Thumb/Crops',crops);
app.use('/Green_Thumb/Crop-rotations',cropsRotations);

app.use('/Green_Thumb/Plots',plotsr);

app.use('/Green_Thumb/Volunteer',RouteVolunteers);
app.use('/Green_Thumb/SignUp',RouteSignUp);

  

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Index Error";
    res.status(err.statusCode).json({
        message:err.message,
    });

});

app.listen(4400, function(){
    console.log('Server started on Port 4400');
});