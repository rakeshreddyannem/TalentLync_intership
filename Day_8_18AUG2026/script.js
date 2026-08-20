let pTag = document.getElementById("para").textContent;
console.log(pTag);

document.getElementById("demoId").value = "Value changed";

document.getElementById("btn").innerText = "Reset";

localStorage.setItem("userName", "Rakesh");
localStorage.getItem("userName");
