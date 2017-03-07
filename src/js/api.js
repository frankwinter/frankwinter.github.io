'use strict'

import 'whatwg-fetch'
import config from '../../config.json'

let api = () => {
  let getRepos = () => fetch(`https://api.github.com/users/${config.username}/repos?type=sources`, { headers: { Authorization: 'Basic ' + btoa(config.username + ':' + config.password) } }).then(onSuccess, onError)
  let getReadme = repoName => fetch(`https://api.github.com/repos/${config.username}/${repoName}/readme`).then(onSuccess, onError)
  let onSuccess = response => response.json()
  let onError = error => console.log(error)

  return {
    getRepos: getRepos,
    getReadme: getReadme
  }
}

module.exports = api()