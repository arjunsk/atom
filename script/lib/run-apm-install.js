'use strict'

const childProcess = require('child_process')

const CONFIG = require('../config')

module.exports = function (packagePath, ci, stdioOptions) {
  const installEnv = Object.assign({}, process.env)
  // Set resource path so that apm can load metadata related to Atom.
  installEnv.ATOM_RESOURCE_PATH = CONFIG.repositoryRootPath
  // Set our target (Electron) version so that node-pre-gyp can download the
  // proper binaries.
  installEnv.npm_config_target = CONFIG.appMetadata.electronVersion
  console.log('Arch before spawning apm is: ' + process.arch)
  childProcess.execFileSync(
    CONFIG.getApmBinPath(),
    [ci ? 'ci' : 'install', '--verbose'],
    {env: installEnv, cwd: packagePath, stdio: stdioOptions || 'inherit'}
  )
}
