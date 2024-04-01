const numSubjectsInput = document.getElementById('num-subjects');
const subjectForm = document.getElementById('subject-form');
const subjectMarksSection = document.getElementById('subject-marks');
const marksForm = document.getElementById('marks-form');
const calculateButton = document.getElementById('calculate-button');
const resultsDiv = document.getElementById('results');
const averageMarkParagraph = document.getElementById('average-mark');
const feedbackParagraph = document.getElementById('feedback');

let subjectCount = 0; // Keeps track of the number of subjects entered

subjectForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  subjectCount = parseInt(numSubjectsInput.value);

  // Clear any previous subject and mark inputs
  marksForm.innerHTML = '';

  createSubjectMarkInputs(subjectCount);

  subjectMarksSection.style.display = 'block'; // Show hidden section
});

function createSubjectMarkInputs(numSubjects) {
  let formContent = '';
  for (let i = 1; i <= numSubjects; i++) {
    formContent += `
      <label for="subject-${i}">Subject ${i}:</label>
      <input type="text" id="subject-${i}" name="subject-${i}" required>
      <label for="mark-${i}">Mark (out of 100):</label>
      <input type="number" id="mark-${i}" name="mark-${i}" min="0" max="100" required>
      <br>
    `;
  }

  marksForm.innerHTML = formContent; // Add dynamic content to form
}

calculateButton.addEventListener('click', function() {
  const subjectInputs = marksForm.querySelectorAll('input[type="text"]');
  const markInputs = marksForm.querySelectorAll('input[type="number"]');

  if (!subjectInputs.length) {
    alert('Please enter the number of subjects and click "Let\'s Go!" before calculating.');
    return; // Prevent further processing if no subjects are entered
  }

  let totalMarks = 0;
  let highestMark = 0;
  let highestMarkSubject = "";
  let lowestMark = 100;
  let lowestMarkSubject = "";

  for (let i = 0; i < subjectInputs.length; i++) {
    const mark = parseInt(markInputs[i].value);
    totalMarks += mark;

    if (mark > highestMark) {
      highestMark = mark;
      highestMarkSubject = subjectInputs[i].value;
    }

    if (mark < lowestMark) {
      lowestMark = mark;
      lowestMarkSubject = subjectInputs[i].value;
    }
  }

  const averageMark = totalMarks / subjectInputs.length;

  averageMarkParagraph.textContent = `Your average mark is: ${averageMark.toFixed(1)}`;

  let feedback = "";
  if (averageMark >= 70) {
    feedback = "Congratulations! You're doing well overall.";
  } else {
    feedback = "Keep working hard! You can improve your average by focusing on ";
    if (lowestMarkSubject) {
      feedback += `${lowestMarkSubject} (scored ${lowestMark})`;
    } else {
      feedback += "several subjects.";
    }
  }

  feedbackParagraph.textContent = feedback;

  resultsDiv.style.display = 'block'; // Show results after calculation
});
