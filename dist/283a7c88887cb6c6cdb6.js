import './styles.css';
class Semester {
    constructor(coursename, credit, grade) {
      this.coursename = coursename;
      this.credit = credit;
      this.grade = grade;
    }
  
    gradePoint() {
      switch (this.grade.toUpperCase()) {
        case 'A': return 4.0;
        case 'B': return 3.0;
        case 'C': return 2.0;
        case 'D': return 1.0;
        case 'F': return 0;
        default: return 0;
      }
    }
  }
  
  class Field {
    constructor(fieldname, years, semesterCount) {
      this.fieldname = fieldname;
      this.years = parseInt(years, 10);
      this.semesterCount = parseInt(semesterCount, 10);
      this.semesters = [];
    }
  
    addSemester(semester) {
      this.semesters.push(semester);
    }
  
    calculateCGPA() {
      let totalCredits = 0;
      let totalPoints = 0;
  
      this.semesters.forEach(semester => {
        semester.courses.forEach(course => {
          totalCredits += course.credit;
          totalPoints += course.credit * course.gradePoint();
        });
      });
  
      return totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0;
    }
  }
  
  class SemesterDetails {
    constructor() {
      this.courses = [];
    }
  
    addCourse(course) {
      this.courses.push(course);
    }
  
    calculateGPA() {
      let totalCredits = 0;
      let totalPoints = 0;
  
      this.courses.forEach(course => {
        totalCredits += course.credit;
        totalPoints += course.credit * course.gradePoint();
      });
  
      return totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0;
    }
  }
  
  const fields = [];
  let currentField = null;
  let currentYear = null;
  let currentSemester = null;
  
  // Event listener for 'Add Field' button
  document.querySelector(".add-field").addEventListener("click", () => {
    document.querySelector(".addfield").showModal();
  });
  
  // Event listener for 'Create Field' button
  document.querySelector(".create-field").addEventListener("click", () => {
    const fieldname = document.querySelector(".fname").value;
    const years = document.querySelector(".year").value;
    const semesters = document.querySelector(".sem").value;
  
    const field = new Field(fieldname, years, semesters);
    fields.push(field);
  
    renderFields();
   const addf = document.querySelector(".addfield")
   addf.close();
  });
  
  // Function to render all fields
  function renderFields() {
    
    const main = document.querySelector(".main");
    main.innerHTML = '';
   
   const box = document.createElement('div');
   box.style.border = '1px solid #13293d';
   box.style.borderRadius = '10px';
   box.style.padding = '20px';
   box.style.margin = '50px';
   box.style.position = 'relative';

   const table = document.createElement('table');
   table.style.width = '100%';
   table.style.borderCollapse = 'collapse';
   table.style.marginBottom = '20px';

   const headerRow = document.createElement('tr');
   const finame = document.createElement('th');
   const seme = document.createElement('th');
   const years = document.createElement('th');
   const actions = document.createElement('th');

   finame.textContent = 'Field Name';
   
   finame.style.textAlign = 'left';
   finame.style.borderBottom = '1px solid #13293d';
   finame.style.padding = '10px';


   years.textContent = 'Year';
   years.style.textAlign = 'left';
   years.style.borderBottom = '1px solid #13293d';
   years.style.padding = '10px';

   seme.textContent = 'Semester';
   seme.style.textAlign = 'left';
   seme.style.borderBottom = '1px solid #13293d';
   seme.style.padding = '10px';

   actions.textContent = 'Actions';
   actions.style.textAlign = 'left';
   actions.style.borderBottom = '1px solid #13293d';
   actions.style.padding = '10px';

   headerRow.appendChild(finame);
   headerRow.appendChild(years);
   headerRow.appendChild(seme);
   headerRow.appendChild(actions);

   table.appendChild(headerRow);
   

   const row = document.createElement('tr');

    fields.forEach(field => {

        const fieldCell = document.createElement('td');
        fieldCell.textContent = field.fieldname;
        fieldCell.style.padding = '10px';
        fieldCell.style.borderBottom = '1px solid #13293d';
        fieldCell.style.cursor = 'pointer';

        fieldCell.addEventListener('click', () => {
            displayFieldInfo(field);
        });


        const yearCell = document.createElement('td');
        yearCell.textContent = field.years;
        yearCell.style.padding = '10px';
        yearCell.style.borderBottom = '1px solid #13293d';

        const semesterCell = document.createElement('td');
        semesterCell.textContent = field.semesterCount;
        semesterCell.style.padding = '10px';
        semesterCell.style.borderBottom = '1px solid #13293d';

        const actionCell = document.createElement('td');
        actionCell.textContent = 'buttons';
        actionCell.style.padding = '10px';
        actionCell.style.borderBottom = '1px solid #13293d'; 
        
       row.appendChild(fieldCell);
       row.appendChild(yearCell);
       row.appendChild(semesterCell);
       row.appendChild(actionCell);
      
  
      table.appendChild(row);
    });

    box.appendChild(table);

    main.appendChild(box);
    //but = '<button class="add-field">Add Field</button>'; 
    //main.appendChild(but);
  }
  
  // Function to display detailed information for a field
  function displayFieldInfo(field) {
    const main = document.querySelector(".main");
    main.innerHTML = ""; // Clear main content
  
  
    for (let year = 1; year <= field.years; year++) {
        const box = document.createElement('div');
        box.style.border = '1px solid #13293d';
        box.style.borderRadius = '10px';
        box.style.padding = '20px';
        box.style.margin = '50px';
        box.style.position = 'relative';
     
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginBottom = '20px';

      const yearRow = document.createElement('tr');
        yearRow.style.padding = '10px';
        yearRow.style.borderBottom = '1px solid #13293d';
        yearRow.style.cursor = 'pointer';
      const yearCell = document.createElement('td');
      yearCell.textContent = `Year ${year}`;
      yearRow.appendChild(yearCell);
  
      
  
      table.appendChild(yearRow);
      
      const semestersPerYear = Math.floor(field.semesterCount / field.years);
      for (let sem = 1; sem <= semestersPerYear; sem++) {
        const semesterRow = document.createElement('tr');
        semesterRow.style.padding = '10px';
        semesterRow.style.borderBottom = '1px solid #13293d';
        semesterRow.style.cursor = 'pointer';
        const semesterCell = document.createElement('td');
        semesterCell.textContent = `Semester ${sem}`;
  
        semesterCell.addEventListener('click', () => {
          displaySemesterInfo(field, year, sem);
        });

        
  
        semesterRow.appendChild(semesterCell);
        table.appendChild(semesterRow);
      }
      const cgpaCell = document.createElement('tr');
        cgpaCell.style.padding = '10px';
        cgpaCell.style.paddingTop = '40px';
        cgpaCell.style.textAlign = 'right';
      cgpaCell.textContent = `CGPA: ${field.calculateCGPA()}`;
      table.appendChild(cgpaCell);

      box.appendChild(table);
    main.appendChild(box);
    }
    
  }
  
  // Function to display detailed information for a semester
  function displaySemesterInfo(field, year, semester) {
    const main = document.querySelector(".main");
    main.innerHTML = ""; 
  
    const box = document.createElement('div');
    box.style.border = '1px solid #13293d';
    box.style.borderRadius = '10px';
    box.style.padding = '20px';
    box.style.margin = '50px';
    box.style.position = 'relative';
 
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginBottom = '20px';
 
    const headerRow = document.createElement('tr');
    const coursename = document.createElement('th');
    const credithours = document.createElement('th');
    const grade = document.createElement('th');
    const actions = document.createElement('th');
  
    const headers = ['Course Name', 'Credit Hours', 'Grade','Actions'];
    headers.forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      headerRow.appendChild(th);
    });
  
    table.appendChild(headerRow);
  
    // Retrieve or initialize the semester details
    const semesterDetails = field.semesters[semester - 1] || new SemesterDetails();
    field.semesters[semester - 1] = semesterDetails;
  
    semesterDetails.courses.forEach(course => {
      const row = document.createElement('tr');
  
      const courseCell = document.createElement('td');
      courseCell.textContent = course.coursename;
      courseCell.style.padding = '10px';
      courseCell.style.borderBottom = '1px solid #13293d';
     
      row.appendChild(courseCell);
  
      const creditCell = document.createElement('td');
      creditCell.textContent = course.credit;
      creditCell.style.padding = '10px';
      creditCell.style.borderBottom = '1px solid #13293d';
      row.appendChild(creditCell);
  
      const gradeCell = document.createElement('td');
      gradeCell.textContent = course.grade;
      gradeCell.style.padding = '10px';
      gradeCell.style.borderBottom = '1px solid #13293d';
      row.appendChild(gradeCell);

      const actionCell = document.createElement('td');
      actionCell.textContent = 'button';
      actionCell.style.padding = '10px';
      actionCell.style.borderBottom = '1px solid #13293d';
      row.appendChild(actionCell);
        
      table.appendChild(row);
    });
  
    const addCourseButton = document.createElement('button');
    addCourseButton.textContent = 'Add Course';
    addCourseButton.addEventListener('click', () => {
      document.querySelector('.addcourse').showModal();
      currentField = field;
      currentYear = year;
      currentSemester = semester;
    });
  
    const gpaText = document.createElement('p');
    gpaText.textContent = `Semester GPA: ${semesterDetails.calculateGPA()}`;
  
    box.appendChild(table);
    main.appendChild(box);
   
    main.appendChild(gpaText);
    main.appendChild(addCourseButton);
  }
  
  // Event listener for 'Add Course' button
  document.querySelector(".create-course").addEventListener("click", () => {
    const coursename = document.querySelector(".coursename").value;
    const credit = parseFloat(document.querySelector(".credit").value);
    const grade = document.querySelector(".grade").value;
  
    const course = new Semester(coursename, credit, grade);
  
    const semesterDetails = currentField.semesters[currentSemester - 1]; 
    semesterDetails.addCourse(course);
  
    document.querySelector('.addcourse').close();
    displaySemesterInfo(currentField, currentYear, currentSemester);
  });
  


/*
class Semester {
    constructor(coursename, credit, grade) {
        this.coursename = coursename;
        this.credit = credit;
        this.grade = grade;
    }
}

class Field {
    constructor(fieldname, year , semesterlength) {
        this.fieldname = fieldname;
        this.year = year;
        this.semesterlength = semesterlength;
        this.semester = [];
    }

    addSemester(semester){
        this.semester.push(semester);
    }
}



function addField(fname,year,sem) {
    const field = new Field(fname,year,sem);
}



const addbut = document.querySelector(".add-field");
const removebut = document.querySelector(".remove-field");
const main = document.querySelector(".main");
const field = document.querySelector(".addfield");
const create_field = document.querySelector(".create-field");

addbut.addEventListener("click", () => {

    field.showModal();  
});

create_field.addEventListener("click", () => {
    main.innerHTML = "";
    const fieldname = document.querySelector(".fname").value;
    const semester = document.querySelector(".sem").value;
    const year = document.querySelector(".year").value;

    addField(fieldname,semester,year);

    const box = document.createElement('div');
    box.style.border = '1px solid #13293d';
    box.style.borderRadius = '10px';
    box.style.padding = '20px';
    box.style.margin = '50px';
    box.style.position = 'relative';

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginBottom = '20px';

    const headerRow = document.createElement('tr');
    const finame = document.createElement('th');
    const seme = document.createElement('th');
    const years = document.createElement('th');
    const actions = document.createElement('th');

    finame.textContent = 'Field Name';
    
    finame.style.textAlign = 'left';
    finame.style.borderBottom = '1px solid #13293d';
    finame.style.padding = '10px';


    years.textContent = 'Year';
    years.style.textAlign = 'left';
    years.style.borderBottom = '1px solid #13293d';
    years.style.padding = '10px';

    seme.textContent = 'Semester';
    seme.style.textAlign = 'left';
    seme.style.borderBottom = '1px solid #13293d';
    seme.style.padding = '10px';

    actions.textContent = 'Actions';
    actions.style.textAlign = 'left';
    actions.style.borderBottom = '1px solid #13293d';
    actions.style.padding = '10px';

    headerRow.appendChild(finame);
    headerRow.appendChild(years);
    headerRow.appendChild(seme);
    headerRow.appendChild(actions);

    table.appendChild(headerRow);

    const row = document.createElement('tr');

        const fieldCell = document.createElement('td');
        fieldCell.textContent = fieldname;
        fieldCell.style.padding = '10px';
        fieldCell.style.borderBottom = '1px solid #13293d';
        fieldCell.style.cursor = 'pointer';

        fieldCell.addEventListener('click', () => {
            displayFieldInfo(fieldname);
        });

        const yearCell = document.createElement('td');
        yearCell.textContent = year;
        yearCell.style.padding = '10px';
        yearCell.style.borderBottom = '1px solid #13293d';

        const semesterCell = document.createElement('td');
        semesterCell.textContent = semester;
        semesterCell.style.padding = '10px';
        semesterCell.style.borderBottom = '1px solid #13293d';

        const actionCell = document.createElement('td');
        actionCell.textContent = 'buttons';
        actionCell.style.padding = '10px';
        actionCell.style.borderBottom = '1px solid #13293d'; 
        
       row.appendChild(fieldCell);
       row.appendChild(yearCell);
       row.appendChild(semesterCell);
       row.appendChild(actionCell);
       
       table.appendChild(row);

    box.appendChild(table);

    main.appendChild(box);
   
});

function displayFieldInfo(fieldname) {

}
*/