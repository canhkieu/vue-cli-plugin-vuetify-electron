module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    scripts: {
      dev: "npm run electron-serve",
      prod: "npm run electron-prod",
      electron: "electron .",
      "electron-serve": "vue-cli-service electron-serve",
      "electron-prod": "vue-cli-service electron-prod"
    },
    devDependencies: {
      electron: "^2.0.2",
      "electron-devtools-installer": "^2.2.4",
      "electron-packager": "^12.1.0"
    },
    main: "./electron/index.js",
    author: {
      name: "Canh Kieu",
      email: "canhkieu@azwebplus.com"
    },
    build: {
      appId: "com.example.app",
      productName: "Electron App",
      copyright: "Copyright © 2018",
      dmg: {
        contents: [
          {
            x: 410,
            y: 150,
            type: "link",
            path: "/Applications"
          },
          {
            x: 130,
            y: 150,
            type: "file"
          }
        ]
      },
      directories: {
        output: "build"
      },
      files: ["dist/**/*", "electron/*", "build/icons/icon.*"],
      mac: {
        icon: "build/icons/icon.icns"
      },
      win: {
        icon: "build/icons/icon.ico"
      },
      linux: {
        icon: "build/icons"
      }
    }
  });
};
