const  bcrypt = require('bcrypt')
const  jwt = require('jsonwebtoken')
const {User} = require('../db/models')
const uuid = require('uuid')
const mailService = require('../services/mail-service')
const tokenService = require('../services/token-service')
const UserDto = require('../dtos/user-dto')

class UserController {
    async registration(req, res, next) {
        try {
            const {userName, email, password}= req.body
            if (!userName || !email || !password){
                return res.status(400).json({statusCode: 0, message: 'Error'})
            }
            const candidate = await  User.findOne({where: {email}})
            if(candidate){
                return  res.status(400).json({statusCode: 0, message: 'Error user1'})
            }
            const hashPassword = await bcrypt.hash(password, 7)
            const activationLink = uuid.v4()
            const user = await  User.create({userName, email, password: hashPassword, activationLink})
            await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
            const userDto = new UserDto(user)
            const tokens = tokenService.generateTokens({...userDto})
            await tokenService.saveToken(userDto.id, tokens.refreshToken)

            res.cookie('refreshToken', tokens.refreshToken,{maxAge: 30*24*60*60*1000, httpOnly: true})
            return  res.status(200).json({statusCode: 0, message: 'Good', data: {...tokens, user: userDto}})
        }catch (e) {
            console.log(e)
        }
    }
    async login(req, res, next) {
        try {

        }catch (e) {

        }
    }
    async logOut(req, res, next) {
        try {

        }catch (e) {

        }
    }

    async activate(req, res, next) {
        try {

        }catch (e) {

        }
    }
    async refresh(req, res, next) {
        try {
        }catch (e) {

        }
    }

}

module.exports = new UserController()