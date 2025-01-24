const ensureAuthenticated = require('../Controllers/Auth');

const router = require('express').Router();

router.get('/',ensureAuthenticated,(req, res) => {
    console.log(req.user)
    return res.status(200).json([
        {
        name:"mobile",
        price: 10000,
        description: "This is a mobile phone"
        },
        {
        name:"laptop",
        price: 50000,
        description: "This is a laptop"
        }
    ])
})

module.exports = router;