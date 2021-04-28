const isWeekend = day => {
    return day % 7 === 6 || day % 7 === 0;
}

const getDayName = day => {
    const date = new Date((new Date()).getUTCFullYear(), (new Date()).getUTCMonth(), day);
    return new Intl.DateTimeFormat("en-US", {weekday: "short"}).format(date);
}

document.addEventListener('DOMContentLoaded', (event) => {
    const calendar = document.querySelector("#app-calendar");
    const firstDayInMonth = new Date((new Date()).getUTCFullYear(), (new Date()).getUTCMonth(), 0);
    const daysInCurrMonth = firstDayInMonth.getDate();
    const paddingDays = (firstDayInMonth.getDay() === 0) ? 0 : firstDayInMonth.getDay() - 1;

    for(let day=paddingDays; day >= 0; day--) {
        const currDate = new Date(+firstDayInMonth - day * 1000 * 60 * 60 * 24);
        const dayName = new Intl.DateTimeFormat(
            "en-US", {weekday: "short"}).format(currDate);
        let name = '<div class="name">' + dayName + '</div>';
        const weekend = isWeekend(currDate.getDay());

        calendar.insertAdjacentHTML(
            "beforeend",
            '<div class="day" ' + (weekend ? "weekend" : "") + '">' + name + currDate.getDate() + '</div>'
        );
    }

    for(let day=1; day <= daysInCurrMonth; day++) {
        const weekend = isWeekend(day);

        let name = "";
        if(paddingDays + day < 7) {
            const dayName = getDayName(day);
            name = '<div class="name">' + dayName + '</div>';
        }

        calendar.insertAdjacentHTML(
            "beforeend",
            '<div class="day" ' + (weekend ? "weekend" : "") + '">' + name + day + '</div>'
        );
    }

    document.querySelectorAll("#app-calendar .day").forEach(day => {
        day.addEventListener("click", event => {
            event.currentTarget.classList.toggle("selected");
        });
    });
});