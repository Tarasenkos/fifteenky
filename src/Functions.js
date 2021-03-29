export function generateArray() {
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

function initialArray() {
  let result = []
  for (let i = 1; i <= 15; i++) {
    result.push(i)
  }

  return result
}

function exclude(array, element) {
  let index = array.indexOf(element)
  return array.filter((el) => array.indexOf(el) !== index)
}

function random(number) {

  return Math.round(Math.random() * number)
}