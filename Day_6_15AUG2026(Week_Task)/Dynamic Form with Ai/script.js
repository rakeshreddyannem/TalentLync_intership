const form = document.getElementById("registrationForm");

const status = document.getElementById("status");
const branch = document.getElementById("branch");
const internship = document.getElementById("internship");

const studentFields = document.getElementById("studentFields");
const professionalFields = document.getElementById("professionalFields");

const branchFields = document.getElementById("branchFields");
const branchTitle = document.getElementById("branchTitle");
const branchOptions = document.getElementById("branchOptions");

const internshipFields = document.getElementById("internshipFields");
const internshipTitle = document.getElementById("internshipTitle");
const internshipOptions = document.getElementById("internshipOptions");

const dob = document.getElementById("dob");
const age = document.getElementById("age");
const ageDisplay = document.getElementById("ageDisplay");

const password = document.getElementById("password");
const passwordBar = document.getElementById("passwordBar");
const passwordText = document.getElementById("passwordText");

const skillLevel = document.getElementById("skillLevel");
const skillValue = document.getElementById("skillValue");

const requirements = document.getElementById("requirements");
const count = document.getElementById("count");

const message = document.getElementById("message");

// -----------------------------
// Future DOB restriction
// -----------------------------
const today = new Date();
const todayString =
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

dob.max = todayString;

// -----------------------------
// Dynamic Student / Professional
// -----------------------------
status.addEventListener("change", () => {
    studentFields.classList.add("hidden");
    professionalFields.classList.add("hidden");

    clearRequired(studentFields);
    clearRequired(professionalFields);

    if (status.value === "student") {
        studentFields.classList.remove("hidden");
        setRequired(studentFields, ["college", "year", "cgpa"]);
    }

    if (status.value === "professional") {
        professionalFields.classList.remove("hidden");
        setRequired(professionalFields, ["company", "experience", "role"]);
    }
});

// -----------------------------
// Dynamic branch fields
// -----------------------------
const branchData = {
    CSE: {
        title: "CSE Skills",
        options: ["C++", "Java", "Python", "JavaScript", "SQL", "DSA"]
    },
    EEE: {
        title: "EEE Subjects / Skills",
        options: ["Power Systems", "Electrical Machines", "Control Systems", "MATLAB", "PLC"]
    },
    ECE: {
        title: "ECE Skills",
        options: ["Digital Electronics", "Microcontrollers", "VLSI", "Communication", "Embedded Systems"]
    },
    ME: {
        title: "Mechanical Skills",
        options: ["AutoCAD", "SolidWorks", "Thermodynamics", "Manufacturing", "CAD/CAM"]
    },
    CE: {
        title: "Civil Skills",
        options: ["AutoCAD", "Structural Design", "Surveying", "Construction", "STAAD Pro"]
    }
};

branch.addEventListener("change", () => {
    const data = branchData[branch.value];

    branchOptions.innerHTML = "";

    if (!data) {
        branchFields.classList.add("hidden");
        return;
    }

    branchTitle.textContent = data.title;

    const group = document.createElement("div");
    group.className = "option-group";

    data.options.forEach((option, index) => {
        const label = document.createElement("label");
        const input = document.createElement("input");

        input.type = "checkbox";
        input.name = "branchSkills";
        input.value = option;
        input.id = `branchSkill${index}`;

        label.htmlFor = input.id;
        label.append(input, document.createTextNode(option));

        group.appendChild(label);
    });

    branchOptions.appendChild(group);
    branchFields.classList.remove("hidden");
});

// -----------------------------
// Dynamic internship fields
// -----------------------------
const internshipData = {
    software: {
        title: "Software Development Details",
        fields: [
            { label: "Preferred Technology", type: "text", name: "softwareTechnology", placeholder: "e.g. MERN, Java, C++" },
            { label: "Projects Completed", type: "number", name: "softwareProjects", min: "0", max: "50" }
        ]
    },
    hardware: {
        title: "Hardware Details",
        fields: [
            { label: "Hardware Experience", type: "text", name: "hardwareExperience", placeholder: "e.g. Arduino, ESP32" },
            { label: "Projects Completed", type: "number", name: "hardwareProjects", min: "0", max: "50" }
        ]
    },
    data: {
        title: "Data Science / AI Details",
        fields: [
            { label: "Preferred AI Tool", type: "text", name: "aiTool", placeholder: "e.g. Python, MATLAB" },
            { label: "ML Experience Level", type: "range", name: "mlLevel", min: "1", max: "10", value: "5" }
        ]
    },
    embedded: {
        title: "Embedded Systems Details",
        fields: [
            { label: "Microcontroller Experience", type: "text", name: "microcontroller", placeholder: "e.g. Arduino, ESP32, MSP430" },
            { label: "Embedded Projects", type: "number", name: "embeddedProjects", min: "0", max: "50" }
        ]
    }
};

internship.addEventListener("change", () => {
    const data = internshipData[internship.value];

    internshipOptions.innerHTML = "";

    if (!data) {
        internshipFields.classList.add("hidden");
        return;
    }

    internshipTitle.textContent = data.title;

    const grid = document.createElement("div");
    grid.className = "grid";

    data.fields.forEach(field => {
        const wrapper = document.createElement("div");
        wrapper.className = "field";

        const label = document.createElement("label");
        label.textContent = field.label;
        label.htmlFor = field.name;

        const input = document.createElement("input");
        input.type = field.type;
        input.name = field.name;
        input.id = field.name;

        if (field.placeholder) input.placeholder = field.placeholder;
        if (field.min) input.min = field.min;
        if (field.max) input.max = field.max;
        if (field.value) input.value = field.value;

        wrapper.append(label, input);
        grid.appendChild(wrapper);
    });

    internshipOptions.appendChild(grid);
    internshipFields.classList.remove("hidden");
});

// -----------------------------
// DOB -> Age
// -----------------------------
dob.addEventListener("change", () => {
    if (!dob.value) return;

    const birth = new Date(`${dob.value}T00:00:00`);
    const now = new Date();

    let years = now.getFullYear() - birth.getFullYear();
    const month = now.getMonth() - birth.getMonth();

    if (month < 0 || (month === 0 && now.getDate() < birth.getDate())) {
        years--;
    }

    age.value = years;
    ageDisplay.textContent = `Calculated age: ${years} years`;
});

// -----------------------------
// Password strength
// -----------------------------
password.addEventListener("input", () => {
    const value = password.value;
    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    passwordBar.style.width = `${score * 25}%`;

    const messages = [
        "Password strength",
        "Weak",
        "Fair",
        "Good",
        "Strong"
    ];

    passwordText.textContent = messages[score];
});

// -----------------------------
// Range value
// -----------------------------
skillLevel.addEventListener("input", () => {
    skillValue.textContent = skillLevel.value;
});

// -----------------------------
// Character counter
// -----------------------------
requirements.addEventListener("input", () => {
    count.textContent = requirements.value.length;
});

// -----------------------------
// Form submit
// -----------------------------
form.addEventListener("submit", (event) => {
    event.preventDefault();

    message.className = "message";

    if (!form.checkValidity()) {
        form.reportValidity();
        message.textContent = "Please complete all required fields correctly.";
        message.classList.add("error");
        return;
    }

    if (Number(age.value) < 18 || Number(age.value) > 30) {
        message.textContent = "Age must be between 18 and 30.";
        message.classList.add("error");
        return;
    }

    message.textContent = "Registration completed successfully!";
    message.classList.add("success");
});

// -----------------------------
// Reset dynamic form
// -----------------------------
form.addEventListener("reset", () => {
    setTimeout(() => {
        studentFields.classList.add("hidden");
        professionalFields.classList.add("hidden");
        branchFields.classList.add("hidden");
        internshipFields.classList.add("hidden");

        branchOptions.innerHTML = "";
        internshipOptions.innerHTML = "";

        age.value = "";
        ageDisplay.textContent = "";
        passwordBar.style.width = "0%";
        passwordText.textContent = "Password strength";
        skillValue.textContent = "5";
        count.textContent = "0";

        message.className = "message";
    }, 0);
});

// -----------------------------
// Helper functions
// -----------------------------
function setRequired(container, ids) {
    ids.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.required = true;
    });
}

function clearRequired(container) {
    container.querySelectorAll("input, select, textarea").forEach(element => {
        element.required = false;
        element.value = "";
    });
}
