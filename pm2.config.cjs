module.exports = {
    apps: [
        {
            name: "mutualzz-rest",
            script: "pnpm",
            args: ["start"],
            interpreter: "none",
            cwd: "./apps/rest",
            env: {
                NODE_ENV: "production",
            },
        },
        {
            name: "mutualzz-gateway",
            script: "pnpm",
            args: ["start"],
            interpreter: "none",
            cwd: "./apps/gateway",
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
