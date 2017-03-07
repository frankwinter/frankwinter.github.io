require('../index.html')
require('../styl/main.styl')

import api from './api'
import showdown from 'showdown'

let repoList = ''
let converter = new showdown.Converter()

let repos = api.getRepos().then(repos => {
  repos.forEach(repo => {
    if (repo.fork === false) {
      repoList += `<article class="repo__item">
        <h1><a href="${repo.html_url}" target="_blank">${repo.name}</a></h1>
        <p>${repo.description}</p>
        <a class="repo__readme" href="#" data-repo="${repo.name}">RM</a>
      </article>`
    }
  })

  document.getElementById('repoContainer').innerHTML = repoList

  let readmeLinks = document.querySelectorAll('.repo__readme')

  readmeLinks.forEach(el => {
    el.addEventListener('click', () => {
      api.getReadme(el.getAttribute('data-repo')).then(readme => {
        document.getElementById('readmeContainer').innerHTML = converter.makeHtml(atob(readme.content))
      })
    })
  })
})

