export class Trigger {
  constructor() {
    this.events = {}

  }
  subscribe(eventName, callBack) {
    
    this.events[eventName] = this.events[eventName] || []
    this.events[eventName].push(callBack)

  }
  emit(eventName, args = null) {

    this.events[eventName].forEach((fn) => fn(args))
  }
}