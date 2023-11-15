
function handleCredentialResponse(response) {
    // Handle the ID token in response
    console.log("Encoded JWT ID token: " + response.credential);
  }
  
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "1050074680030-80b20cr4ud2h6kt59pdkbtc63bvhus03.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
  
    google.accounts.id.renderButton(
      document.getElementById("g_id_signin"),
      { theme: "outline", size: "large", text: "sign_in_with" } // Customization attributes
    );
  
    google.accounts.id.prompt(); // Display the One Tap prompt
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    var userPoints = 500; // Example user points
    var items = [
        { name: 'Elegant Watch', cost: 100, imageUrl: 'https://via.placeholder.com/150', redeemed: false },
        { name: 'Stylish Sunglasses', cost: 200, imageUrl: 'https://via.placeholder.com/150', redeemed: false },
        { name: 'Modern Backpack', cost: 300, imageUrl: 'https://via.placeholder.com/150', redeemed: false },
        // Add more items as needed
    ];
    var storeContainer = document.getElementById('store');
    var itemElements = [];

    function initializeStore() {
        items.forEach(function(item, index) {
            var itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = '<div class="item-image" style="background-image: url(' + item.imageUrl + ');"></div>' +
                                '<div class="item-name">' + item.name + '</div>' +
                                '<div class="item-cost">Cost: ' + item.cost + '</div>';
            storeContainer.appendChild(itemDiv);
            itemElements.push(itemDiv);
        });
        updateItems();
    }

    function updateItems() {
        itemElements.forEach(function(div, index) {
            if (userPoints >= items[index].cost && !items[index].redeemed) {
                div.classList.remove('disabled');
                div.onclick = function() { redeemItem(items[index], index); };
            } else {
                div.classList.add('disabled');
                div.onclick = null;
            }
        });
        updatePointsDisplay();
    }

    function redeemItem(item, index) {
        if (userPoints >= item.cost && !item.redeemed && confirm('Redeem ' + item.name + '?')) {
            userPoints -= item.cost;
            item.redeemed = true; // Mark the item as redeemed
            sendRedemptionEmail(item.name); // Simulate email sending
            updateItems();
        }
    }

    function updatePointsDisplay() {
        document.getElementById('userPoints').innerText = userPoints;
    }

    function sendRedemptionEmail(itemName) {
        alert('An email has been sent to confirm the redemption of ' + itemName);
    }

    initializeStore();
});
