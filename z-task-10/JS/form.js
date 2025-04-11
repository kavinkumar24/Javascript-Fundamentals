const paymentMethod = document.querySelector("#payment-method");
const formSection = document.querySelector("#checkout-form");
const paymentContainer = document.querySelector(".payment-details");
const formWholeContainer = document.getElementsByClassName("form-container")[0];
const qrContainer = document.querySelector("#upi-qr-container");
const formSubmitButton = document.querySelector("#form-submit-button");
const totalAmount = document.getElementsByClassName("total-amount")[0];

const qr = new QRious({
  size: 200,
});

function totalAmountCal() {
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });
  let tax = total * 0.1;
  total += tax;
  total = total.toFixed(2);
  totalAmount.textContent = `Total Amount: ₹${total}`;
}

formSubmitButton.addEventListener("click", (event) => {
  if (formSection.checkValidity()) {
    event.preventDefault();
    formWholeContainer.classList.add("form-submitted");
    formWholeContainer.innerHTML = `
    <div>
        <h2>Form Submitted Successfully!🎉 </h2>
        <p>Thank you for Ordering.</p>
        <p>We'll notify once order has been shipped</p>
    </div>
  `;
  } else {
    form.reportValidity();
  }
});

paymentMethod.addEventListener("change", (event) => {
  const selectedPaymentMethod = event.target.value;
  if (selectedPaymentMethod == "credit-card") {
    paymentContainer.innerHTML = `
        <div>
        <label for = "card-number">Card Number</label>
        <input type="text" id="card-number" placeholder="Enter your card number" required>
        </div>
        
        <div>
        <label for = "expiry-date">Expiry Date</label>
        <input type="text" id="expiry-date" placeholder="MM/YY" required>
        </div>

        <div>
        <label for = "cvv">CVV</label>
        <input type="text" id="cvv" placeholder="Enter your CVV" required>
        </div>

        <div>
        <label for = "card-holder-name">Card Holder Name</label>
        <input type="text" id="card-holder-name" placeholder="Enter your name" required>
        </div>

        <div>
        <label for = "billing-address">Billing Address</label>
        <input type="text" id="billing-address" placeholder="Enter your billing address" required>
        </div>
        
    `;
  } else if (selectedPaymentMethod == "upi") {
    paymentContainer.innerHTML = ``;
    qrContainer.innerHTML = ``;
    const upiString = "upi://pay?pa=demo@upi&pn=demo%20Name&am=1&cu=INR";
    qr.value = upiString;
    qrContainer.appendChild(qr.canvas);
    const label = document.createElement("p");
    label.textContent = "Scan this QR to pay via UPI";
    qrContainer.appendChild(label);
  } else if (selectedPaymentMethod == "net-banking") {
    qrContainer.innerHTML = ``;
    paymentContainer.innerHTML = `
        <div>
        <label for = "bank-name">Bank Name</label>
        <input type="text" id="bank-name" placeholder="Enter your bank name" required>
        </div>

        <div>
        <label for = "account-number">Account Number</label>
        <input type="text" id="account-number" placeholder="Enter your account number" required>
        </div>

        <div>
        <label for = "ifsc-code">IFSC Code</label>
        <input type="text" id="ifsc-code" placeholder="Enter your IFSC code" required>
        </div>

        <div>
        <label for = "account-holder-name">Account Holder Name</label>
        <input type="text" id="account-holder-name" placeholder="Enter your name" required>
        </div>

    `;
  } else {
    paymentContainer.innerHTML = `
    `;
    qrContainer.innerHTML = ``;
  }
});

totalAmountCal();
