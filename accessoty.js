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
    document.body.style.overflow = 'hidden';
}

function closePopupCart() {
    let popupCart = document.getElementById('popupCart');
    popupCart.style.display = 'none';
    document.body.style.overflow = '';
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


// Function to show a popup
function showPopup(message) {
    // Create a popup element
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;

        // Apply styles to the popup
        popup.style.position = 'fixed';
        // popup.style.top = '50%';
        // popup.style.left = '50%';
        popup.style.transform = 'translate(0%, 0%)';
        popup.style.background = 'rgba(0, 0, 0, 0.8)';
        popup.style.color = '#fff';
        popup.style.padding = '10px';
        popup.style.borderRadius = '5px';
        popup.style.zIndex = '9999';

    // Append the popup to the body
    document.body.appendChild(popup);

    // Remove the popup after a delay
    setTimeout(() => {
        popup.remove();
    }, 1500); // 1.5 seconds
}



// Function to add an accessory to the cart
function addToCart(customerId, accessoryId) {
    if (tempCustomerId !== undefined) {
        fetch('http://localhost:8000/add_to_cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customer_id: tempCustomerId,
                accessory_id: accessoryId,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response:', data);
            // Show a success popup
            alert('Added to cart successfully');
            document.getElementById('add-to-cart').disabled = true;
        })
        .catch(error => {
            console.error('Error:', error);
            // Show an error popup
            alert('Error adding to cart');
        })

    } else {
        // If tempCustomerId is "10000", do something else
        alert('Guest cannot add to cart.');
    }

}

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





















function openLogout() {
    let popupLogout = document.getElementById('logout');
    if(popupLogout.style.display == 'none'){
        popupLogout.style.display = 'block';
    }
    else{
        popupLogout.style.display = 'none';
    }
}


// Add event listener to the member icon
document.getElementById('member-icon').addEventListener('click', function() {
    if (tempCustomerId !== undefined) {
        // Toggle the display of the logout button
        var logoutButton = document.getElementById('logout');
        logoutButton.style.display = logoutButton.style.display === 'none' ? 'block' : 'none';
        document.cookie = `customerID=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    } else {
        // Redirect the user to the login page
        window.location.href = "member.html"; // Replace "login.html" with the actual login page URL
    }
});





document.getElementById('add-to-cart').addEventListener('click', function() {
    if(tempCustomerId != undefined){
        const accessoryId = urlParams.get('accessory_id');
        addToCart(tempCustomerId, accessoryId);
    }
    else{
        window.location.href = "member.html";
    }
});















