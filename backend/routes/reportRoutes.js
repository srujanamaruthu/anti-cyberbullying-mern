const express = require('express');
const router = express.Router();
const {
  createReport,
  getReports,
  getReportById,
  deleteReport
} = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

// Secure all routes in this router with JWT auth verification middleware
router.use(protect);

router.route('/')
  .post(createReport)
  .get(getReports);

router.route('/:id')
  .get(getReportById)
  .delete(deleteReport);

module.exports = router;
