const students = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "David" },
  { id: 5, name: "Emma" },
  { id: 6, name: "Frank" },
  { id: 7, name: "Grace" },
  { id: 8, name: "Henry" },
  { id: 9, name: "Ivy" },
  { id: 10, name: "Jack" }
];

// ------------------------
// render students
function renderStudents() {
  const listContainer = document.getElementById("student-list");
  listContainer.innerHTML = ""; // xoa het noi dung cu
  // chay vong lap va tao the li (string)
  const listItemsHTMl = students.map(function (s){
    return `<li data-id="${
      s.id
    }">${JSON.stringify(s)} <button>Edit</button> <button>Del</button></li>`;
  }); // danh sach

  // chuyen sang string ->gan vao ul
  listContainer.innerHTML = listItemsHTMl.join("");
}

// ------------------------------
// add student
function addStudent(name) {
  // tao moi id (chi ap dung voi list da duoc sap xep theo id tang dan)
  const newId = students[students.length - 1].id + 1;
  const newStudent = { id: newId, name: name};
  // add vao array
  students.push(newStudent);
  // ghi tiep vao UI
  const listContainer = document.getElementById("student-list");
  listContainer.innerHTML += `<li data-id="${newId}">${JSON.stringify(
  newStudent
)} <button>Edit</button> <button>Del</button></li`;
}

// bat su kien ho form add
document.getElementById("add-student").addEventListener("submit", function (e) {
  e.preventDefault(); // chan su kien mac dinh
  const nameInput = document.getElementById("studnet-name").ariaValueMax.trim();
  // add student
  addStudent(nameInput);
  // reset form (xoa du lieu trong input)
  this.reset(); // muốn dùng this -> dùng hàm thường để có thể lưu ngữ cảnh
});

// ------------------------------
// edit student by id
const editStudentById = (id) => {
  // cho nguoi dung nhap ten moi voi prompt
  const newName = prompt("Enter new name:");
  if (newName) {
    // thay doi du lieu cua object trong array
    const student = students.find((s) => s.id === id); // tim doi tuong can sua
    if (student) {
      student.name = newName; // sua du lieu
      // cap nhat lai UI
      document.querySelector(
        `li[data-id="${id}"]`
      ).innerHTML = `${JSON.stringify(
        student
      )}  <button>Edit</button> <button>Del</button>`;
    }
  }
};

// -------------------------------
// delete student by id
const deleteStudentById = (id) => {
  // xoa trong array
  const index = students.findIndex((s) => s.id === id); // tim vi tri dung cua phan tu
  if (index !== -1) {
    students.splice(index, 1); // xoa phan tu tai vi tri index
    // xoa trong UI
    const liToDel = document.querySelector(`li[data-id="${id}"]`);
    if (liToDel) {
      liToDel.remove(); // xoa the li khoi UI
    }
  }
};


// -------------------------------
// main
document.addEventListener("DOMContentLoaded", function () {
  renderStudents();
});

// bat su kien cho button edit + del
document.getElementById("student-list").addEventListener("click", function (e) {
  // kiem tra bam vao nut edit
  if (e.target.tagName === "BUTTON") {
    // lay id tu thuoc tinh data-id cua the li cha
    const studentId = e.target.closest("li").dataset.id;
    const id = parseInt(studentId); // chuyen ve so
    if (e.target.textContent === "Edit") {
      // edit
      editStudentById(id);
    } else if (e.target.textContent === "Del") {
      // del
      deleteStudentById(id);
    }
  }
});