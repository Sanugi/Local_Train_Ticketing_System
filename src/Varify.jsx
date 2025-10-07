import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import image from "./assets/train.jpg"; // Replace with your image
import axiosInstance from "./service/axiosInstance";

// OTP Input Component
function OTP({ separator, length, value = "", onChange }) {
  const inputRefs = useRef(new Array(length).fill(null));

  const focusInput = (i) => inputRefs.current[i]?.focus();
  const selectInput = (i) => inputRefs.current[i]?.select();

  const handleKeyDown = (e, i) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        if (i > 0) {
          focusInput(i - 1);
          selectInput(i - 1);
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (i < length - 1) {
          focusInput(i + 1);
          selectInput(i + 1);
        }
        break;
      case "Backspace":
        e.preventDefault();
        onChange((prev) => prev.slice(0, i) + prev.slice(i + 1));
        if (i > 0) {
          focusInput(i - 1);
          selectInput(i - 1);
        }
        break;
      default:
        break;
    }
  };

  const handleChange = (e, i) => {
    // only allow digits
    const inputVal = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = (value || "").split("");
    newOtp[i] = inputVal.slice(-1); // take last entered character
    onChange(newOtp.join(""));
    if (inputVal && i < length - 1) focusInput(i + 1);
  };

  const handlePaste = (e, i) => {
    e.preventDefault();
    const text = e.clipboardData
      .getData("text/plain")
      .replace(/[^0-9]/g, "")
      .slice(0, length);
    const otpArray = (value || "").split("");
    for (let j = i; j < length; j++) {
      otpArray[j] = text[j - i] || "";
    }
    onChange(otpArray.join(""));
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <input
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="w-10 h-10 text-center rounded-full border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none text-lg font-semibold shadow-sm transition"
            value={value[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e, index)}
          />
          {index < length - 1 && (separator || <span>-</span>)}
        </React.Fragment>
      ))}
    </div>
  );
}

OTP.propTypes = {
  separator: PropTypes.node,
  length: PropTypes.number.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

OTP.defaultProps = {
  separator: null,
  value: "",
};

// Main Verify Page
export default function Verify() {
  const [otp, setOtp] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      Swal.fire({
        position: "top",
        text: "Please enter the 6-digit code.",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const response = await axiosInstance.post("/users/verify-reset-code", {
        email,
        otp,
      });

      const data = response.data;

      if (data.success) {
        Swal.fire({
          position: "top",
          text: data.message || "OTP verified successfully.",
          confirmButtonText: "OK",
        }).then(() => navigate("/reset-password",
          {
              state: {
                email: email,
              },
            }
        ));
      } else {
        Swal.fire({
          position: "top",
          text: data.message || "Invalid OTP. Please try again.",
          confirmButtonText: "OK",
        });
      }
    } catch {
      Swal.fire({
        position: "top",
        text: "Server error. Please try again later.",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  return (
    <main
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
      }}
      className="flex justify-center items-center p-4"
    >
      <div className="w-96 bg-white/90 rounded-xl shadow-md hover:scale-[1.02] transition transform p-6 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Verification</h2>
        <p className="text-gray-700 mb-3">
          Enter the 6-digit verification code sent to
          <span className="font-medium">
            {" "}
            {email ? `${email.replace(/(.{2}).+@/, "$1***@")}` : "your email"}
          </span>
          .
        </p>
        <p className="text-sm text-gray-500 mb-4">
          If you did not receive the code, wait a minute and check your spam
          folder.
        </p>

        <OTP
          separator={<span>-</span>}
          value={otp}
          onChange={setOtp}
          length={6}
        />
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Verify
          </button>
        </div>
      </div>
    </main>
  );
}
