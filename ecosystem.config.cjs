/**
 * PM2 Ecosystem Configuration for DEVOPS Academy Student Portal
 * 
 * VPS Production Deployment:
 *   Directory: /var/www/html/sites/moodle/public/lessons/ai8
 *   Port: 3002
 *   API Base: /ai/api
 *   Runner: ./node_modules/.bin/tsx server.ts
 */

module.exports = {
  apps: [
    {
      name: "devops-portal-3002",
      cwd: "/var/www/html/sites/moodle/public/lessons/ai8",

      script: "./node_modules/.bin/tsx",
      args: "server.ts",

      interpreter: "none",

      instances: 1,
      exec_mode: "fork",

      autorestart: true,
      watch: false,

      max_memory_restart: "500M",

      env: {
        NODE_ENV: "production",
        PORT: "3002",
        SQLITE_DB_PATH: "/var/www/html/sites/moodle/public/lessons/ai8/data/academy.sqlite",
        VITE_API_BASE_PATH: "/ai/api"
      },

      error_file: "/var/www/html/sites/moodle/public/lessons/ai8/logs/pm2-err.log",
      out_file: "/var/www/html/sites/moodle/public/lessons/ai8/logs/pm2-out.log",

      time: true
    }
  ]
};
