/**
 * The qa router adds POST body data to the user's session and redirects to a specified page.
 * Routes: /qa/:lc/:target
 * @module routers/qa
 */

const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const { QA_KEY } = require("../config");

const qaRouter = () => {
    const router = Router();

    router.get("/:lc/:target", (req, res) => {
        logEmitter.emit("functionCall", "Routes", "/qa/:lc/:target route");
        if (req.query.QA_KEY && req.query.QA_KEY === QA_KEY) {
            req.session.council = req.params.lc;
            const target = req.params.target;
            delete req.query.QA_KEY;
            req.session.cumulativeFullAnswers = req.query;
            logEmitter.emit(
                "functionSuccessWith",
                "Routes",
                "/qa/:lc/:target route",
                target
            );
            req.session.save(() => {
                res.redirect(`/new/${req.session.council}/${target}`);
            });
        } else {
            logEmitter.emit(
                "functionFail",
                "Routes",
                "/qa/:lc/:target route",
                "403 not permitted"
            );
            res.status(403);
            res.send("Not permitted");
        }
    });

    return router;
};

module.exports = { qaRouter };
