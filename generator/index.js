module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    scripts: {
      electron: "electron .",
      "electron-serve": "vue-cli-service electron-serve",
      "electron-build": "electron-packager . --out dist/build --overwrite"
      //"deb": "electron-installer-debian --src dist/build/electron-1-linux-x64 --dest dist/installers/ --arch amd64",
    },
    devDependencies: {
      electron: "^2.0.2",
      "electron-devtools-installer": "^2.2.4",
      "electron-packager": "^12.1.0"
    }
  });
};
