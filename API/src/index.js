const router = require('express').Router();

// routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/task', taskRoutes);

module.exports = router;
