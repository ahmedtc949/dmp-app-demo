document.getElementById("requestOtpButton").addEventListener("click", requestOTP);

function requestOTP() {
  const phoneNumber = document.getElementById("phone").value;
  const dateOfBirth = document.getElementById("dob").value;
  console.log(document.getElementById("dob"));

  if(!phoneNumber || !dateOfBirth){

      !phoneNumber && alert('phone number is required');
      !dateOfBirth && alert('Date of birth is required');
      return;
  }
  const requestOtpApiUrl=`https://app.leadconduit.com/flows/66a2d0c8a472d806310ed57e/sources/5cc77b940522c3d92646ff7b/submit`;
  const body = {
    dob: dateOfBirth,
    phone_lcl: phoneNumber
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
    if (response && response.status===201) {
        return await response.json();
    }
    throw new Error("Network response was not ok " + response.statusText);
    })
    .then((data) => {
      console.log(data);
      // alert("API call was successful!");
    //   const url = `verify-otp.html?extUserId=${encodeURIComponent(data.lead.id)}`;
    //   window.location.href = url;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      alert("API call failed.");
    });
}