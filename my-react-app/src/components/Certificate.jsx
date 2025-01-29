import React, { useState, useEffect } from "react";
import pic from "./assets/chatbot.png";
import "./Certificate.css";

function Certificate() {
  const [input, setInput] = useState(""); // Stores user input
  const [data, setData] = useState([]); // Stores fetched data
  const [certificate, setCertificate] = useState(null); // Stores matched certificate

  // Fetch data from the API
  useEffect(() => {
    fetch(
      "https://opensheet.elk.sh/1dN6rtexDUyVAU6Z5aJJP8K9cJrO_t8Nx_dkrY1D4hvQ/Consolidated%20Sheet"
    )
      .then((response) => response.json()) // Convert response to JSON
      .then((jsonData) => setData(jsonData)) // Store data in state
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to verify Certificate ID
  const verifyCertificate = () => {
    const matchedCert = data.find((cert) => cert["Certificate ID"] === input);
    setCertificate(matchedCert || "Not Found");
  };

  // Handle Enter key press
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      verifyCertificate();
    }
  };

  return (
    <div className="container">
      <div className="img_mainText">
        <img src={pic} alt="img" />
        <h2>Verify Your Certificates Here!</h2>
      </div>

      <div className="input_field">
        <input
          value={input}
          onKeyDown={handleEnter}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Enter Certificate Number"
        />
        <button onClick={verifyCertificate}>Verify</button>
      </div>

      {/* Display certificate details */}
      {certificate && (
        <div className="result">
          {certificate === "Not Found" ? (
            <h3 style={{ color: "red" }}>Certificate Not Found</h3>
          ) : (
            <div>
              <h3>Certificate Details:</h3>
              <p><strong>Name:</strong> {certificate.Name}</p>
              <p><strong>Institution:</strong> {certificate.Institution}</p>
              <p><strong>Event Name:</strong> {certificate["Event Name"]}</p>
              <p><strong>Track:</strong> {certificate.Track}</p>
              <p><strong>Certificate Type:</strong> {certificate["Certificate Type"]}</p>
              <p><strong>Organized By:</strong> {certificate["Organized By"]}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Certificate;
