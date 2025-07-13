import Redis from "ioredis";
import { WebSocketServer } from "ws";
import { logger } from "./logger";

const PORT = parseInt(process.env.PORT ?? "8080");

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT ?? "6379"),
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME,
});

const wss = new WebSocketServer({
    port: PORT,
    perMessageDeflate: {
        zlibDeflateOptions: {
            level: 7,
        },
        zlibInflateOptions: {
            chunkSize: 1024,
        },
        clientNoContextTakeover: true,
        serverNoContextTakeover: true,
        threshold: 1024,
    },
});

redis.on("ready", () => {
    logger.info("Connected to Redis");
});

wss.on("connection", (ws, req) => {
    logger.info(`New connection from ${req.socket.remoteAddress}`);

    ws.on("close", () => {
        logger.info(`Connection closed from ${req.socket.remoteAddress}`);
    });

    ws.on("error", (error) => {
        logger.error(`WebSocket error: ${error.message}`);
    });
});

logger.info(`WebSocket server is running on port ${PORT}`);
