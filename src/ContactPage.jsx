import React, { useState } from "react";
import image from './assets/train.jpg'; 

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    complain: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send this data to your backend here
    console.log("Form submitted:", form);
    alert("Your complaint has been submitted!");
    setForm({ name: "", email: "", mobile: "", complain: "" });
  };

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${image})` }}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Contact Us</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            name="name"
            value={form.name}
            placeholder="Your Name"
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="email"
            name="email"
            value={form.email}
            placeholder="Your Email"
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="tel"
            name="mobile"
            value={form.mobile}
            placeholder="Your Mobile"
            onChange={handleChange}
            required
          />
          <textarea
            style={{ ...styles.input, height: "120px", resize: "none" }}
            name="complain"
            value={form.complain}
            placeholder="Your Complaint"
            onChange={handleChange}
            required
          />
          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    textAlign: "center",
    fontFamily: "'Roboto', sans-serif",
    opacity: 0.9,
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px 16px",
    fontSize: "16px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },
  submitButton: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#2196f3",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default ContactPage;
