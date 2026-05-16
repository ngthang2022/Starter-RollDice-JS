class RollingDice extends HTMLElement {
  constructor() {
    super();
    this.finalValue = 1;
    this.duration = 750; 
    this.intervalSpeed = 80; 
  }

  // Automatically runs when the element is added to the DOM
  connectedCallback() {
    // Get the target value from the HTML attribute, default to 1
    this.finalValue = parseInt(this.getAttribute('value')) || 1;
    this.renderRoll();
  }

  renderRoll() {
    setTimeout(() => {
        console.log("This prints inside the timeout after 1.5 seconds.");
    }, 1500);
    const startTime = Date.now();

    const timer = setInterval(() => {
      const randomDisplay = Math.floor(Math.random() * 6) + 1;
      this.textContent = randomDisplay;

      if (Date.now() - startTime >= this.duration) {
        clearInterval(timer);
        //FINAL
        this.textContent = this.finalValue;
        this.classList.add('rolled'); 
      }
    }, this.intervalSpeed);
  }
}

customElements.define('rolling-dice', RollingDice);

function RollDice(){
    const N = document.getElementById("numofDice").value;
    const Result = document.getElementById("DiceResult");
    let value = [];

    for (let i = 0;i < N;i++){
        let num = Math.floor(Math.random() * 6) + 1;
        value.push(num);
    }

    Result.textContent = `dice: ${value.join(', ')}`;
    Display(value);
}


function Display(value, containerID){
    const container = document.getElementById("DiceDisplay");
    container.innerHTML = '';

    for (const num of value){
        const dieEl = document.createElement('rolling-dice');
        dieEl.setAttribute('value', num); 
        
        container.appendChild(dieEl);
    }
}