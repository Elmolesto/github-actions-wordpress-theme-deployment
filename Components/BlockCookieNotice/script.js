import $ from 'jquery'

class BlockCookieNotice extends window.HTMLDivElement {
  constructor (self) {
    self = super(self)
    self.$ = $(self)
    self.setOptions()
    self.resolveElements()
    return self
  }

  setOptions () {
    this.cookieName = 'cookieNoticeSeen'
  }

  resolveElements () {
    this.$closeButton = $('[data-close]', this)
  }

  connectedCallback () {
    this.showCookieNotice()
    this.$closeButton.on('click', this.hideCookieNotice.bind(this))
  }

  showCookieNotice () {
    if (document.cookie.match(this.cookieName) === null) {
      this.$.addClass('cookieNotice--isVisible')
    }
  }

  hideCookieNotice (e) {
    e.preventDefault()
    document.cookie = this.cookieName + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/'
    this.$.removeClass('cookieNotice--isVisible')
  }
}

window.customElements.define('flynt-block-cookie-notice', BlockCookieNotice, { extends: 'div' })
