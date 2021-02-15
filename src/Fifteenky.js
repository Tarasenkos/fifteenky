import { Empty, Fishka } from "./Fishka.js"

export class Fifteenky {
  constructor(selector) {
    this.root = document.querySelector(selector)
    
  }

  init() {
    this.state = generateArray()
    this.render(this.state)
    this.root.addEventListener('click', () => this.changePlaces(this.state, 14))
  }


  render(elements) {

    this.root.innerHTML = ''
    const domElements = this.getElements(elements)
    domElements.forEach((element) => {
      this.root.insertAdjacentElement('beforeend', element)
    })

  }

  getElements(elements) {

    const HTML = elements.map(element => {
      if (element === 'empty') {
        let empty = new Empty
        
        return empty.getDomElement()
      }
        let fishka = new Fishka(element)
        return fishka.getDomElement()
    })

    return HTML

  }

  changePlaces(array, element){
  let emptyIndex = array.indexOf('empty')
  let targetIndex = array.indexOf(element)

  array[emptyIndex] = element
  array[targetIndex] = 'empty'

  this.render(array)

}

}

function generateArray(){
  let elements = initialArray()
  let result = []

  for (let i = 15 ; i >= 1; i--) {
    let index = [random(i-1)]
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

  for (let i = 1; i<=15; i++) {
    result.push(i)
  }

  return result
}



function random(number) {

  let random = Math.round(Math.random()*number)

return random
}



