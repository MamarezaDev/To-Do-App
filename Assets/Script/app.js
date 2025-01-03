document.body.className = localStorage.getItem("theme");
const btnTheme = document.getElementById("theme");

function renderIcon() {
  document.body.classList == ""
    ? (btnTheme.innerHTML = `<i class="fa-solid fa-sun"></i>`)
    : (btnTheme.innerHTML = `<i class="fa-solid fa-moon"></i>`);
}
renderIcon();

btnTheme.addEventListener("click", () => {
  document.body.classList.toggle("light");
  renderIcon();
  localStorage.setItem("theme", document.body.className);
});

// switch theme ended
