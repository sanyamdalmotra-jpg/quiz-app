const allQuestions = [

    // WEB
    {question:"HTML stands for?", options:["Hyper Text Markup Language","High Text","Hyper Tool","None"], answer:"Hyper Text Markup Language", level:"easy", category:"web"},
    {question:"CSS is used for?", options:["Structure","Styling","Logic","Database"], answer:"Styling", level:"easy", category:"web"},
    {question:"Which tag for link?", options:["<a>","<link>","<url>","<href>"], answer:"<a>", level:"medium", category:"web"},
    {question:"JS runs on?", options:["Browser","Server","Both","None"], answer:"Both", level:"medium", category:"web"},

    // PROGRAMMING
    {question:"Which is programming language?", options:["Python","HTML","CSS","None"], answer:"Python", level:"easy", category:"programming"},
    {question:"Loop in C?", options:["for","repeat","loop","none"], answer:"for", level:"medium", category:"programming"},
    {question:"Which is OOP concept?", options:["Encapsulation","Loop","Tag","Style"], answer:"Encapsulation", level:"hard", category:"programming"},

    // MIXED
    {question:"DOM stands for?", options:["Document Object Model","Data Object","None","Digital"], answer:"Document Object Model", level:"medium", category:"mixed"},
    {question:"Which is database?", options:["MySQL","HTML","CSS","JS"], answer:"MySQL", level:"easy", category:"mixed"},
    {question:"Binary of 2?", options:["10","01","11","00"], answer:"10", level:"hard", category:"mixed"}
];

let quiz = [];
let index = 0;
let score = 0;
let answered = false;
let username = "";

// START QUIZ
function startQuiz() {
    username = document.getElementById("username").value;
    let level = document.getElementById("level").value;
    let category = document.getElementById("category").value;

    if (username === "") {
        alert("Enter your name!");
        return;
    }

    let filtered = allQuestions.filter(q =>
        (category === "mixed" || q.category === category) &&
        q.level === level
    );

    filtered.sort(() => 0.5 - Math.random());

    quiz = filtered.slice(0, 10);

    document.getElementById("setup-box").style.display = "none";
    document.getElementById("quiz-box").style.display = "block";

    document.getElementById("welcome").innerText = "Hello, " + username;

    index = 0;
    score = 0;

    loadQuestion();
}

// LOAD QUESTION
function loadQuestion() {
    let q = quiz[index];

    document.getElementById("question").innerText = q.question;
    document.getElementById("progress").innerText =
        "Question " + (index + 1) + " of " + quiz.length;

    let optionsHtml = "";

    q.options.forEach(opt => {
        optionsHtml += `<button class="option-btn">${opt}</button>`;
    });

    document.getElementById("options").innerHTML = optionsHtml;

    let buttons = document.querySelectorAll(".option-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", function () {
            if (!answered) checkAnswer(this.innerText);
        });
    });

    answered = false;
}

// CHECK ANSWER
function checkAnswer(selected) {
    let buttons = document.querySelectorAll(".option-btn");

    buttons.forEach(btn => {
        if (btn.innerText === quiz[index].answer) {
            btn.style.backgroundColor = "green";
        } else {
            btn.style.backgroundColor = "red";
        }
    });

    if (selected === quiz[index].answer) score++;

    answered = true;
}

// NEXT BUTTON
document.getElementById("next-btn").addEventListener("click", function () {

    if (!answered) {
        alert("Select answer first!");
        return;
    }

    index++;

    if (index < quiz.length) {
        loadQuestion();
    } else {

        let percent = (score / quiz.length) * 100;
        let msg = "";

        if (percent >= 80) msg = "Excellent 🎉";
        else if (percent >= 50) msg = "Good 👍";
        else msg = "Keep Practicing 📘";

        document.getElementById("quiz-box").innerHTML =
            "<h2>Quiz Completed!</h2>" +
            "<p>Name: " + username + "</p>" +
            "<p>Score: " + score + "/" + quiz.length + "</p>" +
            "<p>" + msg + "</p>" +
            "<button onclick='location.reload()'>Try Again</button>";
    }
});