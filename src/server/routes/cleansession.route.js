/**
 * The cleansession router regenerates the user's session and sends the new session ID to the browser.
 * Primarily used for UI, E2E and performance testing.
 * Routes: /cleansession
 * @module routers/cleansession
 */

const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");

const cleansessionRouter = () => {
    const router = Router();

    router.get("", (req, res) => {
        logEmitter.emit("functionCall", "Routes", "/cleansession route");
        req.session.regenerate(async (err) => {
            if (err) {
                logEmitter.emit(
                    "functionFail",
                    "Routes",
                    "/cleansession route",
                    err
                );
                res.json({ error: "Session regenerate failed." });
            } else {
                logEmitter.emit(
                    "functionSuccessWith",
                    "Routes",
                    "/cleansession route",
                    `Redirecting to: /`
                );
                res.set("session_id", req.sessionID);
                res.json({ session_id: req.sessionID });
            }
        });
    });

    return router;
};

module.exports = { cleansessionRouter };
