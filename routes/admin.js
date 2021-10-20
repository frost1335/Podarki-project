const { Router } = require("express");
const Product = require("../models/Product");
const file = require("../middleware/file");
const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const router = Router();

router.get('/authentication', async (req, res) => {
  const admin = await Admin.findOne()
  if (admin) {
    res.redirect('/admin/authentication/login')
  }
  else {
    res.render('register', {
      title: 'Регистрация',
      layout: 'admin'
    })
  }
})

router.post('/authentication', async (req, res) => {
  const { email, password, confirm } = req.body

  const candidate = await Admin.findOne({ email })

  if (!candidate) {
    if (password === confirm) {
      const hash = await bcrypt.hash(password, 12)
      const admin = new Admin({
        email, password: hash
      })
      await admin.save()
      res.redirect('/admin/authentication/login')
    }
    else {
      res.redirect('/admin/authentication')
    }
  }
  else {
    res.redirect('/admin/authentication')
  }
})

router.get('/authentication/login', (req, res) => {
  res.render('login', {
    title: 'Вход',
    layout: 'admin'
  })
})

router.post('/authentication/login', async (req, res) => {
  const { email, password } = req.body

  const admin = await Admin.findOne({ email })

  if (admin) {
    const candidate = await bcrypt.compare(password, admin.password)

    if (candidate) {
      req.session.isAdmin = true
      req.session.admin = admin
      req.session.save((err) => {
        if (err) {
          throw err
        }
      })
      res.redirect('/admin/add')
    }
    else {
      res.redirect('/admin/authentication/login')
    }
  }
  else {
    res.redirect('/admin/authentication/login')
  }
})

router.get('/all/product', async (req, res) => {
  const products = await Product.find()
  res.status(200).json(products)
})

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw err
    }
    res.redirect('/')
  })
})

module.exports = router;
