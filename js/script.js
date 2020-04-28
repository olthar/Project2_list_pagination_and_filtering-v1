/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
const li = document.querySelector('.student-list');
const studentsPerPage = 10;

// function to hide students except for the selected page
function showPage(page, list){
   for (let i=0; i<list.length;i+=1){
      const student = list[i]
      if (i >= (page * studentsPerPage)-studentsPerPage  && i < page * studentsPerPage) {
         student.style.display = '';
         } else {
            student.style.display = 'none';
         }
   }      
}
//following two functions are used to create an append elements to certain parts of the DOM
function createElement(elementName, property, value){
   const element = document.createElement(elementName);
   element[property] = value;
   return element;
}
function appendTo(elementName, property, value, appendTo) {
   const element = createElement(elementName, property, value);
   appendTo.appendChild(element);
   return element;
}
// funcation that removes pagination links not needed
function removePagination(){
   const pagination = pageDiv.querySelector('.pagination');
   if (pagination !== null){
      pageDiv.removeChild(pagination)};  
   }
// function that creates and appends functioning pagination links
function appendPageLinks(list){
   removePagination();
   const div = appendTo('div', 'className', 'pagination', pageDiv);
   const ul = appendTo('ul','','', div)
   let pageNumber = 0;
   for (let i = 0;i<list.length;i+=studentsPerPage){ 
      pageNumber =(i/studentsPerPage)+1;
      const liPage = appendTo('li','','', ul);
      const a = appendTo('a', "textContent", pageNumber, liPage);
      a.href = '#';
   }
   ul.firstElementChild.firstElementChild.className = "active";
}
// Function to search for students from the search input. creates a list and hides students not on list. 
function showSearch(text){
   const list = li.children;
   let searchList = [];
   let totalFound = 0
   for (let i=0; i<list.length;i+=1){
      const student = list[i]
      const studentName = student.querySelector('h3').textContent;
      if (text == studentName || studentName.includes(text)){
         totalFound += 1;
         searchList.push(student);
      } else {student.style.display = 'none';}
   }
   // Let user know there are no results of their current search
   if (totalFound < 1){
      removePagination();
      negativeSearchDisplay.textContent = `No Students were found containing: ${text}`;
   // Else send the results to the showPage function and get new page numbers. 
   } else {
      showPage(1,searchList);
      appendPageLinks(searchList);
      negativeSearchDisplay.textContent = "";
   }
   showAllButton.style.display = '',
   currentSearchList = searchList;
}
// Create Search and buttons
const pageDiv = li.parentNode;
let currentSearchList = li.children;
const search = appendTo('form', 'className', 'student-search', pageDiv.firstElementChild);
const input = appendTo('input', 'textContent', 'search', search);
appendTo('button', 'textContent', 'search', search);
const showAllButton = appendTo('button', 'textContent', 'all', search);
showAllButton.style.display = 'none';
let negativeSearchDisplay = appendTo('h1', 'id', `NegativeSearch`, pageDiv);

// Calling functions to show initail page 1 of students. 
showPage(1, li.children);
// Calling append page links function to assign the page numbers. 
appendPageLinks(li.children);

// reassign active page number and show those students using the showPage function. 
// Did not use a loop to reassign the "active" className
pageDiv.addEventListener('click', (event) => {
const active = pageDiv.querySelector('.active')
   if (event.target.tagName == 'A') {
     if (event.target.className !== 'active') {
         const newActive = event.target
         active.className = '';
         newActive.className = 'active';
         showPage(newActive.textContent, currentSearchList);
     }
   }
})  
// Listen for search
search.addEventListener('keyup',(e) => {
   e.preventDefault();
   const text = input.value;
   //  if deleting the search, when input is empty it refreshes page back to 1
   if (text === ''){
      location.reload();
   } else {showSearch(text);}
});
// Listen for search button and show all students when All button is clicked
search.addEventListener('click', (e) => {
   if(e.target.tagName === 'BUTTON'){
      if (event.target.textContent == 'search') { 
      text = input.value;
      showSearch(text);
      } else if(e.target.textContent === 'all'){
               location.reload();
           }
   }
});