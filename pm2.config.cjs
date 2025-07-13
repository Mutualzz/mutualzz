module.exports = {
    apps: [
        {
            name: "mutualzz-rest",
            script: "bun",
            args: ["run", "start:rest"],
            interpreter: "none",
            env: {
                NODE_ENV: "production",
            },
        },
        {
            name: "mutualzz-gateway",
            script: "bun",
            args: ["run", "start:gateway"],
            interpreter: "none",
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
