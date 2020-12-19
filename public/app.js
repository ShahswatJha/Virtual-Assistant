const submitButton = document.getElementById('submitButton');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotOutput = document.getElementById('chatbotOutput');
submitButton.onclick = userSubmitEventHandler;
chatbotInput.onkeyup = userSubmitEventHandler;
function userSubmitEventHandler(event) {
    if (
        (event.keyCode && event.keyCode === 13) ||
        event.type === 'click'
    ) {
        chatbotOutput.innerText = 'thinking...';
        askChatBot(chatbotInput.value);
    }
}
function askChatBot(userInput) {
    const myRequest = new Request('/', {
        method: 'POST',
        body: userInput
    });

    fetch(myRequest).then(function(response) {
        if (!response.ok) {
            throw new Error('HTTP error, status = ' + response.status);
        } else {
            return response.text();
        }
    }).then(function(text) {
        chatbotInput.value = '';
        chatbotOutput.innerText = text;
    }).catch((err) => {
        console.error(err);
    });
}



//Voice search code

const startBtn=document.querySelector("#start-btn");
const recognition = new webkitSpeechRecognition();
recognition.continuous =true;
recognition.interimReslts=false;
recognition.maxAlternatives=1;
const synth=window.speechSynthesis;

startBtn.addEventListener("click",()=>{
    recognition.start();
});
let utter=new SpeechSynthesisUtterance("Hi,how are you?");
utter.onend=()=>{
    recognition.start();
};

recognition.onresult =(e) =>{
    const transcript = e.results[e.results.length-1][0].transcript.trim();
        askChatBot(transcript);
    /*    if(transcript ==="hello"){
            recognition.stop();
            utter.text="Hi,how are you?";
            synth.speak(utter);
        }
        else if(transcript ==="goodbye"){
            recognition.stop();
            utter.text="Hope to see you soon";
            synth.speak(utter);
        }*/
    };
