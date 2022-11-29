const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const wrapper = document.querySelector(".wrapper");

const createButton = (typeOfButt, content) => {
    const button = document.createElement("div");

    button.classList.add("button", typeOfButt);
    button.textContent = content;

    return button;
};

const getDays = (date) => {
    const copyDate = new Date(date);
    copyDate.setMonth(copyDate.getMonth() + 1);
    copyDate.setDate(0); 

    return copyDate.getDate();
};

const getFirstDayOfMonth = (date) => {
    const copyDate = new Date(date);
    copyDate.setDate(0);
    copyDate.setDate(copyDate.getDate() + 1);

    const day = copyDate.getDay();

    return day === 0 ? 6 : day - 1;
};


const doWeekend = (day, elem) => {
    if (day === 5 || day === 6) elem.classList.add("weekend"); 
};

const createTable = (elem, date = new Date()) => {
    const drawTable = () => {
        const maxDays = getDays(date);
        const firstDayOfMonth = getFirstDayOfMonth(date);

        const table = document.createElement("table");
        table.classList.add("calendar");

        const header = document.createElement("tr");
        for (let i = 0; i < 7; i++) {
            const th = document.createElement("th");
            th.textContent = daysOfWeek[i];
            th.classList.add("cell");

            doWeekend(i, th);

            header.appendChild(th);
        }

        table.appendChild(header);

        for (let start = -firstDayOfMonth; start < maxDays;) {
            const tr = document.createElement("tr");

            for (let i = 0; i < 7; i++) {
                const td = document.createElement("td");
                if (start >= 0 && start < maxDays) td.textContent = start + 1;

                doWeekend(i, td);

                td.classList.add("cell");
                tr.appendChild(td);
                start++;
            }

            table.appendChild(tr);
        }

        const container = document.createElement("div");
        
        const containerDate = document.createElement("div");
        containerDate.textContent = Intl.DateTimeFormat("ru-RU", {month:"long", year:"numeric"}).format(date);

        container.append(containerDate, table);

        return container;
    };
    
    const container = document.createElement("div");
    let table = drawTable();

    const prevButton = createButton("prev-button", "<");
    const nextButton = createButton("next-button", ">");

    const createHandler = (diff = 1) => () => {
        date.setMonth(date.getMonth() + diff);
        table.remove();
        table = drawTable();
        container.appendChild(table);
    };

    prevButton.addEventListener("click", createHandler(-1));

    nextButton.addEventListener("click", createHandler());

    container.appendChild(table);
    elem.append(prevButton, container, nextButton);
};





createTable(wrapper);


