const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();


//client ID   909857137406-8pl28scfsjnnrkrqghuhg6u24ur2oo4h.apps.googleusercontent.com

//client Secret   2lhsmWf_RcaLXrSB2Lgs0saP
passport.use(new GoogleStrategy());




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`))