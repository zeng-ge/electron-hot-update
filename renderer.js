// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const onUpgrade = async () => {
    console.log('upgrade')
    await window.browser.upgrade()
    console.log('after upgrade')
}
window.onload = () => {
    document.querySelector('#upgrade-btn').addEventListener('click', onUpgrade)
}