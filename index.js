// document.addEventListener("DOMContentLoaded", async () => {
//     await fetch("./information.json")
//         .then(response => response.json())
//         .then(res => cerateTable(res))
// });
(async () => {
    await fetch("./information.json")
        .then(response => response.json())
        .then(res => {
            dataStore = res;
            cerateTable(res)
        })
})();


let dataStore = [];
const tableBody = document.querySelector("#tableBody");
// let state = document.querySelector("#client").value;

function cerateTable(data) {
    tableBody.innerHTML = "";
    // document.querySelector("#tableBody").remove();
    // const tableBody = document.querySelector("#tb").appendChild()
    data.map((info) => {
        // console.log(state)
        let row = document.createElement("tr");
        row.innerHTML = `<td>${info.InvoiceId}</td>
        <td class="text-primary">${info.ClientName}</td>
        <td>${info.ClientType}</td>
        <td>${info.Date}</td>
        <td>${info.DueDate}</td>
        <td class="text-danger">${info.Total}</td>
        <td class="text-danger">${info.Balance}</td>
        <td ><button class="${info.Status} rounded ps-3 pe-3">${info.Status}</button></td>
        `;
        tableBody.appendChild(row);

    })
}



function cilentFilter() {
    const state = document.querySelector("#client").value;
    const status = document.querySelector("#status").value;
    const beginDate = document.querySelector("#beginDate").value;
    const endDate = document.querySelector("#endDate").value;
    // console.log(state)
    // console.log(status)
    let startDay = beginDate.slice(8)
    let startMonth = beginDate.slice(5, 7)
    let startYear = beginDate.slice(0, 4)
    let endDay = endDate.slice(8)
    let endMonth = endDate.slice(5, 7)
    let endYear = endDate.slice(0, 4)
    let checkStart = `${startMonth}/${startDay}/${startYear}`
    let checkEnd = `${endMonth}/${endDay}/${endYear}`
    // console.log(checkStart)
    // console.log(checkEnd)
    let D1 = new Date(checkStart);
    let D2 = new Date(checkEnd);

    if (state === "any" && status === "any") {
        let data;
        if (D1 instanceof Date && !isNaN(D1) && D2 instanceof Date && !isNaN(D2)) {
            data = dataStore.filter((info) => {
                let D3 = new Date(`${info.Date.slice(3, 6)}/${info.Date.slice(0, 2)}/${info.Date.slice(6)}`)
                console.log(D1, D2, D3)
                return (D3.getTime() >= D1.getTime()) && (D3.getTime() <= D2.getTime())

            })
        }
        else {
            data = [...dataStore]
        }

        cerateTable(data)
    }
    else if (state !== "any" && status === "any") {
        let data;
        if (D1 instanceof Date && !isNaN(D1) && D2 instanceof Date && !isNaN(D2)) {

            data = dataStore.filter((info) => info.ClientType === state).filter((info) => {

                let D3 = new Date(`${info.Date.slice(3, 6)}/${info.Date.slice(0, 2)}/${info.Date.slice(6)}`)
                console.log(D1, D2, D3)
                return (D3.getTime() >= D1.getTime()) && (D3.getTime() <= D2.getTime())

            })
        }
        else {
            data = dataStore.filter((info) => info.ClientType === state)
        }

        cerateTable(data)
    }
    else if (state === "any" && status !== "any") {

        let data;
        if (D1 instanceof Date && !isNaN(D1) && D2 instanceof Date && !isNaN(D2)) {

            data = dataStore.filter((info) => info.Status === status).filter((info) => {

                let D3 = new Date(`${info.Date.slice(3, 6)}/${info.Date.slice(0, 2)}/${info.Date.slice(6)}`)
                console.log(D1, D2, D3)
                return (D3.getTime() >= D1.getTime()) && (D3.getTime() <= D2.getTime())

            })
        }
        else {
            data = dataStore.filter((info) => info.Status === status)
        }
        cerateTable(data)
    }
    else {
        let data;
        if (D1 instanceof Date && !isNaN(D1) && D2 instanceof Date && !isNaN(D2)) {

            data = dataStore.filter((info) => info.ClientType === state).filter((info) => info.Status === status).filter((info) => {

                let D3 = new Date(`${info.Date.slice(3, 6)}/${info.Date.slice(0, 2)}/${info.Date.slice(6)}`)
                console.log(D1, D2, D3)
                return (D3.getTime() >= D1.getTime()) && (D3.getTime() <= D2.getTime())

            })
        }
        else {
            data = dataStore.filter((info) => info.ClientType === state).filter((info) => info.Status === status)
        }
        cerateTable(data)
    }
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("tableBody");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
