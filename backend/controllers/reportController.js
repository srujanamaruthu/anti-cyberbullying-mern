const Report = require('../models/Report');

// @desc    Create a new report
// @route   POST /api/reports
// @access  Private
const createReport = async (req, res) => {
  try {
    const { title, type, description, anonymous } = req.body;

    if (!title || !type || !description) {
      return res.status(400).json({ message: 'Please provide all required fields (title, type, description)' });
    }

    const report = await Report.create({
      title,
      type,
      description,
      anonymous: anonymous || false,
      userId: req.user._id
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all reports (or filtered by my reports)
// @route   GET /api/reports
// @access  Private
const getReports = async (req, res) => {
  try {
    const { my } = req.query;
    let query = {};

    if (my === 'true') {
      query.userId = req.user._id;
    }

    // Find reports and populate user name
    const reports = await Report.find(query)
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    // Process reports to protect anonymous reporter identities
    const processedReports = reports.map((report) => {
      const reportObj = report.toObject();
      const isOwner = String(reportObj.userId?._id) === String(req.user._id);

      if (reportObj.anonymous && !isOwner) {
        reportObj.user = { name: 'Anonymous Student' };
      } else {
        reportObj.user = reportObj.userId ? { name: reportObj.userId.name } : { name: 'Unknown User' };
      }

      // Keep owner reference for frontend validation if needed but safely mask detailed user credentials
      reportObj.isOwner = isOwner;
      delete reportObj.userId;
      return reportObj;
    });

    res.json(processedReports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single report by ID
// @route   GET /api/reports/:id
// @access  Private
const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate('userId', 'name');

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    const reportObj = report.toObject();
    const isOwner = String(reportObj.userId?._id) === String(req.user._id);

    if (reportObj.anonymous && !isOwner) {
      reportObj.user = { name: 'Anonymous Student' };
    } else {
      reportObj.user = reportObj.userId ? { name: reportObj.userId.name } : { name: 'Unknown User' };
    }

    reportObj.isOwner = isOwner;
    delete reportObj.userId;
    res.json(reportObj);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete report
// @route   DELETE /api/reports/:id
// @access  Private
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Check if the report creator matches current logged-in user
    if (String(report.userId) !== String(req.user._id)) {
      return res.status(403).json({ message: 'You are not authorized to delete this report' });
    }

    await report.deleteOne();
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReport,
  getReports,
  getReportById,
  deleteReport
};
