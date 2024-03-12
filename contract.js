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

// Iterate through the array to find the desired cookie
let tempCustomerId;
cookieArray.forEach(cookie => {
    let [name, value] = cookie.split('=');
    // Trim any leading or trailing whitespace from the name
    tempCustomerId = value
});

// Function to populate accessory details in the cart
function populateAccessoryDetails(accessories) {
    const accessoryDiv = document.getElementById('accessory');

    // Clear existing content
    accessoryDiv.innerHTML = '';

    // Create a container with a fixed height and scrolling
    const accessoryContainer = document.createElement('div');
    accessoryContainer.classList.add('accessory-container');

    // Loop through the first six accessories and create HTML elements for each accessory
    accessories.slice(0, 6).forEach((accessory, index) => {
        const accDiv = document.createElement('div');
        accDiv.classList.add('acc');
        accDiv.style.display = "grid";
        accDiv.style.gridTemplateColumns = "repeat(3, 1fr)"; // Set grid to 3 columns
        // accDiv.style.gap = "60px";

        const namePara = document.createElement('p');
        namePara.classList.add('name');
        namePara.textContent = `${index + 1}. ${accessory.name}`;

        const idPara = document.createElement('p');
        idPara.classList.add('id');
        idPara.textContent = accessory.id;

        const pricePara = document.createElement('p');
        pricePara.classList.add('price');
        pricePara.textContent = accessory.price;

        accDiv.appendChild(namePara);
        accDiv.appendChild(idPara);
        accDiv.appendChild(pricePara);

        accessoryContainer.appendChild(accDiv);
    });


    // Append the container to the accessoryDiv
    accessoryDiv.appendChild(accessoryContainer);

    const total_price = document.getElementById('total-price');
    total_price.textContent = ""
}

// Function get cart
function getCart() {
    fetch("http://localhost:8000/your_shopping_cart", {
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
        console.log('Shopping Cart:', data);
        // Handle shopping cart data as needed
        populateAccessoryDetails(data.data);
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors
        showCart('Error');
    });
}

function getName() {
    fetch("http://127.0.0.1:8000/search_account_name_by_id", {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            customer_id : tempCustomerId
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Shopping Cart:', tempCustomerId);
        // Show name
        // showCart(data.data);
        const name = document.getElementById('customer-name');
        
        name.textContent = data
        name.style.fontFamily = 'Prompt'
        name.style.fontSize = "20px"
        name.style.marginLeft = "50px"
        
        if(tempCustomerId !== undefined){
            const head = document.getElementById('head')
            const order_icon = document.createElement('a');
            const icon = document.createElement('img')
            order_icon.href = "contract.html"
            order_icon.style.marginLeft = "20px"
            icon.src = "../image/order.png"
            icon.style.height = "30px"
            order_icon.appendChild(icon)
            head.appendChild(order_icon)
        }
        else{
            null
        }
        
    })
    .catch(error => {
        console.error('Error:', error);
        console.log('name :' , data)
        // Handle errors
    });
}

document.addEventListener('DOMContentLoaded', function() {
    getName();
});

document.getElementById('cart').addEventListener('click', function() {
    getCart();
})
