const { StatusCodes } = require('http-status-codes')
const restUtils = require('../../../../utils/rest')
const { leaderboardDB } = require('../../../../db')
const utils = require('../../../../utils/utils')
const { fileDB } = require('../../../../db')

async function setLeaderboardScore(request, reply) {
    try {
        let wallet = null
        const walletData = request.body

        wallet = await leaderboardDB.getOneByWalletID(walletData.nft.id)

        if (!wallet) {
            wallet = (await leaderboardDB.setScore(walletData))._doc
        } else {
            if (wallet.score < walletData.score) {
                wallet = await leaderboardDB.updateScore(walletData, Date.now())
            }
        }

        reply.code(StatusCodes.NO_CONTENT).send()
    } catch (e) {
        restUtils.handleException(e, reply)
    }
}

async function getLeaderboardScore(request, reply) {
    try {
        const scores = await leaderboardDB.getScores(request.body)
        scores.map((wallet) => {
            wallet.time = utils.calculateTimeAgo(wallet.time)
        })
        reply.code(StatusCodes.OK).send({ data: { scores } })
    } catch (e) {
        restUtils.handleException(e, reply)
    }
}

async function getLeaderboard(request, reply) {
    try {
        const leaderboard = await leaderboardDB.getLeaderboard(request.query)
        leaderboard.map((wallet) => {
            wallet.time = utils.calculateTimeAgo(wallet.time)
        })
        reply.code(StatusCodes.OK).send({ data: { leaderboard } })
    } catch (e) {
        restUtils.handleException(e, reply)
    }
}

async function getImages(request, reply) {
    try {
        const images = await fileDB.getImages()
        reply.code(StatusCodes.OK).send({ data: images })
    } catch (e) {
        restUtils.handleException(e, reply)
    }
}

module.exports = {
    setLeaderboardScore,
    getLeaderboardScore,
    getLeaderboard,
    getImages
}
