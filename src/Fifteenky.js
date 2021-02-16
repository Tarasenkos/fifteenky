import { Empty, Fishka } from "./Fishka.js"
import { Trigger } from "./Trigger.js"

export class Fifteenky extends Trigger {
  constructor(selector) {
    super()
    this.root = document.querySelector(selector)
    this.trigger = new Trigger

  }

  init() {

    const getDOMElements = (arrayOfNumbers) => {

      return arrayOfNumbers.map(number => {
        if (number === 'empty') {
          return new Empty
        }
        return new Fishka(number, this.trigger)
      })
    }

    const initialArray = generateArray()
    const domElements = getDOMElements(initialArray)
    this.render(domElements)
    setDirections(domElements)

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
}




function setDirections(domElements, emptyIndex = 15) {


  domElements.forEach((el) => el.direction = 'noop')


  let upperIndex = emptyIndex - 4
  let lowerIndex = emptyIndex + 4
  let rightIndex = emptyIndex + 1
  let leftIndex = emptyIndex - 1


  if (upperIndex >= 0) { domElements[upperIndex].direction = 'down' }


  if (lowerIndex <= 15) { domElements[lowerIndex].direction = 'up' }
  if (rightIndex <= 15) { domElements[rightIndex].direction = 'left' }
  if (leftIndex >= 0) { domElements[leftIndex].direction = 'right' }

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


function generateArray() {
  let elements = initialArray()
  let result = []

  for (let i = 15; i >= 1; i--) {
    let index = [random(i - 1)]
    let el = elements[index]
    result.push(el)
    elements = exclude(elements, el)
  }

  result.push('empty')

  return result
}



function exclude(array, element) {
  let index = array.indexOf(element)
  return array.filter((el) => array.indexOf(el) !== index)
}


function initialArray() {
  let result = []
  for (let i = 1; i <= 15; i++) {
    result.push(i)
  }

  return result
}


function random(number) {

  return Math.round(Math.random() * number)
}
