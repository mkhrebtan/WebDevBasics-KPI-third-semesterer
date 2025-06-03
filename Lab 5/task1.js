function changeText(){
    let textH = document.getElementById("headTxt").innerHTML;
    let textF = document.getElementById("footTxt").innerHTML;

    document.getElementById("headTxt").innerHTML = textF;
    document.getElementById("footTxt").innerHTML = textH;
}

function calcPentagonArea(){
    let sideLength = parseFloat(document.getElementById("sideLength").value);
            
    if (isNaN(sideLength) || sideLength <= 0) {
        alert("Enter a valid value for the side length");
        return;
    }

    let area = (1 / 4) * Math.sqrt(5 * (5 + 2 * Math.sqrt(5))) * Math.pow(sideLength, 2);

    document.getElementById("resultPentagon").innerHTML = "Result: " + area.toFixed(2);     
}

function checkTriangle(){
    const sides = 
    [parseFloat(document.getElementById("sideA").value), parseFloat(document.getElementById("sideB").value), parseFloat(document.getElementById("sideC").value)];

    let m = sides.length;
    for (let i = 0; i < m; i++) {
        if (isNaN(sides[i]) || sides[i] <= 0) {
            let message = "";
            switch (i) {
                case 0:
                    message = "Enter a valid value for the side A length";
                    break;
                case 1:
                    message = "Enter a valid value for the side B length";
                    break;
                case 2:
                    message = "Enter a valid value for the side C length";
                    break;
                default:
                    break;
            }
            alert(message);
            return;
        }
    }

    let result = "";
    sides[0] + sides[1] > sides[2] && sides[0] + sides[2] > sides[1] && sides[1] + sides[2] > sides[0] ? result = "Possible" : result = "Not posssible";
    setCookie(result);
    alert(result);
}

function setCookie(cvalue) {
    document.cookie = "triangle=Triangle: " + cvalue;
}

window.onload = checkCookie;

function checkCookie() {
    const cookieValue = document.cookie.split("; ").find((row) => row.startsWith("triangle="))?.split("=")[1];
    let message = "Cookie info:\n" + cookieValue + "\n" + "After pressing OK cookies will be cleared";

    if (cookieValue !== undefined) {
        alert(message);

        document.cookie = "triangle=; expires= 01 Jan 1999 00:00:00 UTC;"
        alert("Cookies cleared!");

        location.reload();
    }
    else {    
        let x = document.getElementById("formTriangle");
        x.style.display = "flex";
        x.style.flexDirection = "column";
    }    
}

document.addEventListener("DOMContentLoaded", function() {
    const capitalizeCheckbox = document.getElementById("capitalizeCheckbox");
    const textBlock = document.getElementById("block4");

    applyInitialCapitalization();

    function applyInitialCapitalization() {
        if (localStorage.getItem("capitalizeEnabled") === "true") {
            capitalizeCheckbox.checked = true;
            capitalizeFirstLetters(textBlock);
        } else {
            capitalizeCheckbox.checked = false;
            lowercaseFirstLetters(textBlock);
        }
    }
});

function handleBlurEvent(capitalizeCheckbox) {
    if (capitalizeCheckbox.checked) {
        capitalizeFirstLetters(document.getElementById("block4"));
        localStorage.setItem("capitalizeEnabled", "true");
    } else {
        lowercaseFirstLetters(document.getElementById("block4"));
        localStorage.setItem("capitalizeEnabled", "false");
    }
}

function capitalizeFirstLetters(element) {
    element.querySelectorAll("*").forEach(child => {
        if (child.nodeType === Node.ELEMENT_NODE) {
            child.innerHTML = child.innerHTML.replace(/\b\w/g, char => char.toUpperCase());
        }
    });
}

function lowercaseFirstLetters(element) {
    element.querySelectorAll("*").forEach(child => {
        if (child.nodeType === Node.ELEMENT_NODE) {
            child.innerHTML = child.innerHTML.toLowerCase();
        }
    });
}

_id = undefined;
textNodes = undefined;
block = undefined;

function openForm(id) {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("blurOverlay");
    const textArea = document.getElementById("inputText");

    popup.classList.add("active"); 
    overlay.classList.add("active");

    _id = id;
    
    const editedText = localStorage.getItem(_id + "t");
    if (editedText != null) {
        textArea.value = editedText;
    }
    else {
        textArea.value = "";
    }
    
    block = getBlock();
    textNodes = Array.from(block.childNodes).filter(node => 
        node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== ""
    );

    checkEditedText(); 
}

function closePopup() {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("blurOverlay");

    popup.classList.remove("active");
    overlay.classList.remove("active");
}

function checkEditedText() {
    const buttonDelete = document.getElementById("deleteBtnPopup");
    const prevText = localStorage.getItem(_id);
    buttonDelete.disabled = prevText == null;
}

function saveText() {
    const textArea = document.getElementById("inputText");

    if (!textNodes[0]){
        const newTextNode = document.createTextNode("");
        block.appendChild(newTextNode);
        textNodes[0] = newTextNode;
    }

    const input = textArea.value.trim();
    if (localStorage.getItem(_id) == null) {
        localStorage.setItem(_id, textNodes[0].nodeValue);
    }
    localStorage.setItem(_id + "t", input);

    textNodes[0].nodeValue = input;
    
    checkEditedText();
}

function deleteText() {
    const prevText = localStorage.getItem(_id);
    textNodes[0].nodeValue = prevText;
    localStorage.removeItem(_id);
    localStorage.removeItem(_id + "t");
    checkEditedText();
}

function getBlock() {
    let block = undefined;
    switch (_id) {
        case "b1":
            block = document.querySelector(".header");
            break;
        case "b2":
            block = document.querySelector(".block2");
            break;
        case "b3":
            block = document.querySelector(".block3");
            break;
        case "b4":
            block = document.querySelector(".block4");
            break;
        case "b5":
            block = document.querySelector(".block5");
            break;
        case "b6":
            block = document.querySelector(".footer");
            break;
        default:
            break;
    }

    return block;
}

window.addEventListener('unload', function () {
    const keysToKeep = ["capitalizeEnabled"];
    clearLocalStorageExcept(keysToKeep);
});

function clearLocalStorageExcept(keepKeys) {
    const savedItems = {};
    keepKeys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value !== null) {
            savedItems[key] = value;
        }
    });

    localStorage.clear();

    for (const key in savedItems) {
        localStorage.setItem(key, savedItems[key]);
    }
}
/*function handleDblClick(id) {
    let block = document.querySelector(".block3");        
    let name = "";

    switch (id) {
        case "b1":
            block = document.querySelector(".header");
            name = "Block 1";
            break;
        case "b2":
            block = document.querySelector(".block2");
            name = "Block 2";
            break;
        case "b3":
            block = document.querySelector(".block3");
            name = "Block 3";
            break;
        case "b4":
            block = document.querySelector(".block4");
            name = "Block 4";
            break;
        case "b5":
            block = document.querySelector(".block5");
            name = "Block 5";
            break;
        case "b6":
            block = document.querySelector(".footer");
            name = "Block 6";
            break;
        default:
            break;
    }

    let textNodes = Array.from(block.childNodes).filter(node => 
        node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== ""
    );;

    openForm(textNodes[0], name, id);
}

function openForm(node, name, id) {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("blurOverlay");
    const buttonClose = document.getElementById("closePopup");
    const headPopup = popup.querySelector("h4");
    const buttonSave = document.getElementById("saveBtnPopup");
    const buttonDelete = document.getElementById("deleteBtnPopup");
    const textArea = document.getElementById("inputText");
    const storageKey = `text_${id}`;

    checkEditedText();

    function checkEditedText() {
        const prevText = localStorage.getItem(storageKey);
        buttonDelete.disabled = prevText == null;
    }

    headPopup.innerHTML = name;

    popup.classList.add("active"); 
    overlay.classList.add("active");
        
    buttonClose.addEventListener("click", closePopup);

    function closePopup() {
        popup.classList.remove("active");
        overlay.classList.remove("active");
    }

    buttonSave.addEventListener("click", saveText);

    function saveText() {
        const input = textArea.value.trim();
        node.nodeValue = input;
        localStorage.setItem(storageKey, node.nodeValue.trim());
        checkEditedText();
    }

    buttonDelete.addEventListener("click", deleteText);

    function deleteText() {
        const prevText = localStorage.getItem(storageKey);
        node.nodeValue = prevText;
        localStorage.removeItem(storageKey);
        checkEditedText();
    }
}



/*function createForm(block) {
    const form = document.createElement("form");

    const label = document.createElement("label");
    label.setAttribute("for", "textInput");
    label.innerHTML = "Enter text:";

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "textInput");
    input.setAttribute("name", "textInput");

    const saveButton = document.createElement("button");
    saveButton.setAttribute("type", "button");
    saveButton.innerHTML = "Save";

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.innerHTML = "Delete";

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(saveButton);
    form.appendChild(deleteButton);

    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.marginRight = "5px";

    block.appendChild(form);
}*/