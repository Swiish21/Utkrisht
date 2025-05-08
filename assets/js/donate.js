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
