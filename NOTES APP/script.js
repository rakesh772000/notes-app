const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    notesContainer.innerHTML = "";
    storedNotes.forEach(note => {
        const inputBox = document.createElement("p");
        const img = document.createElement("img");
        inputBox.className = "input-box";
        inputBox.setAttribute("contenteditable", "true");
        inputBox.textContent = note.text;
        img.src = "images/material-icon-1307676_1280.webp";
        notesContainer.appendChild(inputBox).appendChild(img);

        inputBox.addEventListener("input", updateStorage);
    });
}

function updateStorage() {
    const notes = Array.from(notesContainer.querySelectorAll(".input-box")).map(inputBox => ({
        text: inputBox.textContent
    }));
    localStorage.setItem("notes", JSON.stringify(notes));
}

createBtn.addEventListener("click", () => {
    const inputBox = document.createElement("p");
    const img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/material-icon-1307676_1280.webp";
    notesContainer.appendChild(inputBox).appendChild(img);
    updateStorage();
    inputBox.addEventListener("input", updateStorage);
});

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

showNotes();
