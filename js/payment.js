function openPopupContract() {
    let popupContract = document.getElementById('popupContract');
    popupContract.style.display = 'block';
}

function closePopupContract() {
    let popupContract = document.getElementById('popupContract');
    popupContract.style.display = 'none';
}

function openPopupPrivacy() {
    let popupPrivacy = document.getElementById('popupPrivacy');
    popupPrivacy.style.display = 'block';
}

function closePopupPrivacy() {
    let popupPrivacy = document.getElementById('popupPrivacy');
    popupPrivacy.style.display = 'none';
}

function openPopupCart() {
    let popupCart = document.getElementById('popupCart');
    popupCart.style.display = 'block';
}

function closePopupCart() {
    let popupCart = document.getElementById('popupCart');
    popupCart.style.display = 'none';
}

function openLogout() {
    let popupLogout = document.getElementById('logout');
    if(popupLogout.style.display == 'none'){
        popupLogout.style.display = 'block';
    }
    else{
        popupLogout.style.display = 'none';
    }
}

// Get the cookie string
let cookieString = document.cookie;

// Split the cookie string by semicolons to get an array of key-value pairs
let cookieArray = cookieString.split(';');
let tempCustomerId;
let tempOrderId;
// Iterate through the array to find the desired cookies
cookieArray.forEach(cookie => {
    let [name, value] = cookie.split('=');
    // Trim any leading or trailing whitespace from the name
    name = name.trim();
    if (name === 'customerID') {
        tempCustomerId = value.trim();
    } else if (name === 'orderId') {
        tempOrderId = value.trim();
    }
});
console.log("TempCus: ",tempCustomerId)
console.log("TempOrder: ",tempOrderId)


function showOrder(orders) {
    var order_array = orders.data;
    const popup = document.getElementById('show_order');

    // if (Array.isArray(order_array) && order_array.length > 0) { 
    //     order_array.forEach(order => {
    //         if(order.status === "undischarged"){
                
    //             // Create a container for each order
    //         const orderContainer = document.createElement('div');
    //         orderContainer.className = 'order-container';
    //         orderContainer.style.background = '#fff'; // Background color of the card
    //         orderContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Shadow effect
    //         orderContainer.style.borderRadius = '10px'; // Rounded corners
    //         orderContainer.style.padding = '20px'; // Padding inside the card
    //         orderContainer.style.paddingRight = '30px';
    //         orderContainer.style.marginBottom = "2rem";
    //         orderContainer.style.zIndex = '9999';

    //         // Display order details
    //         const orderId = document.createElement('p');
    //         orderId.textContent = `Order ID: ${order['order_id']}`;
    //         orderId.style.fontWeight = "Bold";
    //         orderId.style.fontSize = "20px";
    //         orderContainer.appendChild(orderId);

    //         const orderStatus = document.createElement('p');
    //         orderStatus.textContent = `Status: ${order.status}`;
    //         orderStatus.style.fontSize = "18px";
    //         orderContainer.appendChild(orderStatus);

    //         const totalCost = document.createElement('p');
    //         totalCost.textContent = `Total Cost: ${order.total}`;
    //         totalCost.style.fontSize = "18px";
    //         orderContainer.appendChild(totalCost);

    //         // Create a list to display accessories for each order
    //         const accessoryList = document.createElement('ul');
    //         accessoryList.className = 'accessory-list';

    //         // Populate the list with accessory data for the current order
    //         order.data.forEach(accessory => {
    //             const listItem = document.createElement('li');
    //             const ass_id = document.createElement('li');
    //             ass_id.textContent = `Accessory ID : ${accessory.id}`;
    //             const ass_name = document.createElement('li');
    //             ass_name.textContent = `Name : ${accessory.name}`;
    //             ass_name.style.listStyleType = "none";
    //             const ass_price = document.createElement('li');
    //             ass_price.textContent = `Price : ${accessory.price}`;
    //             ass_price.style.listStyleType = "none";
    //             const ass_lenter = document.createElement('li');
    //             ass_lenter.textContent = `Lenter : ${accessory.lenter}`;
    //             ass_lenter.style.listStyleType = "none";
    //             const ass_date = document.createElement('li');
    //             ass_date.textContent = `Date : ${accessory.date_start} to ${accessory.date_end}`;
    //             ass_date.style.listStyleType = "none";
                
    //             listItem.style.marginLeft = "50px";
    //             listItem.appendChild(ass_id);
    //             listItem.appendChild(ass_name);
    //             listItem.appendChild(ass_price);
    //             listItem.appendChild(ass_lenter);
    //             listItem.appendChild(ass_date);
    //             accessoryList.appendChild(listItem);
    //         });

    //         // Create pay button
    //         const payButton = document.createElement('button');
    //         payButton.className = "pay_order";
    //         payButton.textContent = "ชำระเงิน";
            
            
    //         // Create a cancel button
    //         const cancelButton = document.createElement('button');
    //         cancelButton.className = "cancel_order";
    //         cancelButton.textContent = "ยกเลิก";


    //         // Append the accessory list to the order container
    //         orderContainer.appendChild(accessoryList);
    //         const button = document.createElement('div');
    //         button.style.margin = "10px";
    //         button.appendChild(payButton)
    //         button.appendChild(cancelButton)
    //         orderContainer.appendChild(button);

    //         // Add event listener to the pay button
    //         payButton.addEventListener('click', function() {
    //             payButton.disabled = true;
    //             showPopup();
    //             payOrder(order['order_id']); // Pass the pay button to the payOrder function
    //         });

    //         // Add event listener to the cancel button
    //         cancelButton.addEventListener('click', function() {
    //             cancelButton.disabled = true;
    //             cancelOrder(order['order_id']); // Pass the cancel button to the cancelOrder function
    //             // Remove the order container from the DOM
    //             orderContainer.remove();
    //             location.reload();
    //         });
            
    //         // Append the order container to the popup
    //         popup.appendChild(orderContainer);
    //         }
    //         else{
    //             console.log(order.status)
    //         }
    //     });
    // } else {
    //     console.error('Orders array is either not an array or empty:', order_array);
    // }

}

function showConfirmedOrder() {
    fetch("http://127.0.0.1:8000/check_status_confirmed_order", {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            customer_id: tempCustomerId
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Order:', data);
        // Handle shopping cart data as needed
        showOrder(data);
    })
    .catch(error => {
        console.error('Order Error:', error);
        // Handle errors
        showOrder('Error');
    }); 
}
function showConfirmedOrderById() {
    
}


function getAccInfo() {
    fetch("http://127.0.0.1:8000/search_account_info_by_id", {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            customer_id: tempCustomerId
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.address)
        console.log(data.email)
        const addressInput = document.querySelector('#input-address'); // Select the input element with class 'name'
        addressInput.value = ` ${data.address}`; // Set the value of the input field to the name received from the fetch request
        addressInput.readOnly = true;
        const emailInput = document.querySelector('#input-email');
        emailInput.value = ` ${data.email}`;
        emailInput.readOnly = true;
    })
}
document.addEventListener('DOMContentLoaded', function() {
    getAccInfo();
    showConfirmedOrder();
})


const paymentTypeSelect = document.getElementById('payment_type');
const cardDetailsDiv = document.getElementById('card_details');

paymentTypeSelect.addEventListener('change', function() {
    if (paymentTypeSelect.value === 'Prompt-Pay' || paymentTypeSelect.value === 'Cash') {
        cardDetailsDiv.style.display = 'none';
    } else {
        cardDetailsDiv.style.display = 'block';
    }
});

document.getElementById('pay_now_button').addEventListener('click', function() {

});
