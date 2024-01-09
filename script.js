const sendChatBtn  = document.querySelector('.chat-input span')
const chatInput    = document.querySelector('.chat-input textarea')
const chatBox = document.querySelector('.chatbox')
const chatbotToggler = document.querySelector(".chatbot-toggler")
const closeButton  = document.querySelector('.material-symbols-outlined')
const openChat     = document.querySelector('.material-symbols-rounded')



closeButton.addEventListener('click',()=> {
    document.body.classList.remove('show-chatbot')
})
openChat.addEventListener('click', ()=> {
    document.body.classList.add('show-chatbot')
})


let userMessage; 
const API_KEY = "";


function createChatLi(message,className) {
    // Create a chat <li> element with passed message and ClassName
        const chatLi = document.createElement('li')
        chatLi.classList.add("chat", className)
        let chatContent = className === "outgoing" ? `<p> </p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`
        chatLi.innerHTML = chatContent
        chatLi.querySelector("p").textContent = message
        return chatLi
}

function generateResponse(incomingChatLI) {
    const API_URL = "https://api.openai.com/v1/chat/competions"
    const messageElement = incomingChatLI.querySelector("p")

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: 'user',content: userMessage}]

        })
    }
    // Send POST request to API, get response
    fetch(API_URL,requestOptions).then(res=> res.json()).then(data=>{
        messageElement.textContent = data.choices[0].message.content
    }).catch((error)=>{
        messageElement.textContent = "Oops! Something went wrong...."
    }).finally(()=> chatBox.scrollTo(0, chatBox.scrollHeight))
}


function handleChat() {


    // Getting entered message and removing extra whitespace
    userMessage = chatInput.value.trim()

    if(!userMessage) {
        return
    }
    chatInput.value = ""

    // Insert the message in the chatbox
    chatBox.appendChild(createChatLi(userMessage, "outgoing"))
    chatBox.scrollTo(0, chatBox.scrollHeight)


    setTimeout(()=> {
        const incomingChatLI =  createChatLi("Thinking","incoming")
        chatBox.appendChild(incomingChatLI)
        chatBox.scrollTo(0, chatBox.scrollHeight)
        generateResponse(incomingChatLI)
    },600 )
   
}

sendChatBtn.addEventListener('click',handleChat)

