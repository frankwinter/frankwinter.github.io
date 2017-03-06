'use strict'

import 'whatwg-fetch'
import config from '../../config.json'

var api = function() {

  var getRepos = function() {
    return fetch(
      `https://api.github.com/users/${config.username}/repos?type=sources`,
      {
        headers: {
          Authorization: 'Basic ' + btoa(config.username + ':' + config.password)
        }
      }
    ).then(onSuccess, onError)
  }

  var getReadme = function(repoName) {
    return fetch(`https://api.github.com/repos/${config.username}/${repoName}/readme`).then(onSuccess, onError)
  }

  var onSuccess = function(response) {
    return response.json()
  }

  var onError = function(error) {
    console.log(error)
  }

  return {
    getRepos: getRepos,
    getReadme: getReadme
  }
}

module.exports = api()