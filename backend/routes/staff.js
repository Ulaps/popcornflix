const express = require('express');
const router = express.Router();

const { 
    createStaff,
    getStaffDetails,
    getAllByRole,
    updateStaff,
    deleteStaff,
    createStaffReview,
    deleteStaffReview,
    getStaffName
} = require('../controllers/staffController');

router.route('/staff/create').post(createStaff);
router.route('/staffdetails/:id').get(getStaffDetails);
router.route('/allbyrole').get(getAllByRole);
router.route('/staff/:id').put(updateStaff);
router.route('/staff/:id').delete(deleteStaff);
router.route('/staffreview').put(createStaffReview);
router.route('/delstaffreview').delete(deleteStaffReview);
router.route('/staffname').get(getStaffName);

module.exports = router;