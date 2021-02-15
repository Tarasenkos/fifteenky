export class Fishka {
constructor(element) {
  this.element = element
  this.root = document.createElement('div')

}

getDomElement(){

  this.root.innerHTML = `<div class="fifteenky-cell" 
                          dataset-number="${this.element}">${this.element}</div>`  
  return this.root
  
}

move(direction){


}

}


export class Empty {
  constructor() {

  }

  getDomElement() {
    const domElement = document.createElement('div')
    domElement.innerHTML = `<div class="fifteenky-cell empty" dataset-number="empty"></div>`
    
    return domElement
  }

}

