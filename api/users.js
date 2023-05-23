const { Router } = require('express')

const { Business } = require('../models/business')
const { Photo } = require('../models/photo')
const { Review } = require('../models/review')
const { User } = require('../models/user')
const jwt = require("jsonwebtoken")

const router = Router()

/*
 * Route to create a new user.
 */
router.post('/', async function (req, res, next) {
  try {
    const user = await User.create(req.body, UserClientFields)
    res.status(201).send({ id: user.id })
  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(400).send({ error: e.message })
    } else {
      throw e
    }
  }
})

/*
 * Route to login user.
 */
router.post('/login', async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) {
      const authenticated = await user.comparePassword(password);
      if (authenticated) {
        // Password is valid, authentication successful
        const token = user.generateJWT()
        res.status(200).json({ token: token })
      }
      else {
        // Invalid password
        return res.status(401).send({ error: 'Invalid password' });
      }
    }
    else { return res.status(401).send({ error: 'Invalid email' }); }
  } catch (e) {
    next(e);
  }
});

/*
 * Route to get user information.
 */
router.get('/:userId', async function (req, res) {
  const userId = req.params.userId;
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] },
  });
  if (user) {
    res.status(200).json(user)
  }
  else {
    return res.status(41).json({ error: 'Invalid user id' });
  }
})

/*
 * Route to list all of a user's businesses.
 */
router.get('/:userId/businesses', async function (req, res) {
  const userId = req.params.userId
  const userBusinesses = await Business.findAll({ where: { ownerId: userId } })
  res.status(200).json({
    businesses: userBusinesses
  })
})

/*
 * Route to list all of a user's reviews.
 */
router.get('/:userId/reviews', async function (req, res) {
  const userId = req.params.userId
  const userReviews = await Review.findAll({ where: { userId: userId } })
  res.status(200).json({
    reviews: userReviews
  })
})

/*
 * Route to list all of a user's photos.
 */
router.get('/:userId/photos', async function (req, res) {
  const userId = req.params.userId
  const userPhotos = await Photo.findAll({ where: { userId: userId } })
  res.status(200).json({
    photos: userPhotos
  })
})

module.exports = router
