document
  .getElementById("requestOtpButton")
  .addEventListener("click", requestOTP);

function requestOTP() {
  const phoneNumber = document.getElementById("phone").value;
  const dateOfBirth = document.getElementById("dob").value;

//   const extUserId = document.getElementById("extUserId").value;
const formElement = document.getElementById("form");
  const successMessage = document.getElementById("successMsg");
  const errorMessage = document.getElementById("errorMsg");

  if (!phoneNumber || !dateOfBirth) {
    !phoneNumber && alert("phone number is required");
    !dateOfBirth && alert("Date of birth is required")
    return;
  }
  //const requestOtpApiUrl = `https://sandbox-api.spinwheel.io/v1/users/connect/sms`; //?extUserId=${extUserId}
  const requestOtpApiUrl = `https://app.leadconduit.com/flows/66a2d0c8a472d806310ed57e/sources/5cc77b940522c3d92646ff7b/submit`;
  const body = {
    // phoneNumber,
    // dateOfBirth,
    // extUserId,
    dob: dateOfBirth,
    phone_lcl: phoneNumber,
  };
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  //   headers.append("Authorization", "Bearer " + ACCESS_TOKEN);

  fetch(requestOtpApiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      if (response && response.status === 201) {
        return await response.json();
      }
      errorMessage.style.display = "block";
      throw new Error("Network response was not ok " + response.statusText);
    })
    .then((data) => {
      console.log(data);
      successMessage.style.display = "block";
      formElement.style.display='none';
      // alert("API call was successful!");
      //   const url = `verify-otp.html?extUserId=${encodeURIComponent(data.lead.id)}`;
      //   window.location.href = url;
    })
    .catch((error) => {
      errorMessage.style.display = "block";
      throw new Error("There was a problem with the fetch operation: " + error);
    });
}
