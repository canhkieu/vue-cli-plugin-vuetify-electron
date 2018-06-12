const { info } = require("@vue/cli-shared-utils");
const { spawn } = require("child_process");

const defaults = {
  mode: "development",
  host: "0.0.0.0",
  port: 8080,
  https: false
};

module.exports = (api, options) => {
  const address = require("address");
  const portfinder = require("portfinder");

  api.registerCommand(
    "electron-serve",
    {
      description: "start development server for electron",
      usage: "vue-cli-service electron-serve [options]",
      options: {
        "--open": `open browser on server start`,
        "--host": `specify host (default: ${defaults.host})`,
        "--port": `specify port (default: ${defaults.port})`,
        "--https": `use https (default: ${defaults.https})`
      }
    },
    args => {
      const projectDevServerOptions = options.devServer || {};
      portfinder.basePort =
        args.port ||
        process.env.PORT ||
        projectDevServerOptions.port ||
        defaults.port;
      return portfinder.getPortPromise().then(port => {
        const serveArgs = {
          open: args.open,
          host:
            args.host ||
            process.env.HOST ||
            projectDevServerOptions.host ||
            defaults.host,
          port,
          https: args.https || projectDevServerOptions.https || defaults.https,
          lanIp: address.ip()
        };
        return api.service.run("serve", serveArgs).then(result => {
          info("Begin build electron");
          let cordovaProcess = spawn("npm", ["run", "electron"]);

          cordovaProcess.stdout.on("data", data => {
            console.log(`Electron: ${data}`);
          });

          cordovaProcess.stderr.on("data", data => {
            console.log(`Electron: ${data}`);
          });

          cordovaProcess.on("close", code => {
            console.log(`Electron exited with code ${code}`);
          });
        });
      });
    }
  );

  api.configureWebpack(config => {
    config.output.publicPath =
      process.env.NODE_ENV === "development" ? "/" : "./";
  });
};

module.exports.defaultModes = {
  "electron-serve": "development"
};
