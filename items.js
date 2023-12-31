document.addEventListener('DOMContentLoaded', function() {
    var userPoints = 500; // Example user points
    var items = [
        { name: 'Fluqx speaker', cost: 100, imageUrl: 'https://drive.google.com/uc?id=1VX6OX-06sdb3YDRzPSRplNlu1BQcJJXy', redeemed: false },
        { name: 'Stylish Sunglasses', cost: 200, imageUrl: 'https://via.placeholder.com/150', redeemed: false },
        { name: 'Modern Backpack', cost: 300, imageUrl: 'https://via.placeholder.com/150', redeemed: false },
        { name: 'Modern Backpack2', cost: 400, imageUrl: 'https://via.placeholder.com/150', redeemed: false },
        { name: 'Modern Backpack3', cost: 500, imageUrl: 'https://via.placeholder.com/150', redeemed: false },
        { name: 'Modern Backpack4', cost: 600, imageUrl: 'https://via.placeholder.com/150', redeemed: false },
        { name: 'Modern Backpack5', cost: 700, imageUrl: 'https://via.placeholder.com/150', redeemed: false },
        { name: 'Modern Backpack6', cost: 800, imageUrl: 'https://via.placeholder.com/150', redeemed: false },
        { name: 'Modern Backpack7', cost: 900, imageUrl: 'https://via.placeholder.com/150', redeemed: false },
        
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
                                '<div class="item-cost">Coins: ' + item.cost + '</div>';
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