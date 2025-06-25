const nameInput = document.getElementById('name-input') as HTMLInputElement;
const emailInput = document.getElementById('email-input') as HTMLInputElement;
const roleInput = document.getElementById('role-select') as HTMLSelectElement;
const addUserButton = document.getElementById('add-user-btn') as HTMLButtonElement;
const mainList = document.getElementById('main-list') as HTMLOListElement;

function nameInputValidation() {
    if (nameInput.value == '') {
        nameInput.setAttribute('placeholder', "Name can't be empty!");
        nameInput.style.borderColor = 'rgb(218, 43, 43)';
        return true;
    } else {
        nameInput.removeAttribute('placeholder');
        nameInput.style.borderColor = '#d8d8d8';
        return false;
    }
}

nameInput.addEventListener('blur', nameInputValidation);

function emailInputValidation() {
    if (hasDuplicate()) return;
    if (emailInput.value == '') {
        emailInput.setAttribute('placeholder', "Email can't be empty!");
        emailInput.style.borderColor = 'rgb(218, 43, 43)';
        return true;
    } else if (!(emailInput.value.includes('@')) || !(emailInput.value.includes('.'))) {
        emailInput.style.borderColor = 'rgb(218, 43, 43)';
        return true;
    } else {
        emailInput.removeAttribute('placeholder');
        emailInput.style.borderColor = '#d8d8d8';
        return false;
    }
}

emailInput.addEventListener('blur', emailInputValidation);

function hasDuplicate() {
    if (editMode) {
        for (let i = 0; i < userData.length; i++) {
            if (i == editIndx) continue;
            if (emailInput.value == userData[i].getEmail()) {
                document.getElementById('dupe-email')!.style.opacity = '1';
                emailInput.style.borderColor = 'rgb(218, 43, 43)';
                return true;
            }
        }
    } else {
        for (let data of userData) {
            if (emailInput.value == data.getEmail()) {
                document.getElementById('dupe-email')!.style.opacity = '1';
                emailInput.style.borderColor = 'rgb(218, 43, 43)';
                return true;
            }
        }
    }
    emailInput.style.borderColor = '#d8d8d8';
    document.getElementById('dupe-email')!.style.opacity = '0';
    return false;
}

class User {
    private name: string;
    private email: string;
    private role: boolean;

    constructor(name: string, email: string, role: boolean) {
        this.name = name;
        this.email = email;
        this.role = role;
    }
    getName(): string {
        return this.name;
    }
    getEmail(): string {
        return this.email;
    }
    getRole(): string {
        return this.role ? 'User' : 'Admin';
    }
    updateName(name: string) {
        this.name = name;
    }
    updateEmail(email: string) {
        this.email = email;
    }
    updateRole(role: boolean) {
        this.role = role;
    }
}

let userData: User[] = [];
let editMode: boolean = false;
let editIndx: number;
let editOL: any;

addUserButton.addEventListener('click', (def) => {
    def.preventDefault();
    if (hasDuplicate()) return;
    if (nameInputValidation() || emailInputValidation()) return;

    if (editMode) {
        updateDataFunction();
        return;
    }

    let isUser = true;
    if (roleInput.value == 'admin') isUser = false;
    const newUser = new User(nameInput.value, emailInput.value, isUser);
    userData.push(newUser);

    const div = document.createElement('div');
    const listItem = document.createElement('li');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');

    editButton.innerText = 'Edit';
    deleteButton.innerText = 'Delete';
    listItem.innerHTML = `<li></li><p>${newUser.getName()}</p><p>${newUser.getEmail()}</p><p>${newUser.getRole()}</p>`;
    div.append(editButton);
    div.append(deleteButton);
    listItem.append(div);
    mainList.append(listItem);

    nameInput.value = '';
    emailInput.value = '';
    roleInput.value = 'user';

    deleteButton.addEventListener('click', () => {
        deleteButtonFunction(deleteButton);
    })
    editButton.addEventListener('click', () => {
        editButtonFunction(editButton);
    })
})

function deleteButtonFunction(deleteButton: HTMLButtonElement) {
    const closestLi = deleteButton.closest('li');
    const oL = Array.from(closestLi!.parentElement!.children);
    const indx = oL.indexOf(closestLi!);
    const parent = closestLi?.parentElement;
    parent?.removeChild(closestLi!);
    userData.splice(indx, 1);

    nameInput.value = '';
    emailInput.value = '';
    roleInput.value = 'user';

    addUserButton.innerText = 'Add User';
    editMode = false;
    seeList();
}

function editButtonFunction(editButton: HTMLButtonElement) {
    const closestLi = editButton.closest('li');
    const oL = Array.from(closestLi!.parentElement!.children);
    const indx = oL.indexOf(closestLi!);
    nameInput.value = userData[indx].getName();
    emailInput.value = userData[indx].getEmail();
    // roleInput.value = userData[indx].getRole() ? 'user' : 'admin';
    if (userData[indx].getRole() == 'User') {
        roleInput.value = 'user';
    } else roleInput.value = 'admin';
    editMode = true;
    addUserButton.innerText = 'Update';
    editIndx = indx;
    editOL = oL;
}

function updateDataFunction() {
    userData[editIndx].updateName(nameInput.value);
    userData[editIndx].updateEmail(emailInput.value);
    let isUser = true;
    if (roleInput.value == 'admin') isUser = false;
    userData[editIndx].updateRole(isUser);
    const editListItem = editOL[editIndx];
    const pTags = editListItem.children;

    pTags[1].innerText = userData[editIndx].getName();
    pTags[2].innerText = userData[editIndx].getEmail();
    pTags[3].innerText = userData[editIndx].getRole();

    addUserButton.innerText = 'Add User';
    editMode = false;

    nameInput.value = '';
    emailInput.value = '';
    roleInput.value = 'user';
    seeList();
}

function seeList() {
    for (let elem of userData) {
        console.log(elem);
    }
}
