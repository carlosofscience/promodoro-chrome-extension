chrome.alarms.create("pomodoroTimer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener(alarm =>{

  if(alarm.name === "pomodoroTimer"){
    chrome.storage.local.get(["timer", "isRunning", "timeout"], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        console.log(timer);

        if (timer >= res.timeout) {
          // if(timer >= 60 * defaultTimeoutMinutes){
          chrome.storage.local.set({ isRunning: false });
          timer = 0;
          console.log("sending notification timeout");
          this.registration.showNotification("Pomodoro Timeout!", {
            body: `${Math.round(res.timeout/60)} minutes has passed!`,
            icon: "icon.png",
          });
        }
        chrome.storage.local.set({ timer });
      }
    });
  }
})

chrome.storage.local.get(["timer", "isRunning"], (res)=>{
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
})