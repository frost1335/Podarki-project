window.addEventListener("load", function (e) {
  const infoBody = document.querySelector(".infoBody");
  const addBtn = document.querySelector(".addInp");

  let i = 0;

  if (addBtn) {
    addBtn.addEventListener("click", (c) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <span class="titleInfo">Info .${i + 1}</span>
      <input type="text" class="form-control mb-3" name="infoTitle" id="inputGroupFile02">
          <button class="btn boxBtn toBtn mb-3" data-id="box${i}" type="button" style="margin-top: 0px !Important;">
            <svg data-id="box${i}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg toBtn" viewBox="0 0 16 16">
                <path data-id="box${i}" class="toBtn" d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
            </svg>
          </button>
        <div class="infoBox box${i}">
        </div>`;
      infoBody.appendChild(div);
      i++;
    });
  }
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("toBtn")) {
      const attr = e.target.getAttribute("data-id");
      const box = document.querySelector(`.${attr}`);
      const inp = document.createElement("input");
      inp.setAttribute("type", "text");
      inp.setAttribute("name", `${attr}Text`);
      inp.classList.add('form-control')
      inp.classList.add('smallInp')
      inp.classList.add('mb-3')
      box.appendChild(inp);
    }
  });
});



