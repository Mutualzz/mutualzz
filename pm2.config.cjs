module.exports = {
    apps: [
        {
            name: "mutualzz-server",
            script: "pnpm",
            args: ["start"],
            interpreter: "none",
            cwd: "./apps/server",
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
