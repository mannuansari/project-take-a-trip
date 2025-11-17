// Apply.jsx
import React, { useState, useRef, useEffect } from "react";
import { createWorker } from "tesseract.js";
import { parse } from "mrz";
import "bootstrap/dist/css/bootstrap.min.css";

const RAZORPAY_KEY_ID = "<YOUR_RAZORPAY_KEY_ID_HERE>";
const feeAmount = 5000; // paise

const Apply = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    passportNumber: "",
    nationality: "",
    gender: "",
    expiryDate: "",
    flightNumber: "",
    dob: "",
    issueDate: "",
  });

  const [mrzCandidates, setMrzCandidates] = useState({});
  const [passportFile, setPassportFile] = useState(null);
  const [passportPreview, setPassportPreview] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [ocrProgress, setOcrProgress] = useState(null);
  const [expiryMessage, setExpiryMessage] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const passportInputRef = useRef();
  const photoInputRef = useRef();
  const workerRef = useRef(null);

  // ✅ Initialize Tesseract worker safely
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const worker = await createWorker({
          logger: (m) => {
            // Prevent cloning errors by running in next tick
            const safeMsg = { pct: Math.round((m.progress || 0) * 100), msg: m.status };
            setTimeout(() => {
              if (active) setOcrProgress(safeMsg);
            }, 0);
          },
        });

        await worker.load();
        await worker.loadLanguage("eng");
        await worker.initialize("eng");

        if (active) workerRef.current = worker;
      } catch (err) {
        console.error("Worker initialization failed:", err);
      }
    })();

    return () => {
      active = false;
      if (workerRef.current) {
        workerRef.current.terminate().catch(console.error);
      }
    };
  }, []);

  const validateExpiryDate = (dateStr) => {
    if (!dateStr) return false;
    const expiry = new Date(dateStr);
    const today = new Date();
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(today.getMonth() + 6);

    if (expiry < today) setExpiryMessage("❌ Passport already expired!");
    else if (expiry < sixMonthsLater) setExpiryMessage("⚠️ Passport expiring soon — renew before applying.");
    else setExpiryMessage("✅ Passport is valid for travel.");

    return expiry >= today;
  };

  const handlePassportUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPassportFile(file);
    setPassportPreview(URL.createObjectURL(file));
    setUploadStatus(null);
    setIsProcessing(true);

    try {
      if (!workerRef.current) {
        throw new Error("OCR worker not initialized yet.");
      }

      const { data } = await workerRef.current.recognize(file);

      // Keep MRZ line breaks
      const lines = data.text
        .split("\n")
        .map((line) => line.replace(/\s/g, ""))
        .filter((line) => line.length > 0);

      const cleanedMRZ = lines.join("\n");

      let mrzResult;
      try {
        mrzResult = parse(cleanedMRZ);
      } catch {
        mrzResult = { valid: false };
      }

      if (!mrzResult.valid) {
        setUploadStatus({
          type: "error",
          message: "MRZ not detected. Please ensure the MRZ lines are clear.",
        });
        return;
      }

      // Prepare candidate arrays
      const candidates = {
        firstName: [mrzResult.fields.givenNames || ""],
        lastName: [mrzResult.fields.surname || ""],
        passportNumber: [mrzResult.fields.documentNumber || ""],
        nationality: [mrzResult.fields.nationality || ""],
        gender: [mrzResult.fields.sex || ""],
        dob: [mrzResult.fields.dateOfBirth || ""],
        expiryDate: [mrzResult.fields.dateOfExpiry || ""],
        issueDate: [""],
      };
      setMrzCandidates(candidates);

      // Auto-fill first candidate
      const autoFill = {};
      Object.keys(candidates).forEach((k) => (autoFill[k] = candidates[k][0] || ""));
      setFormData((prev) => ({ ...prev, ...autoFill }));
      validateExpiryDate(autoFill.expiryDate);

      setUploadStatus({
        type: "success",
        message: "Passport auto-filled successfully! You can select correct value if needed.",
      });
    } catch (err) {
      console.error("OCR/MRZ error:", err);
      setUploadStatus({
        type: "error",
        message: "OCR failed. Please upload a clear MRZ image.",
      });
    } finally {
      setIsProcessing(false);
      setOcrProgress(null);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "expiryDate") validateExpiryDate(value);
  };

  const handleReset = () => {
    setPassportFile(null);
    setPassportPreview("");
    setPhotoFile(null);
    setPhotoPreview("");
    setFormData({
      firstName: "",
      lastName: "",
      passportNumber: "",
      nationality: "",
      gender: "",
      expiryDate: "",
      flightNumber: "",
      dob: "",
      issueDate: "",
    });
    setMrzCandidates({});
    setExpiryMessage("");
    setUploadStatus(null);
    if (passportInputRef.current) passportInputRef.current.value = null;
    if (photoInputRef.current) photoInputRef.current.value = null;
  };

  const handleSubmit = () => {
    if (!passportFile || !photoFile) {
      setUploadStatus({ type: "error", message: "Please upload both passport and photo." });
      return;
    }
    if (!validateExpiryDate(formData.expiryDate)) {
      setUploadStatus({ type: "error", message: "Passport validity is insufficient." });
      return;
    }
    openRazorpayCheckout();
  };

  const openRazorpayCheckout = () => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = launchCheckout;
      document.body.appendChild(script);
    } else launchCheckout();
  };

  const launchCheckout = () => {
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: feeAmount,
      currency: "INR",
      name: "Visa Government Fee",
      description: "Pay visa processing fee",
      prefill: { name: `${formData.firstName} ${formData.lastName}` },
      handler: (response) =>
        setUploadStatus({ type: "success", message: "Payment successful! ID: " + response.razorpay_payment_id }),
      modal: { ondismiss: () => setUploadStatus({ type: "error", message: "Payment cancelled." }) },
      theme: { color: "#0d6efd" },
    };
    new window.Razorpay(options).open();
  };

  return (
    <div className="container my-5">
      {ocrProgress && (
        <div className="mb-3">
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              style={{ width: `${ocrProgress.pct}%` }}
            >
              {ocrProgress.msg}
            </div>
          </div>
        </div>
      )}

      <div className="card shadow border-0">
        <div className="card-body">
          <h4 className="text-center mb-3">Visa Application</h4>
          <div className="row g-3">
            {/* Left side: Previews */}
            <div className="col-md-5">
              <div className="border rounded p-3">
                <div className="d-flex gap-3 mb-3">
                  {/* Photo */}
                  <div style={{ width: 110 }}>
                    <div
                      className="border rounded d-flex align-items-center justify-content-center"
                      style={{ height: 130, background: "#f8f9fa" }}
                    >
                      {photoPreview ? (
                        <img src={photoPreview} alt="photo" style={{ maxHeight: 120 }} />
                      ) : (
                        <div className="text-muted small">Photo preview</div>
                      )}
                    </div>
                    <label className="btn btn-sm btn-outline-secondary mt-2" style={{ cursor: "pointer" }}>
                      Upload Photo
                      <input
                        ref={photoInputRef}
                        onChange={handlePhotoUpload}
                        accept=".jpg,.jpeg,.png"
                        type="file"
                        hidden
                      />
                    </label>
                  </div>

                  {/* Passport */}
                  <div style={{ flex: 1 }}>
                    <div className="border rounded p-2 bg-white" style={{ minHeight: 130 }}>
                      {passportPreview ? (
                        <img src={passportPreview} alt="passport" style={{ maxWidth: "100%", maxHeight: 120 }} />
                      ) : (
                        <div className="text-muted small">Passport preview</div>
                      )}
                    </div>
                    <label className="btn btn-sm btn-outline-secondary mt-2" style={{ cursor: "pointer" }}>
                      Upload Passport
                      <input
                        ref={passportInputRef}
                        onChange={handlePassportUpload}
                        accept=".jpg,.jpeg,.png,.pdf"
                        type="file"
                        hidden
                      />
                    </label>
                  </div>
                </div>

                {/* Autofilled form with candidates */}
                {Object.keys(formData).map((key) => (
                  <div key={key} className="mb-1">
                    <div className="small text-muted text-capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                    {mrzCandidates[key] && mrzCandidates[key].length > 1 ? (
                      <select
                        className="form-control"
                        value={formData[key]}
                        onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
                      >
                        {mrzCandidates[key].map((val, idx) => (
                          <option key={idx} value={val}>
                            {val || "—"}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="fw-semibold">{formData[key] || "—"}</div>
                    )}
                  </div>
                ))}

                {expiryMessage && (
                  <div
                    className={`mt-2 p-1 rounded ${
                      expiryMessage.includes("✅")
                        ? "bg-success bg-opacity-10 text-success"
                        : "bg-warning bg-opacity-10 text-warning"
                    }`}
                  >
                    {expiryMessage}
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Form */}
            <div className="col-md-7">
              <div className="card p-3">
                <div className="row g-3">
                  {Object.keys(formData).map((key) => (
                    <div className="col-md-6" key={key}>
                      <label className="form-label small text-capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </label>
                      <input
                        name={key}
                        value={formData[key]}
                        onChange={handleInputChange}
                        className="form-control"
                        type={["dob", "expiryDate", "issueDate"].includes(key) ? "date" : "text"}
                        placeholder={key === "flightNumber" ? "e.g. EK501" : ""}
                      />
                    </div>
                  ))}

                  <div className="col-12 d-flex gap-2">
                    <button
                      disabled={isProcessing}
                      className="btn btn-primary flex-grow-1"
                      onClick={handleSubmit}
                    >
                      {isProcessing ? "Processing..." : "Submit & Pay"}
                    </button>
                    <button className="btn btn-outline-secondary" onClick={handleReset}>
                      Reset
                    </button>
                  </div>

                  {uploadStatus && (
                    <div
                      className={`mt-3 p-2 rounded ${
                        uploadStatus.type === "success"
                          ? "bg-success bg-opacity-10 text-success"
                          : "bg-danger bg-opacity-10 text-danger"
                      }`}
                    >
                      {uploadStatus.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center small text-muted">
        Note: Upload a clear passport image (MRZ line visible) for automatic autofill. You can manually
        correct any field if needed.
      </div>
    </div>
  );
};

export default Apply;
