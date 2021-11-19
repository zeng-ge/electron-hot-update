const path = require('path');
const bsdiff = require('bsdiff-node')

const oldFile = path.join(__dirname, 'zip/test-patch.zip');
const newFile = path.join(__dirname, 'zip/test-patch-2.zip');
const patchFile = path.join(__dirname, 'zip/test-patch.patch');
const mergeFile = path.join(__dirname, 'zip/test-patch.merge.zip');

// diff出差分包
// bsdiff.diff(oldFile, newFile, patchFile, function(result){
//   console.log('diff:' + String(result).padStart(4) + '%');
// })

// merge老包和patch包，生成最新的包
bsdiff.patch(oldFile, mergeFile, patchFile, (result) => {
  console.log('patch:' + String(result).padStart(4) + '%');
})