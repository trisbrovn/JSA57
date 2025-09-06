// Khai báo một biến String và thực hiện các thao tác như nối chuỗi, cắt chuỗi (substring),
// và tìm độ dài của chuỗi.
// khai bao
let fullName = "ABC";
// noi chuoi
fullName += " MNO";
// substring
const firstName = fullName.slice(0, 3);
console.log(fullName);
console.log(firstName);
console.log(fullName.substring(0, 3));

// Nhập vào một chuỗi từ người dùng, sau đó in ra chuỗi đó đã được in hoa.
// input
const input = prompt("Name: ");
// alert(input.trim()? input.toUpperCase() : "Chua dien ten");
alert(input.trim().toUpperCase() || "Chua dien ten");

// Khai báo một biến chứa tên người dùng (String) và tuổi (Number),
// sau đó in ra thông báo dạng: "Tên bạn là X và bạn Y tuổi."
let name = "Dang Hoang Long";
let age1 = 14;
const result = `Tên bạn là ${name} và bạn ${age1} tuổi.`; // template string
console.log(result);

// Tạo một chương trình nhận vào một câu từ người dùng,
// đếm số ký tự trong câu và in ra độ dài của câu đó.
const sentence = prompt("Viet cau");
console.log("Do dai cau", sentence.length);
console.log("Tu", sentence.split(" ").length);

// Sử dụng hàm prompt("…”); cho phép người dùng nhập dữ liệu từ bàn phím.