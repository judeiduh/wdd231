
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

function createCourseCard(filteredCourses) {
    const courseSection = document.querySelector(".certificate");

    const existingLists = courseSection.querySelectorAll(".course-list");
    existingLists.forEach(list => list.remove());
    const existingTotals = courseSection.querySelectorAll(".credit-totals");
    existingTotals.forEach(total => total.remove());

    if (filteredCourses.length === 0) return;

    const completedCredits = filteredCourses.reduce((sum, course) => course.completed ? sum + course.credits : sum, 0);
    const remainingCredits = filteredCourses.reduce((sum, course) => !course.completed ? sum + course.credits : sum, 0);

    const courseList = document.createElement("div");
    courseList.setAttribute("class", "course-list");

    filteredCourses.forEach(course => {
        let courseCard = document.createElement("section");
        let courseTitle = document.createElement("h3");
        

        courseCard.setAttribute("class", "course-card");
        courseTitle.innerHTML = `${course.subject} ${course.number}`;

        if (course.completed) {
            courseCard.setAttribute("id", "completed");
            courseTitle.innerHTML += `   &#10003`;
        };

        courseCard.appendChild(courseTitle);
        courseList.appendChild(courseCard);

        let cardDialog = displayCourseDetails(course);
        document.body.appendChild(cardDialog);

        courseCard.addEventListener("click", () => {
            cardDialog.showModal();
        });

        const closeButton = cardDialog.querySelector("#closeModal");
        closeButton.addEventListener("click", () => {
            cardDialog.close();
        })
    });

    const creditTotals = document.createElement("p");
    creditTotals.setAttribute("class", "credit-totals");
    creditTotals.innerHTML = `Completed: ${completedCredits} credits, Remaining: ${remainingCredits} credits`;

    courseSection.appendChild(courseList);
    courseSection.appendChild(creditTotals);
};

function setActiveFilter(activeId) {
    const filterButtons = document.querySelectorAll(".courseFilter a");
    filterButtons.forEach(button => {
        if (button.id === activeId) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
};

document.querySelector("#all").addEventListener("click", (e) => {
    e.preventDefault();
    createCourseCard(courses);
    setActiveFilter("all");
});

document.querySelector("#wdd").addEventListener("click", (e) => {
    e.preventDefault();
    createCourseCard(courses.filter(course => course.subject === "WDD"));
    setActiveFilter("wdd");
});

document.querySelector("#cse").addEventListener("click", (e) => {
    e.preventDefault();
    createCourseCard(courses.filter(course => course.subject === "CSE"));
    setActiveFilter("cse");
});

function displayCourseDetails(course) {
    let cardDialog = document.createElement("dialog");
    let dialTitle = document.createElement("h2");
    let closeButton = document.createElement("button");
    let dialName = document.createElement("h3");
    let dialCredit = document.createElement("p");
    let dialCertificate = document.createElement("p");
    let dialDescription = document.createElement("p");
    let dialTech = document.createElement("p");

    cardDialog.setAttribute("id", `course-details-${course.subject}-${course.number}`);
    dialTitle.innerHTML = `${course.subject} ${course.number}`;
    closeButton.setAttribute("id", "closeModal");
    closeButton.textContent = "✖";
    dialName.innerHTML = `${course.title}`;
    dialCredit.innerHTML = `<strong>Credits:</strong> ${course.credits}`;
    dialCertificate.innerHTML = `<strong>Certificate:</strong> ${course.certificate}`;
    dialDescription.innerHTML = `${course.description}`;
    dialTech.innerHTML = `<strong>Technology:</strong> ${course.technology.join(", ")}`;

    cardDialog.appendChild(dialTitle);
    cardDialog.appendChild(closeButton);
    cardDialog.appendChild(dialName);
    cardDialog.appendChild(dialCredit);
    cardDialog.appendChild(dialCertificate);
    cardDialog.appendChild(dialDescription);
    cardDialog.appendChild(dialTech);
    return cardDialog
}

createCourseCard(courses);
setActiveFilter("all");
