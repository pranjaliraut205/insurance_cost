function predictCost() {

  const data = {
    age: parseInt(document.getElementById("age").value),
    gender: document.getElementById("gender").value,
    bmi: parseFloat(document.getElementById("bmi").value),
    children: parseInt(document.getElementById("children").value),
    smoker: document.getElementById("smoker").value,
    region: document.getElementById("region").value
  };

  // Use relative path instead of localhost
  fetch("/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    document.getElementById("result").innerText =
      "Predicted Insurance Cost: ₹ " + result.predicted_cost;
  })
  .catch(error => {
    console.error(error);
    alert("Backend not responding. Please try again later!");
  });
}