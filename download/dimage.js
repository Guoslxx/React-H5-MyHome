var path = require('path');
var fs = require('fs');
var request = require('request');
var sourceJson = require('./resource.json');
const urlPrefix = 'https://img.flyh5.cn/game/cgz_game/2019/0117_FamilyFood_1_c/resource/'
function downloadFile(imgPath, callback) {
    let fileName = path.basename(imgPath);
    let fileDownloadPath = './' + fileName;
    let exist = fs.existsSync(fileDownloadPath);
    if (!exist) {
        let writeStream = fs.createWriteStream(fileDownloadPath);
        let readStream = request(imgPath);
        readStream.pipe(writeStream);
        readStream.on('end', function () {
            readStream.end();
            callback(null, 'success');
            // console.log(`文件下载成功${fileDownloadPath}`);
        });
        readStream.on('error', function (error) {
            writeStream.end();
            fs.unlinkSync(fileDownloadPath);
            // console.log(`错误信息:${error}`);
            // 下载失败的，重新下载TODO
            readStream.end();
            callback(null, 'fail');
            setTimeout(() => {
                bagpipe.push(downloadFile, imgPath, function (err, data) {
                });
            }, 5000);
        })
        writeStream.on("finish", function () {
            readStream.end();
            writeStream.end();
        })
            .on('error', function (err) {
                readStream.end();
                writeStream.end();
                // console.log(`文件写入失败}`);
            });
    } else {
        console.log('this file is existed');
    }
}
const { resources } = sourceJson;
resources.forEach(source => {
    if (source.type == 'image') {
        downloadFile(urlPrefix + source.url, (error, res) => {
            console.log('下载结果', error, res)
        })
    }
})