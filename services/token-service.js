const jwt = require('jsonwebtoken')
const {Token} = require('../db/models')


class TokenService {
    generateTokens(payload){
        const accessToken= jwt.sign(payload, process.env.SECRET_KEY_JWT_ACCESS, {expiresIn: '30m'})
        const refreshToken= jwt.sign(payload, process.env.SECRET_KEY_JWT_REFRESH, {expiresIn: '7d'})
        return {accessToken, refreshToken}
    }
    async saveToken(userId, refreshToken){
        const tokenData = await Token.findOne({where:{UserId:userId}})
        if (tokenData){
            tokenData.refreshToken = refreshToken
            return await  tokenData.save()
        }
        const  token = await Token.create({UserId:userId, refreshToken})
        return token
    }
}
module.exports = new TokenService()