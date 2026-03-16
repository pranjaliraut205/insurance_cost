// Determine the base URL dynamically
const BASE_URL = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
    ? "http://127.0.0.1:8000"
    : "";  // empty means same domain on deployed server

function validateForm() {
    let valid = true;

    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const bmi = document.getElementById("bmi").value;
    const children = document.getElementById("children").value;
    const smoker = document.getElementById("smoker").value;
    const region = document.getElementById("region").value;

    // Clear previous errors
    document.querySelectorAll(".error").forEach(e => e.innerText = "");

    if (age === "" || age < 1 || age > 100) {
        document.getElementById("ageError").innerText = "Enter valid age (1–100)";
        valid = false;
    }

    if (gender === "") {
        document.getElementById("genderError").innerText = "Select gender";
        valid = false;
    }

    if (bmi === "" || bmi < 10 || bmi > 60) {
        document.getElementById("bmiError").innerText = "BMI must be between 10–60";
        valid = false;
    }

    if (children === "" || children < 0 || children > 10) {
        document.getElementById("childrenError").innerText = "Children 0–10 only";
        valid = false;
    }

    if (smoker === "") {
        document.getElementById("smokerError").innerText = "Select smoker option";
        valid = false;
    }

    if (region === "") {
        document.getElementById("regionError").innerText = "Select region";
        valid = false;
    }

    if (!valid) return;

    const data = {
        age: parseInt(age),
        gender: gender,
        bmi: parseFloat(bmi),
        children: parseInt(children),
        smoker: smoker,
        region: region
    };

    fetch(`${BASE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        document.querySelector(".price").innerText =
            "₹ " + result.predicted_cost;
        document.querySelector(".result-card p").innerText =
            "Prediction successful ✅";
    })
    .catch(err => {
        console.error(err);
        alert("Backend not running or unreachable!");
    });
}