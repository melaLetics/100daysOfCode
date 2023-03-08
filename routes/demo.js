const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../data/database');

const router = express.Router();

router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/signup', function (req, res) {
  res.render('signup');
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/signup', async function (req, res) {
  const userData = req.body;
  const email = userData.email;
  const confirmEmail = userData['confirm-email'];
  const password = userData.password;
  const encryptPassword = await bcrypt.hash(password, 12);

  if (!email || ! confirmEmail || 
    !password || password.trim() < 6 || email !== confirmEmail || 
    !email.includes('@')){
      console.log('Incorrect data');
      return res.redirect('/signup');
  }

  const existingUser = await db.query('select * from user where email = ? limit 1', email);

  if (existingUser[0][0]) {
    console.log('User already exists');
    return res.redirect('/signup');
  }

  const data = [email, encryptPassword];
  const query = 'Insert into user (email, password) values (?)';
  await db.query(query, [data]);

  res.redirect('/login');
});

router.post('/login', async function (req, res) {
  const userData = req.body;
  const email = userData.email;
  const password = userData.password;

  const query = 'select * from user where email = ? limit 1';
  const response = await db.query(query, email);

  if (!response || !response[0] || !response[0][0]){
    console.log('Could not log in');
    return res.redirect('/login');
  }
  
  const existingUser = response[0][0];

  const passwordIsValid = await bcrypt.compare(password, existingUser.password);

  if (!passwordIsValid){
    console.log('Could not log in - password is not valid');
    return res.redirect('/login');
  }

  console.log('User successfully authenticated');
  res.redirect('/admin');

});

router.get('/admin', function (req, res) {
  res.render('admin');
});

router.post('/logout', function (req, res) {});

module.exports = router;
