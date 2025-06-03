let createdDropDowns = 0;
let createdLinks = 0;

function createDropDown(){
    const block = document.getElementById("b3");
    const target = document.getElementById("target");

    const newDropDown = document.createElement("div");
    newDropDown.className = "dropdown";

    const newDropBtn = document.createElement("button");
    newDropBtn.className = "dropbtn";
    newDropBtn.textContent = "New";
    newDropBtn.id = `d${createdDropDowns}`;
    newDropBtn.style.borderRight = "0";

    const newDropContent = document.createElement("div");
    newDropContent.className = "dropdown-content";
    newDropContent.id = `dcon${createdDropDowns}`;

    const newDropContentUp = document.createElement("div");
    newDropContentUp.className = "dropdown-content";

    const newDropContentUpEditBtn = document.createElement("button");
    newDropContentUpEditBtn.textContent = "Edit";
    newDropContentUpEditBtn.addEventListener('click', () => {
        openEditPopup(newDropBtn.id, false);
    }); 

    const newDropContentUpDeleteBtn = document.createElement("button");
    newDropContentUpDeleteBtn.textContent = "-";
    newDropContentUpDeleteBtn.addEventListener('click', () => {
        deleteElement(newDropBtn.id);
    });

    const newDropContentBtn = document.createElement("button");
    newDropContentBtn.textContent = "+";
    newDropContentBtn.id = `dbtn${createdDropDowns}`;
    newDropContentBtn.addEventListener('click', () => {
        createDropDownContentLink(newDropContent.id, newDropContentBtn.id);
    }); 

    newDropContent.appendChild(newDropContentBtn);

    newDropContentUp.appendChild(newDropContentUpDeleteBtn);
    newDropContentUp.appendChild(newDropContentUpEditBtn);

    newDropDown.appendChild(newDropContentUp);
    newDropDown.appendChild(newDropBtn);
    newDropDown.appendChild(newDropContent);

    block.insertBefore(newDropDown, target);
    createdDropDowns++;
}

function createDropDownContentLink(blockID, targetID){
    const block = document.getElementById(blockID);
    const target = document.getElementById(targetID);

    const newDropContentLink = document.createElement("div");
    newDropContentLink.className = "dropdown-content-link";
    newDropContentLink.style.display = "flex";
    newDropContentLink.id = `l${createdLinks}`;

    const newLink = document.createElement("a");
    newLink.textContent = "newLink";
    newLink.target = "_blank";
    newLink.id = `a${createdLinks}`;

    const newEditLinkBtn = document.createElement("button");
    newEditLinkBtn.textContent = "Edit";
    newEditLinkBtn.addEventListener('click', () => {
        openEditPopup(newLink.id, true);
    }); 

    const newDeleteLinkBtn = document.createElement("button");
    newDeleteLinkBtn.textContent = "-";
    newDeleteLinkBtn.addEventListener('click', () => {
        deleteElement(newDropContentLink.id);
    });

    newDropContentLink.appendChild(newLink);
    newDropContentLink.appendChild(newEditLinkBtn);
    newDropContentLink.appendChild(newDeleteLinkBtn);

    block.insertBefore(newDropContentLink, target);
    createdLinks++;
}

function openEditPopup(elementID, isLink){
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("blurOverlay");
    const buttonClose = document.getElementById("closePopup");
    const buttonSave = document.getElementById("saveBtnPopup");
    const element = document.getElementById(elementID);
    const textArea = document.getElementById("inputText");
    const textAreaURL = document.getElementById("inputTextURL");
    const textAreaLabelURL = document.querySelector(`label[for="inputTextURL"]`);

    popup.classList.add("active"); 
    overlay.classList.add("active");

    if (isLink) {
        textAreaURL.style.display = "block";
        textAreaLabelURL.style.display = "block";
    }
    else {
        textAreaURL.style.display = "none";
        textAreaLabelURL.style.display = "none";
    }

    function closePopup() {
        popup.classList.remove("active");
        overlay.classList.remove("active");
    }   

    buttonClose.onclick = closePopup;

    buttonSave.onclick = edit;

    function edit() {
        const input = textArea.value.trim();
        element.textContent = input;
        if (isLink) {
            const url = textAreaURL.value.trim();
            element.href = url;
        }         
    }
}

function deleteElement(elementID){
    const element = document.getElementById(elementID);
    element.remove();
}