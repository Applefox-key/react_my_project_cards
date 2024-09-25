const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

export const textareaM = document.getElementById("answerArea");
export const startBtnM = document.getElementById("start-record-btn");
export const stopBtnM = document.getElementById("stop-record-btn");

export const startV = () => {
  recognition.start();
};

export const stopV = (onchange) => {
  const textarea = textareaM
    ? textareaM
    : document.getElementById("answerArea");
  recognition.stop();

  if (textarea.value) {
    onchange(textarea.value);
    return textarea.value;
  }
  return null;
};
recognition.onresult = (event) => {
  let interimTranscript = "";
  let finalTranscript = "";
  const textarea = textareaM
    ? textareaM
    : document.getElementById("answerArea");
  for (let i = 0; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript;
    } else {
      interimTranscript += transcript;
    }
  }
  if (textarea) textarea.value = finalTranscript + interimTranscript;
};

recognition.onerror = (event) => {
  console.error("Speech recognition error detected: " + event.error);
};

export const startOrStopV = (onchange) => {
  const startBtn = startBtnM
    ? startBtnM
    : document.getElementById("start-record-btn");
  const stopBtn = stopBtnM
    ? stopBtnM
    : document.getElementById("stop-record-btn");

  if (stopBtn.style.display === "none") startV();
  else if (startBtn.style.display === "none") stopV(onchange);
};
export const checkIfStop = (onchange) => {
  const startBtn = startBtnM
    ? startBtnM
    : document.getElementById("start-record-btn");

  if (startBtn.style.display === "none") return stopV(onchange);
  else return null;
};
