const shortID = require("shortid");
const {URL} = require("../models/url");

async function handleGenerateNewShortURL(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error:'url is required'});
    const shortid = shortID(8);
    await URL.create({
        shortId:shortid,
        redirectURL:body.url,
        visitedHistory:[]
    })
    return res.json({id:shortid})
}

async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}