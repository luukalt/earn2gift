
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
  