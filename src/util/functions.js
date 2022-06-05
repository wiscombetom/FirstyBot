const colors = require('colors')
const { existsSync, readdirSync } = require('fs')
const { resolve } = require('path')

const loadDotEnv = () => {
	if (existsSync(resolve('./.env'))) {
		require('dotenv').config()
	}
}

const getFolders = (path) => {
	return readdirSync(resolve(path))
}

const getJsFiles = (path) => {
	return getFiles(path, '.js')
}

const getFiles = (path, ending) => {
	return readdirSync(resolve(path)).filter(f => f.endsWith(ending))
}

const getFile = (path) => {
	return require(resolve(path))
}

const display = (message = '', type) => {
	switch (type) {
	case 'warn':
		console.log(colors.blue('warn\u0020').concat(message))
		break
	case 'error':
		console.log(colors.red('error\u0020').concat(message))
		break
	default:
		console.log(colors.yellow('log\u0020').concat(message))
		break
	}
}

module.exports = {
	display,
	getFolders,
	getJsFiles,
	getFile,
	loadDotEnv,
}