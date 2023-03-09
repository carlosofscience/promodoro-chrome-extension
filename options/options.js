let timeoutMinutesInput = document.getElementById("timeoutMinutesInput");
let DEFAULT_POMODORO_TIMEOUT_MIN = 25

timeoutMinutesInput.addEventListener('change', e =>{

  let value =
    e.target.value < 1 || e.target.value > 60
      ? DEFAULT_POMODORO_TIMEOUT_MIN
      : e.target.value;
  e.target.value = value;

})

let saveOptionBtn = document.getElementById("saveOptionBtn");

saveOptionBtn.addEventListener('click', ()=>{
  chrome.storage.local.set({
    timer: 0,
    timeout: timeoutMinutesInput.value * 60,//stored in sec
    isRunning: false
  })
})