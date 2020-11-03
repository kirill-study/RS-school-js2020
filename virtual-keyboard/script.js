const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
    capsSymbDict : {
      '1': '!',
      '2': '@',
      '3': '#',
      '4': '$',
      '5': '%',
      '6': '^',
      '7': '&',
      '8': '*',
      '9': '(',
      '0': ')',
      '[': '{',
      ']': '}',
      ';': ':',
      "'": '"',
      ',': '<',
      '.': '>',
      '/': '?',
    },
    revCapsSymbDict : {
      '!': '1',
      '@': '2',
      '#': '3',
      '$': '4',
      '%': '5',
      '^': '6',
      '&': '7',
      '*': '8',
      '(': '9',
      ')': '0',
      '{': '[',
      '}': ']',
      ':': ';',
      '"': "'",
      '<': ',',
      '>': '.',
      '?': '/',
    },
    ruCapsSymbDict : {
      '1': '!',
      '2': '"',
      '3': '№',
      '4': ';',
      '5': '%',
      '6': ':',
      '7': '?',
      '8': '*',
      '9': '(',
      '0': ')',
      '.': ','
    },
    revRuCapsSymbDict : {
      '!': '1',
      '"': '2',
      '№': '3',
      ';': '4',
      '%': '5',
      ':': '6',
      '?': '7',
      '*': '8',
      '(': '9',
      ')': '0',
      ',': '.'
    },
    russianDict : {
      'q': 'й',
      'w': 'ц',
      'e': 'у',
      'r': 'к',
      't': 'е',
      'y': 'н',
      'u': 'г',
      'i': 'ш',
      'o': 'щ',
      'p': 'з',
      '[': 'х',
      ']': 'ъ',
      'a': 'ф',
      's': 'ы',
      'd': 'в',
      'f': 'а',
      'g': 'п',
      'h': 'р',
      'j': 'о',
      'k': 'л',
      'l': 'д',
      ';': 'ж',
      "'": 'э',
      'z': 'я',
      'x': 'ч',
      'c': 'с',
      'v': 'м',
      'b': 'и',
      'n': 'т',
      'm': 'ь',
      ',': 'б',
      '.': 'ю',
      '/': '.'
    },
   revRussianDict : {
      'й': 'q',
      'ц': 'w',
      'у': 'e',
      'к':'r',
      'е':'t',
      'н':'y',
      'г':'u',
      'ш':'i',
      'щ':'o',
      'з':'p',
      'х':'[',
      'ъ':']',
      'ф':'a',
      'ы':'s',
      'в':'d',
      'а':'f',
      'п':'g',
      'р': 'h',
      'о':'j',
      'л':'k',
      'д':'l',
      'ж':';',
      'э':"'",
      'я':'z',
      'ч':'x',
      'с':'c',
      'м':'v',
      'и':'b',
      'т':'n',
      'ь':'m',
      'б':',',
      'ю':'.',
      '.':'/'
    },
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: '',
    capsLock: false,
    shiftState: false,
    layoutRu: false,
    recording: false
  },

  init () {
    // Create main elements
    this.elements.main = document.createElement('div')
    this.elements.keysContainer = document.createElement('div')

    // Setup main elements
    this.elements.main.classList.add('keyboard', 'keyboard--hidden')
    this.elements.keysContainer.classList.add('keyboard__keys')
    this.elements.keysContainer.appendChild(this._createKeys())

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key')

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer)
    document.body.appendChild(this.elements.main)

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll('.use-keyboard-input').forEach(element => {
      element.addEventListener('focus', () => {
        this.open(element.value, currentValue => {
          element.value = currentValue
        })
      })
    })

    window.addEventListener('keydown', e => {
    //console.log(e.code)
    //console.log(document.querySelector(`.${e.code}`))
    e.preventDefault()
    let key = document.querySelector(`.${e.code}`)
    //document.querySelector('.KeyK').click()
    key.dispatchEvent(new MouseEvent('mousedown'))
    })
  },

  _createKeys () {
    const fragment = document.createDocumentFragment()
    let textArea = document.querySelector('.use-keyboard-input')
    const keyLayout = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace', 'sound',
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
      'en/ru', 'voice', 'space', '←', '→', 'done'
    ]

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`
    }

    keyLayout.forEach(key => {
      const keyElement = document.createElement('button')
      const insertLineBreak = ['sound', ']', 'enter', '?'].indexOf(key) !== -1

      // Add attributes/classes
      keyElement.setAttribute('type', 'button')
      keyElement.classList.add('keyboard__key')

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide')
          keyElement.innerHTML = createIconHTML('backspace')

          keyElement.addEventListener('transitionend', e => {
            if (e.propertyName != 'transform') return
            keyElement.classList.remove('playing')
          })

          keyElement.addEventListener('click', (e) => {
            e.preventDefault()
            keyElement.classList.toggle('playing')
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1)
            this._triggerEvent('oninput')
            let audio = document.querySelector('.audio-backspace')
            audio.currentTime = 0
            audio.play()
            document.querySelector('.use-keyboard-input').focus()
          })

          break

        case 'caps':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable')
          keyElement.innerHTML = createIconHTML('keyboard_capslock')

          keyElement.addEventListener('transitionend', e => {
            if (e.propertyName != 'transform') return
            keyElement.classList.remove('playing')
          })

          keyElement.addEventListener('click', (e) => {
            e.preventDefault()
            keyElement.classList.toggle('playing')
            this._toggleCapsLock()
            keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock)
            let audio = document.querySelector('.audio-caps')
            audio.currentTime = 0
            audio.play()
            document.querySelector('.use-keyboard-input').focus()
          })

          break

        case 'enter':
          keyElement.classList.add('keyboard__key--wide')
          keyElement.innerHTML = createIconHTML('keyboard_return')

          keyElement.addEventListener('transitionend', e => {
            if (e.propertyName != 'transform') return
            keyElement.classList.remove('playing')
          })

          keyElement.addEventListener('click', (e) => {
            e.preventDefault()
            keyElement.classList.toggle('playing')
            this.properties.value += '\n'
            this._triggerEvent('oninput')
            let audio = document.querySelector('.audio-enter')
            audio.currentTime = 0
            audio.play()
            document.querySelector('.use-keyboard-input').focus()
          })

          break

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide')
          keyElement.innerHTML = createIconHTML('space_bar')


          keyElement.addEventListener('transitionend', e => {
            if (e.propertyName != 'transform') return
            keyElement.classList.remove('playing')
          })
          keyElement.addEventListener('click', (e) => {
            e.preventDefault()
            keyElement.classList.toggle('playing')
            this.properties.value += ' '
            this._triggerEvent('oninput')
            let audio = document.querySelector('.audio-en')
            audio.currentTime = 0
            audio.play()
            document.querySelector('.use-keyboard-input').focus()
          })

          break

        case 'done':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark')
          keyElement.innerHTML = createIconHTML('check_circle')

          keyElement.addEventListener('transitionend', e => {
            if (e.propertyName != 'transform') return
            keyElement.classList.remove('playing')
          })

          keyElement.addEventListener('click', (e) => {
            e.preventDefault()
            keyElement.classList.toggle('playing')
            this.close()
            this._triggerEvent('onclose')
            let audio = document.querySelector('.audio-en')
            audio.currentTime = 0
            audio.play()
          })

          break

        case 'shift':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable', 'shift')
          //keyElement.innerHTML = createIconHTML('keyboard_capslock')
          keyElement.textContent = key.toLowerCase()

          keyElement.addEventListener('transitionend', e => {
            if (e.propertyName != 'transform') return
            keyElement.classList.remove('playing')
          })

          keyElement.addEventListener('click', (e) => {
            e.preventDefault()
            keyElement.classList.toggle('playing')
            this._toggleCapsLock()
            this.properties.shiftState = !this.properties.shiftState
            keyElement.classList.toggle('keyboard__key--active', this.properties.shiftState)
            let audio = document.querySelector('.audio-shift')
            audio.currentTime = 0
            audio.play()
            document.querySelector('.use-keyboard-input').focus()
          })

          break

        case 'en/ru':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable')
          //keyElement.innerHTML = createIconHTML('keyboard_capslock')
          keyElement.textContent = 'en'

          keyElement.addEventListener('transitionend', e => {
            if (e.propertyName != 'transform') return
            keyElement.classList.remove('playing')
          })

          keyElement.addEventListener('click', (e) => {
          e.preventDefault()
            keyElement.classList.toggle('playing')
            this.properties.layoutRu = !this.properties.layoutRu
            this._changeLayout()
            //keyElement.classList.toggle('keyboard__key--russian', this.properties.layoutRu)
            this.properties.layoutRu ? keyElement.textContent = 'ru' : keyElement.textContent = 'en'
            let audio = document.querySelector('.audio-en')
            audio.currentTime = 0
            audio.play()
            document.querySelector('.use-keyboard-input').focus()
          })

          break

        case 'voice':
         keyElement.classList.add('keyboard__key--wide', 'voice')
          //keyElement.innerHTML = createIconHTML('keyboard_capslock')
          keyElement.textContent = 'voice'

          keyElement.addEventListener('transitionend', e => {
            if (e.propertyName != 'transform') return
            keyElement.classList.remove('playing')
          })

          keyElement.addEventListener('click', (e) => {
          e.preventDefault()
            keyElement.classList.toggle('playing')
            let audio = document.querySelector('.audio-en')
            audio.currentTime = 0
            audio.play()
          })
          break

        case '←':
         keyElement.classList.add('keyboard__key--wide', 'arrow-left')
          //keyElement.innerHTML = createIconHTML('keyboard_capslock')
          keyElement.textContent = '←'

          textArea = document.querySelector('.use-keyboard-input')

          keyElement.addEventListener('transitionend', e => {
            if (e.propertyName != 'transform') return
            keyElement.classList.remove('playing')
          })

          keyElement.addEventListener('click', (e) => {
            e.preventDefault()
            keyElement.classList.toggle('playing')
            let prevValue =textArea.selectionStart
            textArea.selectionStart = textArea.selectionEnd = prevValue-1
            let audio = document.querySelector('.audio-en')
            audio.currentTime = 0
            audio.play()
            document.querySelector('.use-keyboard-input').focus()
          })
          break

        case '→':
         keyElement.classList.add('keyboard__key--wide', 'arrow-right')
          //keyElement.innerHTML = createIconHTML('keyboard_capslock')
          keyElement.textContent = '→'

          textArea = document.querySelector('.use-keyboard-input')



          keyElement.addEventListener('transitionend', e => {
            if (e.propertyName != 'transform') return
            keyElement.classList.remove('playing')
          })

          keyElement.addEventListener('mousedown', (e) => {
            e.preventDefault()
            keyElement.classList.toggle('playing')
            let prevValue =textArea.selectionStart
            textArea.selectionStart = textArea.selectionEnd = prevValue+1
            let audio = document.querySelector('.audio-en')
            audio.currentTime = 0
            audio.play()
            document.querySelector('.use-keyboard-input').focus()

          })
          break


          case 'voice':
         keyElement.classList.add('keyboard__key--wide', 'arrow-right')
          //keyElement.innerHTML = createIconHTML('keyboard_capslock')
          keyElement.textContent = 'voice'



          keyElement.addEventListener('transitionend', e => {
            if (e.propertyName != 'transform') return
            keyElement.classList.remove('playing')
          })

            /*


var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

          keyElement.addEventListener('click', (e) => {
          e.preventDefault()
          this.properties.recording = !this.properties.recording
          if (this.properties.recording) {
            recognition.stop()
            prevValue = speechRecognitionResultInstance[0];
          }
          else recognition.start()
            //let prevValue =textArea.selectionStart
            //textArea.selectionStart = textArea.selectionEnd = prevValue+1
            //document.querySelector('.use-keyboard-input').focus()

          })
          */
          break


          case 'sound':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable', 'keyboard__key--active')
          keyElement.textContent = 'sound'


          keyElement.addEventListener('transitionend', e => {
            if (e.propertyName != 'transform') return
            keyElement.classList.remove('playing')
          })

            keyElement.addEventListener('mousedown', (e) => {
            e.preventDefault()
            keyElement.classList.toggle('playing')
            keyElement.classList.toggle('keyboard__key--active')
            document.querySelectorAll('audio').forEach(audio => audio.muted ? audio.muted = false : audio.muted = true )
          })

          break

        default:
          keyElement.textContent = key.toLowerCase()
          if (Number.isInteger(+key)) keyElement.classList.toggle(`Digit${key}`)
          else keyElement.classList.toggle(`Key${key.toUpperCase()}`)


          keyElement.addEventListener('transitionend', e => {
            if (e.propertyName != 'transform') return
            keyElement.classList.remove('playing')
          })

          keyElement.addEventListener('mousedown', (e) => {
          e.preventDefault()
          keyElement.classList.toggle('playing')
          //window.setTimeout(keyElement.classList.toggle('playing'), 7000)
//            if (this.properties.layoutRu) {

            //}
            let audio
            if (this.properties.layoutRu) audio = document.querySelector('.audio-ru')
            else audio = document.querySelector('.audio-en')
            audio.currentTime = 0
            audio.play()

          if (this.properties.layoutRu) {
            if (this.elements.russianDict[key.toLowerCase()]) {
              key = this.elements.russianDict[key.toLowerCase()]
              }
            }

            if (!this.properties.layoutRu) {
              if (this.elements.revRussianDict[key.toLowerCase()]) {
                key = this.elements.revRussianDict[key.toLowerCase()]
                }
              }

        if (this.properties.capsLock) {
          if (this.elements.capsSymbDict[key.toLowerCase()] !== undefined) {
              key = this.elements.capsSymbDict[key.toLowerCase()]
            }
          else key = key.toUpperCase()
        }
        else {
          if (this.elements.revCapsSymbDict[key.toLowerCase()] !== undefined) {
              key = this.elements.revCapsSymbDict[key.toLowerCase()]
          }
          key = key.toLowerCase()
        }

            this.properties.value += key
            //this.properties.capsLock ? key.toUpperCase() : key.toLowerCase()
            this._triggerEvent('oninput')
            if (this.properties.shiftState) {
              this.properties.shiftState = false
              this._toggleCapsLock()
              document.querySelector('.shift').classList.toggle('keyboard__key--active', this.properties.shiftState)
              //this.properties.capsLock = !this.properties.capsLock
            }
          })

          break
      }

      fragment.appendChild(keyElement)

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'))
      }
    })

    return fragment
  },

  _triggerEvent (handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value)
    }
  },

  _toggleCapsLock () {
    this.properties.capsLock = !this.properties.capsLock

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0 && //not icon
        key.textContent != 'shift' &&
        key.textContent != 'en' &&
        key.textContent != 'ru' &&
        key.textContent != 'voice' &&
        key.textContent != 'sound' &&
        key.textContent != 'en/ru'
         ) {

        if (this.properties.capsLock) {
          /*
          if (this.properties.layoutRu) {
            if (this.elements.ruCapsSymbDict[key.textContent.toLowerCase()] !== undefined) {
              key.textContent = this.elements.ruCapsSymbDict[key.textContent.toLowerCase()]
            }
            else key.textContent = key.textContent.toUpperCase()
          }
//last edit
           if (this.elements.revRuCapsSymbDict[key.textContent.toLowerCase()] !== undefined) {
              key.textContent = this.elements.revRuCapsSymbDict[key.textContent.toLowerCase()]
            }
            */
           // if (this.properties.shiftState &&)
          if (this.elements.capsSymbDict[key.textContent.toLowerCase()] !== undefined) {
              key.textContent = this.elements.capsSymbDict[key.textContent.toLowerCase()]
            }
          else key.textContent = key.textContent.toUpperCase()
        }
        else {
          if (this.elements.revCapsSymbDict[key.textContent.toLowerCase()] !== undefined) {
              key.textContent = this.elements.revCapsSymbDict[key.textContent.toLowerCase()]
          }
          key.textContent = key.textContent.toLowerCase()
        }

      }
    }
  },


  _changeLayout () {
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0 && //not icon
        key.textContent != 'shift' &&
        key.textContent != 'en' &&
        key.textContent != 'ru' &&
        key.textContent != 'en/ru')
        {
          if (this.elements.russianDict[key.textContent.toLowerCase()] ||
            this.elements.revRussianDict[key.textContent.toLowerCase()]) {
              if (this.properties.layoutRu) {
              key.textContent = this.elements.russianDict[key.textContent.toLowerCase()]
              } else key.textContent = this.elements.revRussianDict[key.textContent.toLowerCase()]
    //console.log(key.textContent)
            }
      }
    }
  },

  open (initialValue, oninput, onclose) {
    this.properties.value = initialValue || ''
    this.eventHandlers.oninput = oninput
    this.eventHandlers.onclose = onclose
    this.elements.main.classList.remove('keyboard--hidden')
  },

  close () {
    this.properties.value = ''
    this.eventHandlers.oninput = oninput
    this.eventHandlers.onclose = onclose
    this.elements.main.classList.add('keyboard--hidden')
  }
}

window.addEventListener('DOMContentLoaded', function () {
  Keyboard.init()
})
