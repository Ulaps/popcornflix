const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');
const sendToken = require('../utils/jwtToken');

//ALL USER
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.find()

    res.status(200).json({
        success : true,
        user
    })
})

//USER DETAIL
exports.getUserDetail = catchAsyncErrors(async ( req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) return next(new ErrorHandler('User NOT Found', 404));

    res.status(200).json({
        success : true,
        user
    })
})

//CREATE NG USER
exports.createUser = catchAsyncErrors(async (req, res, next) => {
    console.log(req.body);
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {

        
        folder : 'userAvatars',
        width : 150,
        crop: 'scale'
    })

    const user = await User.create({
        name : req.body.name,
        email : req.body.email,
        avatar : [{
            public_id : result.public_id,
            url : result.secure_url
        }],
        role: 'User'
    })

    sendToken(user, 200, res)

})

//LOGIN NI USER
exports.userLogin = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({email :req.body.email});

    if(!user) return next(new ErrorHandler('INVALID EMAIL', 404))

    sendToken(user, 200, res)
})

//LOGOUT NI USER
exports.userLogout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires : new Date(Date.now()),
        httpOnly : true
    })

    res.status(200).json({
        success : true,
        message : 'USER LOGOUT'
    })
})

//REGISTER GAMIT GOOGLE
exports.googleAuth = catchAsyncErrors(async (req,res,next) => {
    let user = await User.findOne({email: req.body.email});

    if(!user) {

        const result = await cloudinary.v2.uploader.upload(req.body.imageUrl, {
            folder:'userAvatars',
            width:150,
            crop:'scale'
        })
    
        const user = await User.create({
            name : req.body.name,
            email : req.body.email,
            avatar : [{
                public_id : result.public_id,
                url: result.secure_url
            }], role: 'User'
        })
    
        sendToken(user, 200, res)

    } else {
        sendToken(user, 200, res)
    }
})