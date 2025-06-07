const router = require('express').Router();

/* 
hello world route
This route is used to check if the API is working 
*/
router.get('/', (req, res) => {
    res.json({ message: 'API is working' });
});

module.exports = router;