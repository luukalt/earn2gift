// Function to handle the response from Google sign-in
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    // Extract user details from the ID token (implement extractUserDetails)
    const userDetails = extractUserDetails(response.credential);

    // Update UI with user details
    document.getElementById('user_name').innerText = userDetails.firstName + ' ' + userDetails.lastName;
    document.getElementById('user_email').innerText = userDetails.email;
    document.getElementById('user_info').style.display = 'block';

    // Hide the Google sign-in button
    document.getElementById('g_id_signin').style.display = 'none';

    // Log or use the user details
    console.log('First Name:', userDetails.firstName);
    console.log('Last Name:', userDetails.lastName);
    console.log('Email:', userDetails.email);
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


// Function to reinitialize the Google Sign-In button
function reinitializeGoogleSignIn() {
    // Clear existing content
    const signInDiv = document.getElementById('g_id_signin');
    signInDiv.style.display = 'block';

    // Rerender the Google Sign-In Button
    google.accounts.id.renderButton(
        signInDiv,
        { theme: "outline", size: "large", text: "sign_in_with" }
    );

    // Show the Google sign-in button
    signInDiv.style.display = 'block';
}

// Function to sign out the user
function signOutUser() {
    // Code to handle user sign-out (e.g., revoke token, clear session)

    // Hide user info and reinitialize Google Sign-In
    document.getElementById('user_info').style.display = 'none';
    reinitializeGoogleSignIn();
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "1050074680030-80b20cr4ud2h6kt59pdkbtc63bvhus03.apps.googleusercontent.com",
        callback: handleCredentialResponse,
        auto_select: false
    });

    google.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        { theme: "outline", size: "large", text: "sign_in_with" }
    );

    // Optionally call google.accounts.id.prompt(); if needed
};
