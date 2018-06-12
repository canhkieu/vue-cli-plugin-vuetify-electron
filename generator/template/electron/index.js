const { app, BrowserWindow } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Tạo một cửa sổ trình duyệt.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      "web-security": false
    }
  });

  // và tải trang index.html của ứng dụng lên.
  if (process.env.NODE_ENV === "dev") {
    win.loadURL("http://localhost:8080");

    // Open the DevTools && Vue-Devtools
    win.webContents.openDevTools();
    let installExtension = require("electron-devtools-installer");
    installExtension
      .default(installExtension.VUEJS_DEVTOOLS)
      .then(() => {
        console.log("`Vue-Devtools` installed");
      })
      .catch(err => {
        console.error("Can not install `vue-devtools`: \n", err);
      });
  } else {
    win.loadFile("./dist/index.html");
  }

  // Bắt sự kiện cửa sổ được đóng lại.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  if (process.env.NODE_ENV === "dev") {
  }
}

// Phương thức này sẽ được gọi ra khi Electron hoàn thành
//  khởi tạo và sẳn sàng để tạo ra các cửa sở trình duyệt.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Thoát ra khi tất cả cửa sổ đóng lại.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
