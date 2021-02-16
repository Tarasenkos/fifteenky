export class Fishka {
  static classname = 'fifteenky-cell'

  constructor(element, trigger) {

    this.trigger = trigger
    this.number = element
    this.direction  = 'noop'
    this.init()


  }

  init() {

    this.root = document.createElement('div')
    this.root.classList.add(Fishka.classname)
    this.trigger.subscribe(this.number, (target) => this.move(target))

  }

  getDomElement() {

    this.root.innerHTML = `<span>${this.number}</span>`
    return this.root

  }

  move(target) {
    target.classList.add(this.direction)
  }

}


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

