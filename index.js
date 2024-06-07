const { error } = require("console");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
require('./config/dbconnection');


const Route=require('./routes/resourceRoute');
const RouteKnowledge=require('./routes/KnowledgeRoute');
const gardensRouter=require('./routes/gardensRouter');
const plotsr = require('./routes/plotsRouter');

const localpartnerships=require('./routes/LocalPartnershipRoute');
const crops = require('./routes/Crops');
const RouteVolunteers=require('./routes/VolunteerRoutes');
const weather=require('./routes/weatherRoute');
//const soil=require('./routes/SoilRoute');
const bodyParser=require("body-parser");
const app = express(); 
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use('/Green_Thumb/resource',Route);
app.use('/Green_Thumb/localpartner',localpartnerships);
app.use('/Green_Thumb/KnowledgeSharing',RouteKnowledge);


app.use('/Green_Thumb/Gardens',gardensRouter);

app.use('/',weather);
//app.use('/',soil);
//app.use('/api', soil);
//app.use('/Green_Thumb/Gardens',gardensr);

app.use('/Green_Thumb/Crops',crops);

app.use('/Green_Thumb/Plots',plotsr);

app.use('/Green_Thumb/Volunteer',RouteVolunteers);


  

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