const story = {
    start: {
        text: "You find yourself at a crossroads in a dense forest. Do you go left towards the mountains or right towards the village?",
        choices: [
            { text: "Go left", next: "mountains" },
            { text: "Go right", next: "village" }
        ]
    },
    mountains: {
        text: "You head towards the mountains. The path is steep and rocky. Suddenly, you hear a noise. Do you investigate or keep moving?",
        choices: [
            { text: "Investigate", next: "cave" },
            { text: "Keep moving", next: "cliff" }
        ]
    },
    village: {
        text: "You walk towards the village and see a market bustling with people. Do you explore the market or head straight to the inn?",
        choices: [
            { text: "Explore the market", next: "market" },
            { text: "Go to the inn", next: "inn" }
        ]
    },
    cave: {
        text: "You find a cave with glowing crystals inside. Do you take a crystal or leave it alone?",
        choices: [
            { text: "Take a crystal", next: "crystal" },
            { text: "Leave it alone", next: "leave_cave" }
        ]
    },
    cliff: {
        text: "You reach a cliff with a stunning view. Do you set up camp here or continue on your way?",
        choices: [
            { text: "Set up camp", next: "camp" },
            { text: "Continue on", next: "continue" }
        ]
    },
    market: {
        text: "The market is full of interesting items. You see a strange merchant selling a mysterious box. Do you buy the box or walk away?",
        choices: [
            { text: "Buy the box", next: "box" },
            { text: "Walk away", next: "walk_away" }
        ]
    },
    inn: {
        text: "You arrive at the inn and find a cozy spot by the fire. Do you order a meal or talk to the innkeeper?",
        choices: [
            { text: "Order a meal", next: "meal" },
            { text: "Talk to the innkeeper", next: "innkeeper" }
        ]
    },
    // Add more story nodes as needed
    crystal: {
        text: "The crystal glows brighter as you pick it up. You feel a surge of energy. To be continued...",
        choices: []
    },
    leave_cave: {
        text: "You decide to leave the cave and continue your journey. To be continued...",
        choices: []
    },
    camp: {
        text: "You set up camp and enjoy the breathtaking view. To be continued...",
        choices: []
    },
    continue: {
        text: "You continue on your path, feeling a sense of adventure. To be continued...",
        choices: []
    },
    box: {
        text: "You open the box to find a magical artifact. To be continued...",
        choices: []
    },
    walk_away: {
        text: "You walk away from the merchant, feeling curious about what could have been inside. To be continued...",
        choices: []
    },
    meal: {
        text: "You enjoy a delicious meal and feel rejuvenated. To be continued...",
        choices: []
    },
    innkeeper: {
        text: "The innkeeper shares stories of the village's history. To be continued...",
        choices: []
    }
};

function makeChoice(choice) {
    const storyNode = story[choice];
    const storyText = document.getElementById('story-text');
    const choicesDiv = document.getElementById('choices');

    storyText.innerText = storyNode.text;
    choicesDiv.innerHTML = '';

    storyNode.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.onclick = () => makeChoice(choice.next);
        choicesDiv.appendChild(button);
    });
}

function loadStoryCreation() {
    document.getElementById('story').style.display = 'none';
    document.getElementById('story-creation').style.display = 'block';
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const nodeCopy = document.getElementById(data).cloneNode(true);
    nodeCopy.classList.add('element');
    nodeCopy.setAttribute('draggable', 'false');
    event.target.appendChild(nodeCopy);
}

function generateID() {
    return Math.random().toString(36).substring(2, 7);
}

function saveStory() {
    const storyID = generateID();
    const editorArea = document.getElementById('editor-area');
    const elements = editorArea.getElementsByClassName('element');
    const customStory = { text: '', choices: [] };

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].id === 'text') {
            customStory.text = elements[i].innerText;
        } else if (elements[i].id
