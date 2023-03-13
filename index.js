 const express = require('express')
 const app = express();

 const bodyParser = require('body-parser');

 const CONSTANTS = require('./config/constant');

 const loginRouter = require('./routes/loginR');
 const registerRouter = require('./routes/registerR');


app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(loginRouter);
app.use(registerRouter);




app.listen(CONSTANTS.PORT, ()=>{
    console.log(`Server is running at http://localhost:${CONSTANTS.PORT}`);
});

 