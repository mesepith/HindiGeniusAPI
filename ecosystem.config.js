module.exports = {
    apps : [{
      name: "hindigeniusapi",
      script: "./dist/app.js",
      instances: "max", // This will use all CPUs. Adjust as needed.
      autorestart: true,
      watch: false, // Set to true if you want PM2 to restart on file changes
      max_memory_restart: '1G',
      dotenv: '.env'
    }]
  };
  