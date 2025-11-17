import React, { useState } from "react";
import axios from "axios";

/**
 * AIChat component
 * - Local rule-based answers for popular countries.
 * - Otherwise, forward the question to your backend at /api/chat.
 */

function AiChat() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hello! I am your AI assistant. Ask me anything about visas or countries." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setShowChat(!showChat);

  // --- Rule-based answers for popular countries ---
  const countryGuides = {
    dubai: `Dubai (UAE) Visa Guide:
• Tourist/Visit visas (short-term single/multiple entry), Transit, Visa on Arrival for some nationalities.
• Documents: passport 6+ months, photo, flight/hotel info, application form.
• Apply via airline, authorised agent, or official UAE immigration portals (ICA/GDRFA).
• Check fees & processing times for your nationality.`,
    thailand: `Thailand Visa Guide:
• Tourist visas: Single Entry (60 days), Multiple Entry (90 days), Visa on Arrival for some nationalities.
• Documents: passport 6+ months, photo, travel itinerary, proof of funds.
• Apply via Thai Embassy/Consulate or official eVisa portal.`,
    russia: `Russia Visa Guide:
• Tourist visas usually 30 days single/multiple entry.
• Documents: passport, invitation/voucher, travel itinerary, photo, visa application.
• Apply at Russian consulate/official visa center.`,
    vietnam: `Vietnam Visa Guide:
• eVisa or Embassy Visa for tourists (up to 30 days single entry).
• Documents: passport, photo, completed application, payment receipt.
• Apply via official Vietnamese government portal or consulate.`,
    switzerland: `Switzerland Visa Guide:
• Schengen Visa required for most nationalities.
• Documents: passport, photos, travel itinerary, accommodation, travel insurance.
• Apply via Swiss Embassy or official visa application center.`,
    france: `France Visa Guide:
• Schengen Visa required.
• Documents: passport, photos, itinerary, accommodation, travel insurance.
• Apply via French Consulate or official visa center.`,
    germany: `Germany Visa Guide:
• Schengen Visa required.
• Documents: passport, photos, itinerary, accommodation, travel insurance.
• Apply via German Embassy/Consulate.`,
    japan: `Japan Visa Guide:
• Tourist visa required for many nationalities (some visa exemptions exist).
• Documents: passport, photos, itinerary, proof of funds, visa application.
• Apply at Japanese Embassy/Consulate.`,
    italy: `Italy Visa Guide:
• Schengen Visa required.
• Documents: passport, photos, itinerary, accommodation, travel insurance.
• Apply via Italian Embassy or visa center.`,
    uk: `United Kingdom Visa Guide:
• Visitor visa required for most nationals.
• Documents: passport, photos, itinerary, accommodation, financial proof.
• Apply online via official UK visa portal or embassy.`,
    turkey: `Turkey Visa Guide:
• eVisa or visa on arrival for some countries.
• Documents: passport, photo, travel itinerary, online application.
• Apply via official Turkey eVisa website.`,
    australia: `Australia Visa Guide:
• Tourist/Visitor visa required.
• Documents: passport, photos, itinerary, proof of funds, completed application.
• Apply via official Australian government portal (ImmiAccount).`,
    greece: `Greece Visa Guide:
• Schengen Visa required.
• Documents: passport, photos, itinerary, accommodation, travel insurance.
• Apply via Greek Embassy/Consulate.`,
    spain: `Spain Visa Guide:
• Schengen Visa required.
• Documents: passport, photos, itinerary, accommodation, travel insurance.
• Apply via Spanish Embassy/Consulate.`,
    southkorea: `South Korea Visa Guide:
• Tourist visa may be required depending on nationality.
• Documents: passport, photo, itinerary, application form.
• Apply via South Korean Embassy/Consulate or online portal.`,
    hongkong: `Hong Kong Visa Guide:
• Visa-exempt for some nationalities (short visits).
• Documents: passport, return ticket, accommodation details.
• Check official HK Immigration Department website.`,
    indonesia: `Indonesia Visa Guide:
• Visa on Arrival or tourist visa depending on nationality.
• Documents: passport 6+ months, photo, application form, proof of funds.
• Apply online or at arrival for eligible countries.`,
    malaysia: `Malaysia Visa Guide:
• Tourist visa required for some nationals, Visa on Arrival for others.
• Documents: passport 6+ months, photo, itinerary, visa application.
• Apply via Malaysian embassy or official portal.`,
    azerbaijan: `Azerbaijan Visa Guide:
• eVisa or embassy visa depending on nationality.
• Documents: passport, photo, application form, payment receipt.
• Apply via official Azerbaijan eVisa portal.`,
    combodia: `Cambodia Visa Guide:
• Tourist visa on arrival or eVisa.
• Documents: passport 6+ months, photo, application form.
• Apply via Cambodia eVisa website or on arrival.`,
    sriLanka: `Sri Lanka Visa Guide:
• ETA (Electronic Travel Authorization) required for most nationalities.
• Documents: passport, application, travel details.
• Apply via official ETA portal.`,
  };

  const getLocalAnswer = (text) => {
    if (!text) return { handled: false };

    const t = text.toLowerCase();
    for (const country in countryGuides) {
      if (t.includes(country.toLowerCase())) {
        return { handled: true, text: countryGuides[country] };
      }
    }
    return { handled: false };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    const newMessages = [...messages, { from: "user", text: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // First try local answer
      const local = getLocalAnswer(userText);
      if (local.handled) {
        setMessages([...newMessages, { from: "ai", text: local.text }]);
        return;
      }

      // Else call backend AI
      const response = await axios.post("http://localhost:3001/api/chat", {
        question: userText,
      });

      const aiText = response.data?.answer || "Sorry, I didn’t get that.";
      setMessages([...newMessages, { from: "ai", text: aiText }]);
    } catch (err) {
      console.error("AI chat error:", err);

      // Fallback message
      setMessages([
        ...newMessages,
        {
          from: "ai",
          text:
            "Sorry, I’m having trouble connecting right now. Please try again in a moment. Meanwhile, check official embassy/immigration websites for the country you’re asking about.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`ai-help-box ${showChat ? "open" : ""}`}>
      <button className="ai-toggle-btn" onClick={toggleChat}>
        {showChat ? "✖" : "💬 May I Help You?"}
      </button>

      {showChat && (
        <div className="ai-chat shadow rounded">
          <div className="chat-messages overflow-auto p-2" style={{ maxHeight: "250px" }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.from === "ai"
                    ? "chat-message ai p-2 mb-1 bg-light rounded"
                    : "chat-message user p-2 mb-1 bg-primary text-white rounded"
                }
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="p-2 text-muted">
                <em>AI is typing...</em>
              </div>
            )}
          </div>

          <div className="chat-input d-flex mt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="form-control rounded-start"
            />
            <button onClick={handleSend} className="btn btn-primary rounded-end" disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AiChat;
