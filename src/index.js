const core = require('@actions/core')
const exec = require('@actions/exec')

/**
 * Run the shell command
 * @param {string} cmd
 * @param  {...any} params
 */
async function run(cmd, ...params) {
  const options = {
    failOnStdErr: false,
  }
  return exec.exec(cmd, params, options)
}

/**
 * Get current working branch
 */
function getCurrentBranch() {
  const branchName = process.env.GITHUB_REF.split('/').pop()
  core.info('Original branch name: ', branchName)
  return branchName.replace(/\//, '-')
}

/**
 * Action execution
 */
;(async () => {
  const branchName = getCurrentBranch()
  try {
    await run('npm', 'install', 'serverless', '-g')
    await run('sls', 'remove', '--stage', branchName)
    core.info('Deploy removed')
  } catch (error) {
    core.setFailed(error.message)
  } finally {
    core.exportVariable('NODE_AUTH_TOKEN', 'XXXXX-XXXXX-XXXXX-XXXXX')
    core.exportVariable('AWS_ACCESS_KEY_ID', 'XXXXX-XXXXX-XXXXX-XXXXX')
    core.exportVariable('AWS_SECRET_ACCESS_KEY', 'XXXXX-XXXXX-XXXXX-XXXXX')
  }
})()
