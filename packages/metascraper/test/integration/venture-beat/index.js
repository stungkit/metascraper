'use strict'

const { readFile } = require('fs/promises')
const { resolve } = require('path')
const test = require('ava')

const metascraper = require('../../..')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-audio')(),
  require('metascraper-video')(),
  require('metascraper-image')(),
  require('metascraper-lang')(),
  require('metascraper-logo')(),
  require('metascraper-logo-favicon')(),
  require('metascraper-manifest')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
  require('metascraper-readability')()
])

const url =
  'https://venturebeat.com/commerce/forter-raises-32-million-to-automate-retailers-battle-against-online-fraud/'

test('venture-beat', async t => {
  const html = await readFile(resolve(__dirname, 'input.html'))
  const { date, ...metadata } = await metascraper({ html, url })
  t.is(typeof date, 'string')
  t.snapshot(metadata)
})
