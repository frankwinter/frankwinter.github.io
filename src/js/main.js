require('../index.html')
require('../styl/main.styl')

import api from './api'
import showdown from 'showdown'

var repoList = ''
var converter = new showdown.Converter()

let repos = api.getRepos().then(function(repos) {
  repos.forEach(repo => {
    if (repo.fork === false) {
      repoList += `<article class="repo__item">
        <h1>${repo.name}</h1>
        <h2>${repo.description}</h2>
        <p>${repo.html_url}</p>
        <a class="repo__readme" href="#" data-repo="${repo.name}">RM</a>
      </article>`
    }
  })

  document.getElementById('repoContainer').innerHTML = repoList

  var readmeLinks = document.querySelectorAll('.repo__readme')

  readmeLinks.forEach(function(el) {
    el.addEventListener('click', function() {
      api.getReadme(el.getAttribute('data-repo')).then(function(readme) {
        document.getElementById('readmeContainer').innerHTML = converter.makeHtml(atob(readme.content))
      })
    })
  })
})

