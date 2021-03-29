export class Fishka {
  static classname = 'fifteenky-cell'

  constructor(number, trigger) {

    this.trigger = trigger
    this.number = number
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