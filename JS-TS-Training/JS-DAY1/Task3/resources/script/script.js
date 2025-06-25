let studForm = document.querySelector('.form-container');
let studInput = document.getElementById('stud-name-input');
let gradeInput = document.getElementById('grade-input');
let addStudBtn = document.getElementById('add-stud-btn');
let dispGradeBtn = document.getElementById('disp-grade-btn');
let calcAvgBtn = document.getElementById('calc-avg-btn');
let gradeList = document.getElementById('grades-list');
let avgOut = document.getElementById('avg-out');

class Student {
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
    }
    getName() {
        return this.name;
    }
    getGrade() {
        return this.grade;
    }
}

let arrStuds = [];
let listCount = 0;

function studInputCheck() {
    if (studInput.value == '' || !isNaN(studInput.value)) {
        studInput.style.borderColor = 'rgb(218, 43, 43)';
        document.getElementById('name-err').style.opacity = '1';
        return false;
    } else {
        studInput.style.borderColor = '#d8d8d8';
        document.getElementById('name-err').style.opacity = '0';
        return true;
    }
}

studInput.addEventListener('blur', studInputCheck);

function gradeInputCheck() {
    if (gradeInput.value == '' || isNaN(gradeInput.value)) {
        gradeInput.style.borderColor = 'rgb(218, 43, 43)';
        document.getElementById('grade-err').style.opacity = '1';
        return false;
    } else if (gradeInput.value < 1 || gradeInput.value > 100) {
        gradeInput.style.borderColor = 'rgb(218, 43, 43)';
        document.getElementById('grade-err').style.opacity = '1';
        return false;
    } else {
        gradeInput.style.borderColor = '#d8d8d8';
        document.getElementById('grade-err').style.opacity = '0';
        return true;
    }
}

gradeInput.addEventListener('blur', gradeInputCheck);

addStudBtn.addEventListener('click', function(def) {
    def.preventDefault();
    
    if (!studInputCheck() || !gradeInputCheck()) return;

    for (let x = 0; x < arrStuds.length; x++) {
        if (arrStuds[x].getName() == studInput.value) {
            document.getElementById('name-err').innerText = "Student data already exist!";
            document.getElementById('name-err').style.opacity = '1';
            return;
        } else {
            document.getElementById('name-err').innerText = "Student name can't be empty or a number";
            document.getElementById('name-err').style.opacity = '0';
        }
    }

    const newStud = new Student(studInput.value, gradeInput.value);
    arrStuds.push(newStud); 

    if (listCount < arrStuds.length) {
        for (let x = listCount; x < arrStuds.length; x++) {
            let listItem = document.createElement('li');
            let studentData = arrStuds[x].getName() + ' - Grade: ' + arrStuds[x].getGrade();
            let data = document.createTextNode(studentData);
            listItem.append(data);
            gradeList.append(listItem);
            listCount++;
        }
    }
    studInput.value = '';
    gradeInput.value = '';
})

let toggle = 0;

dispGradeBtn.addEventListener('click', function(def){
    def.preventDefault();

    if (arrStuds.length == 0) return;

    let showList = document.querySelector('ol');
    if (toggle == 0) {
        showList.style.display = 'block';
        toggle = (toggle + 1) % 2;
    } else {
        showList.style.display = 'none';
        toggle = (toggle + 1) % 2;
    }
})

calcAvgBtn.addEventListener('click', function() {
    if (arrStuds.length == 0) return;
    
    let avg = 0;
    for (let x = 0; x < arrStuds.length; x++) {
        avg += parseFloat(arrStuds[x].getGrade());
    }

    avg = avg / arrStuds.length;
    avgOut.textContent = avg.toFixed(2);
})
