const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";
let isRecording = false;
const isMobileDevice =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  );

export const startV = (textarea, lang = "") => {
  if (!textarea || !textarea.current) {
    console.error("Textarea reference is not valid.");
    return;
  }
  if (isRecording) {
    console.warn("Speech recognition is already running.");
    return;
  }
  let interimTranscript = "";
  let finalTranscript = "";
  // textarea.current.value = "";
  recognition.lang = lang ? lang : "en-US";

  recognition.onresult = (event) => {
    interimTranscript = "";
    finalTranscript = "";
    for (let i = 0; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        if (isMobileDevice) finalTranscript = transcript;
        else finalTranscript += transcript;
      } else {
        if (isMobileDevice) interimTranscript = transcript;
        else interimTranscript += transcript;
      }
    }
    if (textarea) textarea.current.value = finalTranscript + interimTranscript;
  };

  try {
    recognition.start();
    console.warn("Start speech recognition");
    isRecording = true;
  } catch (error) {
    console.error("Failed to start recognition: ", error);
  }
};

export const stopV = (textarea, onchange = null) => {
  if (!isRecording) {
    console.warn("Speech recognition is not running.");
    return;
  }

  recognition.stop();
  console.warn("Stop speech recognition");
  isRecording = false;
  if (textarea && textarea.current.value) {
    if (onchange) onchange(textarea.current.value);
  }
};

recognition.onerror = (event) => {
  console.error("Speech recognition error detected: " + event.error);
  recognition.stop();
};
