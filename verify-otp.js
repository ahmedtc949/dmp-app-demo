document.getElementById("verifyButton").addEventListener("click", verifyOtp);

// Function to extract query parameters
function getQueryParams() {
  const params = {};
  const queryString = window.location.search.substring(1);
  const regex = /([^&=]+)=([^&]*)/g;
  let m;

  while ((m = regex.exec(queryString))) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  return params;
}

function verifyOtp() {
  const queryParams = getQueryParams();
  // const extUserId = queryParams.extUserId;
  const userId = queryParams.userId;
  console.log(userId);
  const otpCode = document.getElementById("otpInput").value;

  const container = document.getElementById("container");
  const successMessage = document.getElementById("successMsg");
  const errorMessage = document.getElementById("errorMsg");

  if (!otpCode) {
    alert("Please enter the OTP code.");
    return;
  }

  const requestOtpApiUrl = `https://app.leadconduit.com/flows/66a3fdf65b36cc1fd3d8f170/sources/5cc77b940522c3d92646ff7b/submit`;

  const body = {
    spinwheel_user_id_lcl: userId,
    otp_code_lcl: otpCode.toString(),
  };
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  // headers.append("Authorization", "Bearer " + ACCESS_TOKEN);
  fetch(requestOtpApiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })
    .then(async(response) => {
      if (response && response.status === 201) {
        return await response.json();
      }
      errorMessage.style.display='block';
      throw new Error("Network response was not ok " + response.statusText);
    })
    .then((data) => {
      console.log(data);
      successMessage.style.display='block'
      container.style.display="none";
    })
    .catch((error) => {
      console.error("OTP verification failed:", error);
      errorMessage.style.display='block';
    });
}
