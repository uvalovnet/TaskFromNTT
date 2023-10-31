

async function getAllData(table) {
    const response = await fetch("/api/requests/getalldata", {
        method: "GET",
        headers: { "Accept": "application/json", "Table": `${table}` }
    });
    if (response.ok === true) {
        const items = await response.json();
        fillTable(items);
    }
}

async function getSelectionData(startSelect, endSelect, table) {
    const response = await fetch("/api/requests/getselectdata", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json", "Table": `${table}` },
        body: JSON.stringify({
            Start: startSelect,
            End: endSelect
        })
    });

        const items = await response.json();
        fillTable(items);
    
}

async function addCategory(itemName, categoryNumber, table) {

    if (table == "category") {
        const response = await fetch("/api/requests/add", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json", "Table": `${table}` },
            body: JSON.stringify({
                Name: itemName,
                NumberCategory: categoryNumber
            })
        });
    }


        const items = await response.json();
        fillTable(items);
    
}

async function addItem(itemName, itemCategory, itemPrice, itemQuantity, table) {
    if (table == "product") {
        const response = await fetch("/api/requests/add", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json", "Table": `${table}` },
            body: JSON.stringify({
                Name: itemName,
                Category: itemCategory,
                Price: itemPrice,
                Quantity: itemQuantity
            })
        });
    }

        const items = await response.json();
        fillTable(items);
    

}

async function editProduct(itemId, itemName, itemCategory, itemPrice, itemQuantity) {
    const response = await fetch("/api/requests/update", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            Id: itemId,
            Name: itemName,
            Category: itemCategory,
            Price: itemPrice,
            Quantity: itemQuantity
        })
    });

        const items = await response.json();
        fillTable(items);
    
}

async function deleteItem(itemId, table) {
    const response = await fetch("/api/requests/delete", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json", "Table": `${table}` },
        body: JSON.stringify({
            Id: itemId
        })
    });

        const items = await response.json();
        fillTable(items);
    
}

async function join() {
    const response = await fetch("/api/requests/join", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

        const items = await response.json();
        fillTable(items);
    
}



function fillTable(items) {
    var parentElement = document.getElementById('viewTable');

    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
    

    if (items.length > 0) {
        if (items[0]["numberCategory"] in items) {
            const thead = document.createElement("thead");
            const tr1 = document.createElement("tr");
            const thId = document.createElement("th");
            const thName = document.createElement("th");
            const thCategory = document.createElement("th");
            thId.innerHTML = "Id";
            thName.innerHTML = "Name";
            thCategory.innerHTML = "NumberCategory";
            tr1.append(thId);
            tr1.append(thName);
            tr1.append(thCategory);
            thead.append(tr1);
            const table = document.querySelector("table");
            table.append(thead);

            const tbody = document.createElement("tbody");
            for (let i = 0; i < items.length; i++) {
                tr2 = document.createElement("tr");
                tdId = document.createElement("td");
                tdName = document.createElement("td");
                tdCategory = document.createElement("td");
                tdId.innerHTML = items[i]["id"];
                tdName.innerHTML = items[i]["name"];
                tdCategory.innerHTML = items[i]["numberCategory"];
                tr2.append(tdId);
                tr2.append(tdName);
                tr2.append(tdCategory);
                tbody.append(tr2);
            }
            parentElement.append(thead);
            parentElement.append(tbody);
        }
        else {
            const thead = document.createElement("thead");
            const tr3 = document.createElement("tr");
            const thId = document.createElement("th");
            const thName = document.createElement("th");
            const thCategory = document.createElement("th");
            const thPrice = document.createElement("th");
            const thQuantuty = document.createElement("th");
            thId.innerHTML = "Id";
            thName.innerHTML = "Name";
            thCategory.innerHTML = "Category";
            thPrice.innerHTML = "Price";
            thQuantuty.innerHTML = "Quantity";
            tr3.append(thId);
            tr3.append(thName);
            tr3.append(thCategory);
            tr3.append(thPrice);
            tr3.append(thQuantuty);
            thead.append(tr3);
            const table = document.querySelector("table");
            table.append(thead);

            const tbody = document.createElement("tbody");

            for (let i = 0; i < items.length; i++) {
                tr4 = document.createElement("tr");
                tdId = document.createElement("td");
                tdName = document.createElement("td");
                tdCategory = document.createElement("td");
                tdPrice = document.createElement("td");
                tdQuantity = document.createElement("td");
                tdId.innerHTML = items[i]["id"];
                tdName.innerHTML = items[i]["name"];
                tdCategory.innerHTML = items[i]["category"];
                tdPrice.innerHTML = items[i]["price"];
                tdQuantity.innerHTML = items[i]["quantity"];
                tr4.append(tdId);
                tr4.append(tdName);
                tr4.append(tdCategory);
                tr4.append(tdPrice);
                tr4.append(tdQuantity);
                tbody.append(tr4);
            }
            parentElement.append(thead);
            parentElement.append(tbody);
        }
    }

    return parentElement;
}


document.getElementById("getAllItems").addEventListener("click", async () => {

    const table = document.getElementById("table1").value;
        if (table == 1) {
        await getAllData("category");
    }
    else {
        await getAllData("product");
    }
});
document.getElementById("getSelectionData").addEventListener("click", async () => {

    const table = document.getElementById("table2").value;
    const start = document.getElementById("start").value;
    document.getElementById("start").value = "";
    const end = document.getElementById("end").value;
    document.getElementById("end").value="";

    if (table == 1) {
        await getSelectionData(start, end, "category");
    }
    else {
        await getSelectionData(start, end, "product");
    }
});
document.getElementById("add").addEventListener("click", async () => {

    const table = document.getElementById("table3").value;
    if (table == 1) {
        const name = document.getElementById("Name3").value;
        document.getElementById("Name3").value = "";
        const categoryNumber = document.getElementById("Category3").value;
        document.getElementById("Category3").value = "";
        await addCategory(name, categoryNumber, "category");
    }
    else {
        const name = document.getElementById("Name3").value;
        document.getElementById("Name3").value = "";
            const category = document.getElementById("Category3").value;
        document.getElementById("Category3").value = "";
            const price = document.getElementById("Price3").value;
        document.getElementById("Price3").value = "";
            const quantity = document.getElementById("Quantity3").value;
        document.getElementById("Quantity3").value = "";
            await addItem(name, category, price, quantity, "product");
    }
});
document.getElementById("update").addEventListener("click", async () => {
    const id = document.getElementById("Id4").value;
    document.getElementById("Id4").value = "";
    const name = document.getElementById("Name4").value;
    document.getElementById("Name4").value = "";
    const category = document.getElementById("Category4").value;
    document.getElementById("Category4").value = "";
    const price = document.getElementById("Price4").value;
    document.getElementById("Price4").value = "";
    const quantity = document.getElementById("Quantity4").value;
    document.getElementById("Quantity4").value = "";
    await editProduct(id, name, category, price, quantity);
});
document.getElementById("delete").addEventListener("click", async () => {

    const table = document.getElementById("table5").value;
    const id = document.getElementById("Id5").value;
    document.getElementById("Id5").value = "";
    if (table == 1) {
        await deleteItem(id, "category");
    }
    else {
        await deleteItem(id, "product");
    }
});
document.getElementById("join").addEventListener("click", async () => {
    await join();
});