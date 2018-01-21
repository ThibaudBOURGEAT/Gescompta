const router = require('express').Router();
const User = require('../../models/User');
const hash = require('../../../helpers/hash');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "test";

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    User.findOne({_id: jwt_payload.id}, function(err, user) {
        if (!user) {
            res.status(401).json({message:"Id non trouvé"});
        }
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });
});

passport.use(strategy);

router.use(passport.initialize());

router.use(bodyParser.urlencoded({
  extended: true
}));

router.post("/signIn", function(req, res) {
  User.findOne({login: req.body.login}, function(err, user) {
    if (!user) {
        console.log(user);
        return res.json({success: false,message:"Utilisateur non trouvé"});
    }

    if(req.body.password)
    {
    if (hash.hashPassword(req.body.password) == user.password) {
          if (!user.deleted) {
              var payload = {id: user.id};
              var token = jwt.sign(payload, jwtOptions.secretOrKey);
              res.json({success: true,message: "Vous êtes connecté.", token: token});
          }
          else {
              res.json({success: false,message:"Mauvais compte."});
          }
      }
      else {
          res.json({success: false,message:"Mauvais mot de passe."});
      }
    }else{res.json({success: false, message:"Entrez un mot de passe."})}
  });

});

module.exports = router;
