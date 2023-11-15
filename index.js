function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    // Extract user details from the ID token
    const userDetails = extractUserDetails(response.credential);

    // Log or use the user details
    console.log('First Name:', userDetails.firstName);
    console.log('Last Name:', userDetails.lastName);
    console.log('Email:', userDetails.email);

    // Optionally update these details in your HTML
    // Ensure your HTML has elements with these IDs
    // document.getElementById('firstName').innerText = userDetails.firstName;
    // document.getElementById('lastName').innerText = userDetails.lastName;
    // document.getElementById('email').innerText = userDetails.email;
}

function decodeJwtToken(token) {
    const base64Url = token.split('.')[1]; // Get the payload part
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Function to extract first name, last name, and email
function extractUserDetails(token) {
    const userData = decodeJwtToken(token);
    const fullName = userData.name || ''; // Full name
    const email = userData.email || '';

    // Splitting the full name into first and last names
    const names = fullName.split(' ');
    const firstName = names[0] || '';
    const lastName = names.length > 1 ? names[names.length - 1] : '';

    return { firstName, lastName, email };
}



// function handleCredentialResponse(response) {
//     // Handle the ID token in response
//     console.log("Encoded JWT ID token: " + response.credential);
//     }

// function decodeJwtToken(token) {
//     const base64Url = token.split('.')[1]; // Get the payload part
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
    
//     return JSON.parse(jsonPayload);
//     }
    
//     // Function to extract first name, last name, and email
//     function extractUserDetails(token) {
//     const userData = decodeJwtToken(token);
//     const fullName = userData.name || ''; // Full name
//     const email = userData.email || '';
    
//     // Splitting the full name into first and last names
//     // This is a basic split and might not work correctly for all name formats
//     const names = fullName.split(' ');
//     const firstName = names[0] || '';
//     const lastName = names.length > 1 ? names[names.length - 1] : '';
    
//     return { firstName, lastName, email };
//     }
  
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
