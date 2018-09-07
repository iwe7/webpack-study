import "document-register-element/build/document-register-element";
import "reflect-metadata";
// import "./components/app-test";
// import "./components/app-test2";
import "./components/video-player/video-player";
// import "./components/app-test3";

import { appBootstrap } from './core';
appBootstrap().subscribe(() => {
    // document.body.innerHTML = `
    //     <video-player></video-player>
    // `;
    import("./core/dom/html-element")
});
