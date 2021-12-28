const Staff = require('../models/staff');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');
const swearjar = require('swearjar');
const { query } = require('express');

//CREATE STAFF
exports.createStaff = catchAsyncErrors(async (req, res, next) => {
    let images = []

    if(typeof req.body.images === 'string'){
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagelinks = [];

    for( let i=0; i < images.length ; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i],{
            folder : 'avatar'
        })

        imagelinks.push({
            public_id : result.public_id,
            url : result.secure_url
        })
    }

    req.body.avatar = imagelinks

    const staff = await Staff.create({
        name : req.body.name,
        work : req.body.work,
        info : req.body.info,
        avatar : req.body.avatar
    });

    res.status(200).json({
        success : true,
        staff
    })
})

//GET STAFF DETAILS
exports.getStaffDetails = catchAsyncErrors(async (req, res, next) => {
    const staff = await Staff.findById(req.params.id);

    if(!staff) return next(new ErrorHandler('Staff NOT found', 404));

    res.status(200).json({
        success : true,
        staff
    })
})

//GET ALL STAFF BY ROLE
exports.getAllByRole = catchAsyncErrors(async ( req, res, next) => {
    const resPerPage = 20;

    const apiFeatures = new APIFeatures(Staff.find(), req.query)
    .search()
    .filter()

    let staffs = await apiFeatures.query
    let staffsCount = staffs.length;
    apiFeatures.pagination(resPerPage);

    staffs = await apiFeatures.query

    res.status(200).json({
        success : true,
        staffsCount,
        resPerPage,
        staffs
    })
})

//UPDATE STAFF
exports.updateStaff = catchAsyncErrors(async ( req, res, next) => {
    let staff = await Staff.findById(req.params.id)

    if(!staff) return next(new ErrorHandler('Staff unavailable', 404));
    
    let image = [];

    if(typeof req.body === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if(images !== undefined) {
        //Delete ng avatars ng staff
        for(let i=0; i<staff.avatar.length; i++){
            const result = await cloudinary.v2.uploader.destroy(staff.avatar[i].public_id)
        }

        let imageLinks = [];

        //Upload ng bagong avatar
        for( let i=0; i<images.length; i++){
            const result = await cloudinary.v2.uploader.upload(image[i],{
                folder : 'avatar'
            })
    
            imagelinks.push({
                public_id : result.public_id,
                url : result.secure_url
            })
        }

        req.body.avatar = imageLinks
    }

    staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    })

    res.status(200).json({
        success : true,
        message : 'Staff Updated',
        staff
    })
})

//DELETE NG STAFF
exports.deleteStaff = catchAsyncErrors(async ( req, res, next) => {
    const staff = await Staff.findById(req.params.id);

    if(!staff) return next(new ErrorHandler('Staff Unavailable', 404));

    //Delete ng avatar nung staff sa cloudinary
    for(let i=0; i<staff.avatar.length; i++){
        const result = await cloudinary.v2.uploader.destroy(staff.avatar[i].public_id)
    }

    //Delete nung mismong staff
    await staff.remove();

    res.status(200).json ({
        success : true,
        message : 'Staff Deleted'
    })

})

//Create ng Review ng staff
exports.createStaffReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, staffId, user} = req.body

    const review = {
        user : user._id,
        name : user.name,
        rating : Number(rating),
        comment : swearjar.censor(comment)
    }

    const staff = await Staff.findById(staffId);

    const isReviewed = staff.reviews.find(
        r => r.user.toString() === user._id.toString()
    )

    if(isReviewed) {
        staff.reviews.forEach(review => {
            if(review.user.toString() === user._id.toString()) {
                review.comment = swearjar.censor(comment);
                review.rating = rating;
            }
        })
    } else {
        staff.reviews.push(review);
        staff.numofReviews = staff.reviews.length
    }

    staff.ratings = staff.reviews.reduce((acc, item) => item.rating+ acc, 0)/ staff.reviews.length

    const staffReview = await staff.save({validateBeforeSave : false});

    res.status(200).json({
        success : true,
        message : 'Review Created',
        reviews : staffReview.reviews
    })
})

//Delete ng review ng staff
exports.deleteStaffReview = catchAsyncErrors(async (req, res, next) => {
    const staff = await Staff.findById(req.query.staffId);

    const reviews = staff.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const ratings = staff.reviews.reduce((acc, item) => item.rating+ acc, 0)/ staff.reviews.length

    await Staff.findByIdAndUpdate(req.query.staffId, {
        reviews,
        ratings
    }, {
        new : true,
        runValidators : false
    })

    res.status(200).json({
        success : true,
        message : 'Staff Review Deleted'
    })
})

//Get ng Name ONLY by Role
exports.getStaffName = catchAsyncErrors(async (req, res, next) =>{
    const names = await Staff.find().where('work', req.query.work).distinct('name')
    const name_id = await Staff.find().where('work', req.query.work)

    res.status(200).json({
        success : true,
        names,
        name_id: name_id.map(name => { 
            return {
                _id:name._id, 
                name:name.name, 
                work:name.work,
                title:name.name.concat(` - ${name._id}`)
            }
        })
    })
})