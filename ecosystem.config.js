module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'appPublish',
      script: './bin/www',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'root',
      host: ['47.97.73.17'],
      ref: 'origin/master',
      repo: 'https://github.com/ChenArno/apk-node.git',
      path: '/var/node',
      "ssh_options": "StrictHostKeyChecking=no",
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
};