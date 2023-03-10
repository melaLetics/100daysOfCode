const express = require('express');
const bcrypt = require('bcryptjs');
const randomString = require('randomstring');

const db = require('../data/database');

async function validateCookie(cookie) {
  const response = await db.query('select * from user where cookie = ? limit 1', cookie);
  return response[0][0] !== undefined;
}

const router = express.Router();

router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/signup', function (req, res) {
  console.log(req.headers);
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

  const cookie = randomString.generate(40);
  await db.query(`update user set cookie='${cookie}' where email=?`, existingUser.email);
  console.log('User successfully authenticated');
  res.cookie('cookie', cookie);
  res.redirect('/admin');
});

router.get('/admin', async function (req, res) {
  if (!await validateCookie(req.cookies['cookie'])){
    return res.status(401).render('401');
  }
  res.render('admin');
});

router.post('/logout', function (req, res) {
  db.query(`update user set cookie=NULL where cookie=?`,req.cookies['cookie'] );
  res.cookie('cookie', null);
  res.redirect('/');
});

module.exports = router;
