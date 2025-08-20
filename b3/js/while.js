// // while (VONG LAP VO HAN) -----------------------
// console.group("Vong lap while");
// console.log("while (dieu kien) -> lap lai cho den khi dieu kien SAI");
// // lap cho den khi nguoi dung dien dung thong tin
// var account = { username: "1", password: "1" };
// var infoInp = "";
// while (infoInp == "") {
//   infoInp = prompt("Username, Password: ").trim();
//   try {
//     console.log(infoInp.split(","));
//     const usernameInp = infoInp.split(",")[0].trim();
//     const passwordInp = infoInp.split(",")[1].trim();
//     if (usernameInp != account.username) {
//       alert("Sai username");
//       infoInp = "";
//     } else if (passwordInp != account.password) {
//       alert("Sai password");
//       infoInp = "";
//     } else {
//       const isOk = confirm(
//         `Login:\nusername: ${usernameInp}\npassword: ${passwordInp}`
//       );
//       if (isOk) {
//         // dong y -> thoat chuong trinh
//         console.warn("Dang nhap thanh cong");
//         break;
//       } else {
//         alert("Nguoi dung khong chap nhan phien dang nhap!");
//         infoInp = "";
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     infoInp = "";
//   }
// }

// console.groupEnd("Vong lap while");

//-------------------------------------
// doo while---------------------------

// console.group("Vong lap do - while: lap it nhat 1 lan.")
// var input = prompt("Nhap so nguen duong")
// do {
//     input++;
//     console.log(input);
// } while (input < 0);
// console.groupEnd("Vong lap do - while: lap it nhat 1 lan")

