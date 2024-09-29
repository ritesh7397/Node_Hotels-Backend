// sets up Passport with a local authentication strategy, using a Person model for user data. - Auth.js file


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./Models/Person');   // Adjust the path as needed



// PASSPORT , USERNAME, PASSWORD
passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    // authetication logic here
    try {
        // console.log(`Recived Credentials:`, USERNAME, password);
        const user = await Person.findOne({ username: USERNAME });
        if (!user)
            return done(null, false, { message: 'Incorrect username.' });

        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: 'Incorrect password.' });
        }
    }
    catch (err) {
        return done(err);
    }
}));

module.exports = passport; // Export configured passport