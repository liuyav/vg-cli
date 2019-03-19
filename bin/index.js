#!/usr/bin/env node
const commander = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const stat = fs.stat;
const curPath = process.cwd();
const temPath = path.resolve(__dirname, '../template');
const temConfigPath = path.join(temPath, 'config');
const packagePath = path.join(temConfigPath, 'package.json');
const packageJson = require('../template/config/package.json');

// package包名（从当前命令行位置取得）
const packageName = curPath.split('\\')[curPath.split('\\').length - 1];

commander
  .command('init [targetLnik] [targetDir]')
  .action((targetLnik, targetDir) => {
    addPackageInfo({
      'name': packageName,
      'gameDir': packageName,
      'targetLnik': targetLnik || '',
      'targetDir': targetDir
    });
    exists(temConfigPath, curPath, copy);
    console.log( chalk.green('\n 安装项目配置成功') )
    console.log( chalk.green('\n 执行 npm i 安装依赖') )
  })

commander
  .command('set <targetLnik>')
  .action((targetLnik) => {
    addPackageInfo({
      'targetLnik': targetLnik || '',
      'targetDir': targetDir
    });
    exists(temConfigPath, curPath, copy);
    console.log( chalk.green('\n 修改分离地址成功') )
  })

commander.parse(process.argv);

// 改写package.json
function addPackageInfo(opt) {
  fs.readFile(packagePath,'utf8',function (err, data) {
    if(err) console.log(err);
    var d = JSON.parse(data);

    for (var key in opt) {
      d[key] = opt[key]
    }

    var t = JSON.stringify(d, null, '  ');
    fs.writeFileSync(packagePath, t)
  });
}

// 复制目录
function copy(src, dst){
  // 读取目录中的所有文件/目录
  fs.readdir( src, function(err, paths){
    if( err ){
      throw err;
    }

    paths.forEach(function( path ){
      var _src = src + '/' + path,
          _dst = dst + '/' + path,
          readable, writable;

      stat( _src, function( err, st ){
        if( err ){
          throw err;
        }

        // 判断是否为文件
        if( st.isFile() ){
          // 创建读取流
          readable = fs.createReadStream( _src );
          // 创建写入流
          writable = fs.createWriteStream( _dst ); 
          // 通过管道来传输流
          readable.pipe( writable );
        }
        // 如果是目录则递归调用自身
        else if( st.isDirectory() ){
          exists( _src, _dst, copy );
        }
      });
    });
  });
};

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
function exists(src, dst, callback){
  fs.exists( dst, function( exists ){
    // 已存在
    if( exists ){
      callback( src, dst );
    }
    // 不存在
    else{
      fs.mkdir( dst, function(){
        callback( src, dst );
      });
    }
  });
};