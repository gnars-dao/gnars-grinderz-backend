const utils = require('../utils/utils')
const Leaderboard = require('../model/leaderboard')

async function getOneByWalletID(nftID) {
    return await Leaderboard.findOne({ 'nft.id': nftID }).lean()
}

async function setScore({ wallet_id, nft, score }) {
    const data = new Leaderboard({ wallet_id, nft, score })
    return await data.save()
}

async function updateScore({ nft, wallet_id, score }, time) {
    return await Leaderboard.updateOne({ 'nft.id': nft.id }, { wallet_id, score, time }).lean()
}

async function getScores({ nftIDs }) {
    return await Leaderboard.aggregate()
        .match({ 'nft.id': { $in: nftIDs } })
        .project({ nft: { id: 1, icon: 1 }, score: 1, time: 1 })
}

async function getLeaderboard({ page, size }) {
    const paginatOption = utils.getPagination(+page, +size)
    return await Leaderboard.aggregate()
        .sort({ score: -1 })
        .skip(paginatOption.skip)
        .limit(paginatOption.limit)
        .project({ wallet_id: 1, nft: { id: 1, icon: 1 }, score: 1, time: 1 })
}

module.exports = { getOneByWalletID, setScore, updateScore, getScores, getLeaderboard }
