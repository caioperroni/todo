# enhace: mode logic with argvs
rm -rf dist && webpack --mode development --config webpack.config.js
node ./src/config/swagger.js $1
