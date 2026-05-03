import express from "express";
import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";

const app = express();
app.use(express.json());

let sessionStore = {};

/**
 * 🔥 GENERATE PAIR CODE / QR SESSION
 */
app.get("/pair", async (req, res) => {
  const { state, saveCreds } = await useMultiFileAuthState("session");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false
  });

  sock.ev.on("connection.update", async (update) => {
  const { pairingCode } = update;

  if (pairingCode) {
    console.log("🔑 PAIR CODE:", pairingCode);
  }
});

    if (connection === "open") {
      const sessionId = state.creds?.me?.id || "BATTLE_MD_SESSION";

      sessionStore.session = sessionId;

      console.log("⚔️ SESSION CONNECTED:", sessionId);
    }
  });

  res.json({
    status: "waiting",
    message: "Scan QR or use pairing code"
  });
});

/**
 * 🔑 GET SESSION ID
 */
app.get("/session", (req, res) => {
  res.json({
    session: sessionStore.session || null
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("⚔️ SESSION SERVER RUNNING ON " + PORT);
});
