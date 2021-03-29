import { Fishka } from "./Fishka.js"
import { Empty } from "./Empty.js"
import { generateArray } from "./Functions.js"
import { Trigger } from "./Trigger.js"

export class Fifteenky extends Trigger {
  constructor(selector) {
    super()
    this.root = document.querySelector(selector)
    this.trigger = new Trigger

  }

  init() {
    
    const initialArray = generateArray()
    const domElements = this.getDOMElements(initialArray)
    setDirections(domElements)
    this.render(domElements)
    
    this.root.addEventListener('click', (event) => this.changePlaces(domElements, event.target))
  }

  render(domElements) {

    this.root.innerHTML = ''
    domElements.forEach((element) => {
      this.root.insertAdjacentElement('beforeend', element.getDomElement())
    })
  }

  changePlaces(domElements, element) {


    if (element.id === 'fifteenky') return
    if (element.innerText === '') return

    let domElement, emptyElement

    domElements.forEach((el) => {
      if (el.number === +element.textContent) domElement = el
      if (el.number === 'empty') emptyElement = el
    })

    if (domElement.direction === 'noop') return

    let emptyIndex = domElements.indexOf(emptyElement)
    let targetIndex = domElements.indexOf(domElement)

    domElements[emptyIndex] = domElement
    domElements[targetIndex] = emptyElement

    this.trigger.emit(element.textContent, element)

    setTimeout(() => {
      element.classList.remove(domElement.direction)
      this.render(domElements)
      let newEmptyIndex = domElements.indexOf(emptyElement)
      setDirections(domElements, newEmptyIndex)
      this.ifYouWin(domElements)
    }, 150)

  }

  ifYouWin(domElements) {

    let winner = true

    domElements.forEach((el, index) => {

      if (el.root) {
        if (+el.root.textContent !== index + 1) {
          return winner = false
        }
      }
    });

    if (winner) {
      this.destroy()
      alert('Поздравляю, Вы победили!')
      
    }
  }

  destroy() {
    this.root.removeEventListener('click', (event) => this.changePlaces(domElements, event.target))
  }

  getDOMElements(arrayOfNumbers) {

      return arrayOfNumbers.map(number => {
        if (number === 'empty') {
          return new Empty
        }
        return new Fishka(number, this.trigger)
      })
    }
}

function setDirections(domElements, emptyIndex = 15) {
  clearDirections(domElements)
  setPossibleDirections(domElements, emptyIndex)
  setImPossibleDirections(domElements)
}

function clearDirections(domElements) {
  domElements.forEach((el) => el.direction = 'noop')
}

function setPossibleDirections(domElements, emptyIndex) {

  const upperIndex = emptyIndex - 4
  const lowerIndex = emptyIndex + 4
  const rightIndex = emptyIndex + 1
  const leftIndex = emptyIndex - 1

  if (upperIndex >= 0) { domElements[upperIndex].direction = 'down' }
  if (lowerIndex <= 15) { domElements[lowerIndex].direction = 'up' }
  if (rightIndex <= 15) { domElements[rightIndex].direction = 'left' }
  if (leftIndex >= 0) { domElements[leftIndex].direction = 'right' }

}

function setImPossibleDirections(domElements) {

  const rightEls = [3, 7, 11, 15]
  const leftEls = [4, 8, 12]

  domElements.map((el, index) => {

    if ((el.direction === 'right') && (rightEls.includes(index))) {
      el.direction = 'noop'
    }
    if ((el.direction === 'left') && (leftEls.includes(index))) {
      el.direction = 'noop'

    }
  })

}