
import { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScgkC9oa9Xy1esVAayNm-EUnGHgbnAkTLb2cOf6ArTZDW3oDg/formResponse";
const ENTRY_ID = "entry.2138392493";

export default function App() {
  const [step, setStep] = useState(1);
  const [swapping, setSwapping] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleYes = () => setStep(3);
  const handleNo = () => setSwapping(true);

  const sendResponse = async (choice) => {
    const formData = new FormData();
    formData.append(ENTRY_ID, choice);
    await fetch(FORM_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });
    setConfirmed(true);
  };

  return (
    <div className="container">
      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="letter">
          <p>Dear Riya,<br />
            This message is from His Highness Gurjass Singh Suri the First! We would like to let you know that we understand how valuable your time is and how much you cherish your weekends with your friends and family. Which is why we would like to ask you for 2.5–3 hrs of your time...
          </p>
          <button onClick={() => setStep(2)}>Continue</button>
        </motion.div>
      )}
      {step === 2 && (
        <div className="question">
          <h2>Are you free this Sunday, April 13th?</h2>
          <div className="button-group">
            <button onClick={handleYes}>Yes</button>
            {!swapping ? (
              <button onClick={handleNo}>No</button>
            ) : (
              <motion.button
                onClick={handleYes}
                animate={{ x: [0, 100, -100, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                Yes
              </motion.button>
            )}
          </div>
        </div>
      )}
      {step === 3 && !confirmed && (
        <div className="options">
          <h2>What would you prefer?</h2>
          <div className="button-group">
            {['Brunch', 'Lunch', 'An Evening Outing', 'Dinner'].map(choice => (
              <button key={choice} onClick={() => sendResponse(choice)}>{choice}</button>
            ))}
          </div>
        </div>
      )}
      {confirmed && (
        <div className="confirmation">
          <h2>Yaayyy! Thank you for giving him this precious time of your life.</h2>
        </div>
      )}
    </div>
  );
}
