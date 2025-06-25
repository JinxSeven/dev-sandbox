const prodNameInp = document.getElementById('prod-name-inp');
const prodPriceInp = document.getElementById('prod-price-inp');
const prodQuantInp = document.getElementById('prod-quant-inp');
const addProdBtn = document.getElementById('add-prod-btn');
const editModeInfo = document.getElementById('edit-mode-info');
const table = document.querySelector('table');
const form = document.querySelector('form');

class Product {
    #name;
    #price;
    #quant;
    constructor(name, price, quant) {
        this.#name = name;
        this.#price = price;
        this.#quant = quant;
    }
    getName() {
        return this.#name;
    }
    getPrice() {
        return this.#price;
    }
    getQuant() {
        return this.#quant;
    }
    updateName(updatedName) {
        this.#name = updatedName;
    }
    updatePrice(updatedPrice) {
        this.#price = updatedPrice;
    }
    updateQuant(updatedQuant) {
        this.#quant = updatedQuant;
    }
}

function prodNameInpCheck() {
    if (hasDuplicate(prodNameInp)) return;
    if (prodNameInp.value == '') {
        document.getElementById('prod-err').style.opacity = '1';
        prodNameInp.style.borderColor = 'rgb(218, 43, 43)';
        return false;
    } else {
        document.getElementById('prod-err').style.opacity = '0';
        prodNameInp.style.borderColor = '#d8d8d8';
        return true;
    }
}

prodNameInp.addEventListener('blur', prodNameInpCheck);

function prodPriceInpCheck() {
    if (prodPriceInp.value == '') {
        document.getElementById('price-err').style.opacity = '1';
        prodPriceInp.style.borderColor = 'rgb(218, 43, 43)';
        return false;
    } else {
        document.getElementById('price-err').style.opacity = '0';
        prodPriceInp.style.borderColor = '#d8d8d8';
        return true;
    }
}

prodPriceInp.addEventListener('blur', prodPriceInpCheck);

function prodQuantInpCheck() {
    const quantCheck = document.getElementById('quant-err');
    if (prodQuantInp.value == '') {
        console.log('error testing');
        quantCheck.style.opacity = '1';
        prodQuantInp.style.borderColor = 'rgb(218, 43, 43)';
        return false;
    } else {
        quantCheck.style.opacity = '0';
        prodQuantInp.style.borderColor = '#d8d8d8';
        return true;
    }
}

prodQuantInp.addEventListener('blur', prodQuantInpCheck);

let headRow = ['Product Name', 'Price', 'Quantity', '', ''];
let arrProd = [];
let rowCount = 0;
let modTog = 0;
let first = true;

function hasDuplicate(inp1) {
    for (let j = 0; j < arrProd.length; j++) {
        if (inp1.value == arrProd[j].getName()) {
            document.getElementById('prod-err').innerText = 'Product already exist!';
            document.getElementById('prod-err').style.opacity = '1';
            prodNameInp.style.borderColor = 'rgb(218, 43, 43)';
            return true;
        } 
    }
    document.getElementById('prod-err').style.opacity = '0';
    document.getElementById('prod-err').innerText = "Product name can't be empty!";
    prodNameInp.style.borderColor = '#d8d8d8';
    return false
}

function isDuplicate(inp1, inp2) {
    for (let j = 0; j < arrProd.length; j++) {
        if (inp1.value == arrProd[j].getName()) {
            // && + inp2.value == (arrProd[j].getPrice()).substring(1)
            editModeInfo.innerText = 'Product already exist!';
            editModeInfo.style.opacity = 1;
            return true;
        }
    }
    editModeInfo.innerText = 'Edit mode is On!';
    editModeInfo.style.opacity = 0;
    return false;
}

function isDuplicateToo(inp1, inp2, indx) {
    for (let j = 0; j < arrProd.length; j++) {
        if (j == indx) continue;
        if (inp1.value == arrProd[j].getName()) {
            // && inp2.value == (arrProd[j].getPrice())
            editModeInfo.innerText = 'Product already exist!';
            editModeInfo.style.opacity = 1;
            return true;
        }
    }
    editModeInfo.innerText = 'Edit mode is On!';
    editModeInfo.style.opacity = 0;
    return false;
}

addProdBtn.addEventListener('click', function(def) {
    def.preventDefault();

    if (!prodNameInpCheck() || !prodPriceInpCheck() || !prodQuantInpCheck()) return;

    if (first) {
        let tableRow = document.createElement('tr');
        for (let x = 0; x < headRow.length; x++) {
            let tableHead = document.createElement('th');
            tableHead.innerText = headRow[x];
            tableRow.append(tableHead);
        }
        table.append(tableRow);
        first = false;
    }

    if (isDuplicate(prodNameInp, prodPriceInp)) return;

    let newProd = new Product(prodNameInp.value, '$' + prodPriceInp.value, prodQuantInp.value);
    arrProd.push(newProd);

    const tableRow = document.createElement('tr');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');

    let data = [];

    data.push(newProd.getName());
    data.push(newProd.getPrice());
    data.push(newProd.getQuant());

    for (let i = 0; i < data.length + 2; i++) {
        const tableData = document.createElement('td');
        if (i == 3) {
            deleteBtn.setAttribute('class', 'delete-btn');
            deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
            tableData.append(deleteBtn);
            tableRow.append(tableData);
            continue;
        } else if (i == 4) {
            editBtn.setAttribute('class', 'edit-btn');
            editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
            tableData.append(editBtn);
            tableRow.append(tableData);
            continue;
        }
        const input = document.createElement('input');
        input.value = data[i];
        input.setAttribute('class', 'edit-data');
        input.setAttribute('readonly', 'true');
        tableData.append(input);
        tableRow.append(tableData);
    }
    table.append(tableRow);

    deleteBtn.addEventListener('click', deleteFun);
    editBtn.addEventListener('click', function() {
        editFun(editBtn);
    })

    form.reset();
})

function deleteFun(event) {
    const closestTr = event.target.closest('tr');
    arrProd.splice(closestTr.rowIndex - 1, 1);
    table.removeChild(closestTr);
}

function editFun(editBtn) {
    const closestTr = editBtn.closest('tr');
    const inputs = closestTr.querySelectorAll('input');

    if (modTog == 0) {
        inputs.forEach(input => {
            input.removeAttribute('readonly');
        });
        modTog = (modTog + 1) % 2;
        editBtn.innerHTML = `<i class="fa-solid fa-floppy-disk"></i>`;
        inputs[0].focus();
        editModeInfo.style.opacity = 1;
    } else {
        inputs.forEach(input => {
            input.setAttribute('readonly', 'true');
        });
        modTog = (modTog + 1) % 2;
        editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
        editModeInfo.style.opacity = 0;
        saveFun(editBtn);
    }
}

function saveFun(editBtn) {
    const closestTr = editBtn.closest('tr');
    const closestInps = closestTr.querySelectorAll('input');

    if (closestInps[0].value == '') {
        closestInps[0].value = arrProd[closestTr.rowIndex - 1].getName();
    }
    if (closestInps[1].value == '') {
        closestInps[1].value = arrProd[closestTr.rowIndex - 1].getPrice();
    }
    if (closestInps[2].value == '') {
        closestInps[2].value = arrProd[closestTr.rowIndex - 1].getQuant();
    }

    console.log(closestTr.rowIndex - 1);

    if (isDuplicateToo(closestInps[0], closestInps[1], closestTr.rowIndex - 1)) {
        editFun(editBtn);
        return;
    }

    for (let x = 0; x < closestInps.length; x++) {
        if (x == 0) {
            arrProd[closestTr.rowIndex - 1].updateName(closestInps[x].value);
        } else if (x == 1) {
            arrProd[closestTr.rowIndex - 1].updatePrice(closestInps[x].value);
        } else {
            arrProd[closestTr.rowIndex - 1].updateQuant(closestInps[x].value);
        }
    }

    for (let jin of arrProd) {
        console.log(jin);
    }
}
