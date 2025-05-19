const amountDropdown = document.getElementById('donation-amount');
const customAmountGroup = document.getElementById('custom-amount-group');

amountDropdown.addEventListener('change', function () {
  if (this.value === 'custom') {
    customAmountGroup.classList.remove('d-none');
  } else {
    customAmountGroup.classList.add('d-none');
  }
});

paypal.Buttons({
  createOrder: function(data, actions) {
    let amount = amountDropdown.value;
    if (amount === 'custom') {
      amount = document.getElementById('custom-amount').value || 1;
    }
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: amount
        }
      }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      alert('Thank you, ' + details.payer.name.given_name + '!');
    });
  }
}).render('#paypal-button-container');


const textSets = [
  {
    line1: "Small gift. Big impact. Endless love.",
    line2: "Because every child deserves a full plate, a safe space, and a fair chance to learn and grow."
  },
  {
    line1: "Your Contribution Goes Beyond Charity",
    line2: "It opens doors to opportunity by helping us feed children, support their education, and build brighter futures so every child has the chance to thrive."
  }
];

const line1El = document.getElementById("line1");
const line2El = document.getElementById("line2");
const animatedText = document.getElementById("animated-text");

let currentIndex = 0;

function showText(index) {
  animatedText.style.opacity = 0;

  setTimeout(() => {
    line1El.textContent = textSets[index].line1;
    line2El.textContent = textSets[index].line2;
    animatedText.style.opacity = 1;
  }, 1000);
}

function cycleTexts() {
  showText(currentIndex);
  currentIndex = (currentIndex + 1) % textSets.length;
}

// Initial show
cycleTexts();

// Cycle every 8 seconds
setInterval(cycleTexts, 8000);

