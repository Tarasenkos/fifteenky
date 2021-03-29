export class Empty {
  constructor() {
    this.number = 'empty'
  }

  getDomElement() {
    const domElement = document.createElement('div')
    domElement.innerHTML = `<div class="fifteenky-cell empty" dataset-number="empty"></div>`
    return domElement
  }

}