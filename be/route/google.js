const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');

// Configurazione della strategia di autenticazione Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => {
    // La callback deve chiamare done per indicare il completamento dell'autenticazione
    return done(null, profile);
  }
));

// Middleware per inizializzare Passport
router.use(passport.initialize());

// Rotta per iniziare l'autenticazione con Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback di Google per gestire l'autenticazione dell'utente
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Genera un token JWT per l'utente autenticato
    const user = req.user;
    const token = jwt.sign(user, process.env.SECRET_KEY);
    // Reindirizza l'utente alla pagina di successo con il token
    res.redirect(`/success?token=${encodeURIComponent(token)}`);
  }
);

// Rotta di successo dopo l'autenticazione
router.get('/success', (req, res) => {
  // Verifica se il token è presente nei parametri dell'URL
  const token = req.query.token;
  if (token) {
    // Reindirizza l'utente alla home e includi il token come parametro nell'URL
    res.redirect(`/home?token=${encodeURIComponent(token)}`);
  } else {
    // Se il token non è presente, reindirizza semplicemente alla home
    res.redirect('/home');
  }
});

module.exports = router;
