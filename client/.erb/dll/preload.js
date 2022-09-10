/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*****************************!*\
  !*** ./src/main/preload.ts ***!
  \*****************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron_1 = __webpack_require__(/*! electron */ "electron");
electron_1.contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        sendMessage(channel, args) {
            electron_1.ipcRenderer.send(channel, args);
        },
        on(channel, func) {
            const subscription = (_event, ...args) => func(...args);
            electron_1.ipcRenderer.on(channel, subscription);
            return () => electron_1.ipcRenderer.removeListener(channel, subscription);
        },
        once(channel, func) {
            electron_1.ipcRenderer.once(channel, (_event, ...args) => func(...args));
        },
    },
    store: {
        get(val) {
            return electron_1.ipcRenderer.sendSync('electron-store-get', val);
        },
        set(property, val) {
            electron_1.ipcRenderer.send('electron-store-set', property, val);
        },
        path() {
            electron_1.ipcRenderer.sendSync('electron-store-path');
        },
    },
    api: {
        getUrl() {
            return electron_1.ipcRenderer.sendSync('api-url-get');
        },
    },
    gamesApi: {
        async getFetchedGames() {
            return electron_1.ipcRenderer.sendSync('gamesApi-get-fetched-games');
        },
        downloadGame(gameName) {
            return electron_1.ipcRenderer.sendSync('gamesApi-download-game', gameName);
        },
        uninstallGame(gameName) {
            return electron_1.ipcRenderer.sendSync('gamesApi-uninstall-game', gameName);
        },
        getLibrary() {
            return electron_1.ipcRenderer.sendSync('gamesApi-get-library');
        },
    },
});

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7OztBQ3RCQSxtRUFBd0U7QUFJeEUsd0JBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUU7SUFDMUMsV0FBVyxFQUFFO1FBQ1gsV0FBVyxDQUFDLE9BQWlCLEVBQUUsSUFBZTtZQUM1QyxzQkFBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUNELEVBQUUsQ0FBQyxPQUFpQixFQUFFLElBQWtDO1lBQ3RELE1BQU0sWUFBWSxHQUFHLENBQUMsTUFBd0IsRUFBRSxHQUFHLElBQWUsRUFBRSxFQUFFLENBQ3BFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ2hCLHNCQUFXLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztZQUV0QyxPQUFPLEdBQUcsRUFBRSxDQUFDLHNCQUFXLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQWlCLEVBQUUsSUFBa0M7WUFDeEQsc0JBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7S0FDRjtJQUNELEtBQUssRUFBRTtRQUNMLEdBQUcsQ0FBQyxHQUFRO1lBQ1YsT0FBTyxzQkFBVyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBQ0QsR0FBRyxDQUFDLFFBQWEsRUFBRSxHQUFRO1lBQ3pCLHNCQUFXLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBQ0QsSUFBSTtZQUNGLHNCQUFXLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDOUMsQ0FBQztLQUNGO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsTUFBTTtZQUNKLE9BQU8sc0JBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0MsQ0FBQztLQUNGO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsS0FBSyxDQUFDLGVBQWU7WUFDbkIsT0FBTyxzQkFBVyxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFDRCxZQUFZLENBQUMsUUFBZ0I7WUFDM0IsT0FBTyxzQkFBVyxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBQ0QsYUFBYSxDQUFDLFFBQWdCO1lBQzVCLE9BQU8sc0JBQVcsQ0FBQyxRQUFRLENBQUMseUJBQXlCLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkUsQ0FBQztRQUNELFVBQVU7WUFDUixPQUFPLHNCQUFXLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDdEQsQ0FBQztLQUNGO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJlbGVjdHJvblwiIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9wcmVsb2FkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgeyBjb250ZXh0QnJpZGdlLCBpcGNSZW5kZXJlciwgSXBjUmVuZGVyZXJFdmVudCB9IGZyb20gJ2VsZWN0cm9uJztcblxuZXhwb3J0IHR5cGUgQ2hhbm5lbHMgPSAnaXBjLWV4YW1wbGUnO1xuXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdlbGVjdHJvbicsIHtcbiAgaXBjUmVuZGVyZXI6IHtcbiAgICBzZW5kTWVzc2FnZShjaGFubmVsOiBDaGFubmVscywgYXJnczogdW5rbm93bltdKSB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKGNoYW5uZWwsIGFyZ3MpO1xuICAgIH0sXG4gICAgb24oY2hhbm5lbDogQ2hhbm5lbHMsIGZ1bmM6ICguLi5hcmdzOiB1bmtub3duW10pID0+IHZvaWQpIHtcbiAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IChfZXZlbnQ6IElwY1JlbmRlcmVyRXZlbnQsIC4uLmFyZ3M6IHVua25vd25bXSkgPT5cbiAgICAgICAgZnVuYyguLi5hcmdzKTtcbiAgICAgIGlwY1JlbmRlcmVyLm9uKGNoYW5uZWwsIHN1YnNjcmlwdGlvbik7XG5cbiAgICAgIHJldHVybiAoKSA9PiBpcGNSZW5kZXJlci5yZW1vdmVMaXN0ZW5lcihjaGFubmVsLCBzdWJzY3JpcHRpb24pO1xuICAgIH0sXG4gICAgb25jZShjaGFubmVsOiBDaGFubmVscywgZnVuYzogKC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdm9pZCkge1xuICAgICAgaXBjUmVuZGVyZXIub25jZShjaGFubmVsLCAoX2V2ZW50LCAuLi5hcmdzKSA9PiBmdW5jKC4uLmFyZ3MpKTtcbiAgICB9LFxuICB9LFxuICBzdG9yZToge1xuICAgIGdldCh2YWw6IGFueSkge1xuICAgICAgcmV0dXJuIGlwY1JlbmRlcmVyLnNlbmRTeW5jKCdlbGVjdHJvbi1zdG9yZS1nZXQnLCB2YWwpO1xuICAgIH0sXG4gICAgc2V0KHByb3BlcnR5OiBhbnksIHZhbDogYW55KSB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdlbGVjdHJvbi1zdG9yZS1zZXQnLCBwcm9wZXJ0eSwgdmFsKTtcbiAgICB9LFxuICAgIHBhdGgoKSB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kU3luYygnZWxlY3Ryb24tc3RvcmUtcGF0aCcpO1xuICAgIH0sXG4gIH0sXG4gIGFwaToge1xuICAgIGdldFVybCgpIHtcbiAgICAgIHJldHVybiBpcGNSZW5kZXJlci5zZW5kU3luYygnYXBpLXVybC1nZXQnKTtcbiAgICB9LFxuICB9LFxuICBnYW1lc0FwaToge1xuICAgIGFzeW5jIGdldEZldGNoZWRHYW1lcygpIHtcbiAgICAgIHJldHVybiBpcGNSZW5kZXJlci5zZW5kU3luYygnZ2FtZXNBcGktZ2V0LWZldGNoZWQtZ2FtZXMnKTtcbiAgICB9LFxuICAgIGRvd25sb2FkR2FtZShnYW1lTmFtZTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gaXBjUmVuZGVyZXIuc2VuZFN5bmMoJ2dhbWVzQXBpLWRvd25sb2FkLWdhbWUnLCBnYW1lTmFtZSk7XG4gICAgfSxcbiAgICB1bmluc3RhbGxHYW1lKGdhbWVOYW1lOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiBpcGNSZW5kZXJlci5zZW5kU3luYygnZ2FtZXNBcGktdW5pbnN0YWxsLWdhbWUnLCBnYW1lTmFtZSk7XG4gICAgfSxcbiAgICBnZXRMaWJyYXJ5KCkge1xuICAgICAgcmV0dXJuIGlwY1JlbmRlcmVyLnNlbmRTeW5jKCdnYW1lc0FwaS1nZXQtbGlicmFyeScpO1xuICAgIH0sXG4gIH0sXG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==