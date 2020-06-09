/**
 * TO IMPROVE CLASS PAGINATION
 *      1) Improve the approach in apdating pagination all we need instead of regenrating is
 *          updata data-page in (next, previous) button and add active on page
 */

class Pagination {
    constructor(maxPages, tableContainer, paginationHanlerFN) {
        this.maxPages = maxPages;
        this.tableConatiner = tableContainer;
        this.paginationHandler = paginationHanlerFN;
    }

    renderPagination(page) {
        if (this.maxPages <= 5) {
            // if there isn't page (first time that render pagination) that will be call once
            if (!page) {
                // FINISH
                /*  
                    create pagination element and return pagination Ul and pagination container
                    call a function that creates pagination items and return them
                    add the items to pagination ul and append them to pagination container
                    add pagination container to table container 
                */
                let paginationDOM = this.createPaginationElement();
                let paginationItemsHTML = this.CPIForMaxFivePages(
                    this.maxPages
                );
                paginationDOM.paginationUl.innerHTML = paginationItemsHTML;
                this.tableConatiner.appendChild(
                    paginationDOM.paginationContainer
                );
            } else {
                // this is the after first time that will work
                /*  
                    get the pagination ul
                    call a function that creates pagination items and pass page parameter to it
                        and return pagination items
                    add the items to pagination ul
                */

                let paginationUl = this.tableConatiner.querySelector(
                    ".pagination__items"
                );
                let paginationItemsHTML = this.CPIForMaxFivePages(
                    this.maxPages,
                    page
                );
                paginationUl.innerHTML = paginationItemsHTML;
            }
        } else {
            // if pages more than 5 pages
            // if there isn't page (first time that render pagination) that will be call once
            if (!page) {
                /**
                 * create pagination element and return pagination ul and pagination container
                 * call a function that creates pagination items for pages more than 5 and return
                 * items
                 * add items to pagination ul and append them to pagination container
                 * add pagination container to table container
                 */
                let paginationDOM = this.createPaginationElement();
                let paginationItemsHTML = this.CPIForMaxPages(this.maxPages);
                paginationDOM.paginationUl.innerHTML = paginationItemsHTML;
                this.tableConatiner.appendChild(
                    paginationDOM.paginationContainer
                );
            } else {
                // this is the after first time that will work
                /**
                 * get pagination ul
                 * call a function that creates pagination items for pages more than 5 and pass
                 * page to it and return items
                 * add items to pagination ul
                 */
                let paginationUl = this.tableConatiner.querySelector(
                    ".pagination__items"
                );
                let paginationItemsHTML = this.CPIForMaxPages(
                    this.maxPages,
                    page
                );
                paginationUl.innerHTML = paginationItemsHTML;
            }
        }
    }

    createPaginationElement() {
        let paginationContainer = document.createElement("div");
        paginationContainer.classList.add("table-container__pagination");
        let paginationUl = document.createElement("ul");
        paginationUl.classList.add("pagination__items");
        paginationUl.addEventListener("click", this.paginationHandler);
        paginationContainer.appendChild(paginationUl);
        return {
            paginationUl,
            paginationContainer,
        };
    }

    CPIForMaxFivePages(maxPages, page = 1) {
        let pagintaionItemsControls = this.createControlsBtn(maxPages, page);
        let paginationItemsHTMLContainer = ``;
        // create previous button
        paginationItemsHTMLContainer += pagintaionItemsControls.prevBtn;
        // loop
        for (let i = 1; i <= maxPages; i++) {
            // create buttons based on max pages
            //check if page == i add active class
            if (i == page)
                paginationItemsHTMLContainer += this.createPaginationBtn(
                    i,
                    true
                );
            else paginationItemsHTMLContainer += this.createPaginationBtn(i);
        }
        // create next button
        paginationItemsHTMLContainer += pagintaionItemsControls.nextBtn;
        // return all pagination items
        return paginationItemsHTMLContainer;
    }

    CPIForMaxPages(maxPages, page = 1) {
        let pagintaionItemsControls = this.createControlsBtn(maxPages, page);
        let paginationItemsHTMLContainer = ``;
        // add previous button
        paginationItemsHTMLContainer += pagintaionItemsControls.prevBtn;

        // if page less than 5
        if (page < 5) {
            // create items for first 5 buttons
            for (let i = 1; i <= 5; i++) {
                if (i == page)
                    paginationItemsHTMLContainer += this.createPaginationBtn(
                        i,
                        true
                    );
                else
                    paginationItemsHTMLContainer += this.createPaginationBtn(i);
            }
            // create placeholder button
            paginationItemsHTMLContainer += this.createPlaceholderBtn();
            // create maxPages button
            paginationItemsHTMLContainer += this.createPaginationBtn(
                this.maxPages
            );
        } else if (page > this.maxPages - 4) {
            // create first  item button
            paginationItemsHTMLContainer += this.createPaginationBtn(1);
            // create placeholder item  button
            paginationItemsHTMLContainer += this.createPlaceholderBtn();
            // create items last 5 buttons
            for (let i = this.maxPages - 4; i <= this.maxPages; i++) {
                if (i == page)
                    paginationItemsHTMLContainer += this.createPaginationBtn(
                        i,
                        true
                    );
                else
                    paginationItemsHTMLContainer += this.createPaginationBtn(i);
            }
        } else {
            // create first item button
            paginationItemsHTMLContainer += this.createPaginationBtn(1);
            // create placeholder item button
            paginationItemsHTMLContainer += this.createPlaceholderBtn();
            //  create page -1 button
            paginationItemsHTMLContainer += this.createPaginationBtn(+page - 1);
            // create page button
            paginationItemsHTMLContainer += this.createPaginationBtn(
                page,
                true
            );
            // create page +1 button
            paginationItemsHTMLContainer += this.createPaginationBtn(+page + 1);
            // create placeholder button
            paginationItemsHTMLContainer += this.createPlaceholderBtn();
            // create last item page
            paginationItemsHTMLContainer += this.createPaginationBtn(
                this.maxPages
            );
        }

        //add next button
        paginationItemsHTMLContainer += pagintaionItemsControls.nextBtn;

        return paginationItemsHTMLContainer;
    }

    createControlsBtn(maxPages, page) {
        let previousBtn = `
            <li class="pagination__item">
                <button class="pagination__item--btn ${
                    page == 1 ? "disabled" : ""
                }" data-page="${+page - 1}">Previous</button>
            </li>
        `;
        let nextBtn = `
            <li class="pagination__item">
                <button class="pagination__item--btn ${
                    page == maxPages ? "disabled" : ""
                }" data-page="${+page + 1}">Next</button>
            </li>
        `;

        return {
            prevBtn: previousBtn,
            nextBtn,
        };
    }

    createPaginationBtn(page, isActive = false) {
        let paginationButton = `
            <li class="pagination__item">
                <button class="pagination__item--btn ${
                    isActive ? "active" : ""
                }" data-page="${page}">${page}</button>
            </li>
        `;
        return paginationButton;
    }

    createPlaceholderBtn() {
        let paginationButton = `
            <li class="pagination__item">
                <button class="pagination__item--btn disabled">...</button>
            </li>
        `;
        return paginationButton;
    }
}

class searchBox {
    /**
     *
     * create search box
     * add eventlistener to the search box
     * make a function that search in the data in table
     * take the searched data and add it to the table through function in table class
     */
    constructor(tableData) {
        this.tableData = tableData;
    }

    createSearchBoxElement() {
        let searchBox = document.createElement("div");
        searchBox.classList.add("table-controls__search");
        let searchBoxLable = document.createElement("lable");
        searchBoxLable.setAttribute("for", "searchInTable");
        searchBoxLable.textContent = "Search: ";
        let searchBoxInput = document.createElement("input");
        searchBoxInput.type = "text";
        searchBoxInput.id = "searchInTable";
        searchBoxInput.classList.add("form-control");
        searchBoxInput.addEventListener("keyup", this.searchHandler.bind(this));
        searchBox.append(searchBoxLable, searchBoxInput);
        return searchBox;
    }

    searchHandler(e) {
        let value = e.target.value;
        if (value !== "") {
            let result = [];
            // loop through the data
            for (let i = 0; i < this.tableData.length; i++) {
                // every item in the array will converted to string by stringify
                let stringified = JSON.stringify(this.tableData[i]);
                // search in that string if the value in there
                // if the value exist 
                if (stringified.includes(value)) {
                    // make a tr and add it to result
                    result.push(this.createTableData(this.tableData[i]));
                };
            }
            console.log(result);
            // call render 
        }
    }

    createTableData(data) {
        let tableTR = document.createElement('tr');
        for (const td in data) {
            tableTR.innerHTML += `<td>${data[td]}</td>`;
        }
        return tableTR
    }
}

class DataTable {
    constructor(options) {
        // options object conatins (table, searchBox, rowsNumberBox, pagination)
        this.options = options;
        this.tableContainer = document.querySelector(this.options.table);
        this.rowsLimit = this.options.rowsLimit || 10;
        this.tableBody = this.tableContainer.querySelector("table tbody");
        this.tableBodyItems = Array.from(this.tableBody.children);
        this.maxPages = Math.ceil(this.tableBodyItems.length / this.rowsLimit);
        // Handle the table and add aditonal things that exist in options object
        this.dataTableHandler();
        console.log(this.data);
    }

    dataTableHandler() {
        // add the data of table in the array as aobject contains (key-> cell header) : value
        this.parseData();
        // add Dom Elements to the page
        this.createDOMElements();
        // generate pagination if exist
        if (this.options.pagination) {
            this.pagination = new Pagination(
                this.maxPages,
                this.tableContainer,
                this.paginationHandler.bind(this)
            );
            this.renderDataPage();
        }
    }

    createDOMElements() {
        let tableControls = document.createElement("div");
        tableControls.classList.add("table-controls");
        let controlsItems = 0;
        if (this.options.searchBox) {
            this.searchBox = new searchBox(this.data);
            let searchBoxHTML = this.searchBox.createSearchBoxElement();
            tableControls.appendChild(searchBoxHTML);
            controlsItems++;
        }

        if (this.options.rowsNumberBox) {
            controlsItems++;
            let rowsNumberBox = document.createElement("div");
            rowsNumberBox.classList.add("table-controls__rows");
            let rowNumbersLabel = document.createElement("label");
            rowNumbersLabel.setAttribute("for", "numberOfRows");
            rowNumbersLabel.textContent = "Rows: ";
            let rowNumbersSelect = document.createElement("select");
            rowNumbersSelect.id = "numberOfRows";
            rowNumbersSelect.classList.add("form-control");
            rowNumbersSelect.innerHTML = `
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            `;
            rowNumbersSelect.addEventListener(
                "change",
                this.addRowsNumber.bind(this)
            );
            rowsNumberBox.append(rowNumbersLabel, rowNumbersSelect);
            tableControls.appendChild(rowsNumberBox);
        }
        if (controlsItems)
            this.tableContainer.insertAdjacentElement(
                "afterbegin",
                tableControls
            );
    }

    parseData() {
        let tableBodyItems = this.tableBodyItems;
        console.log(this.tableBodyItems);
        if (!this.tableHeaders) {
            this.tableHeaders = Array.from(
                this.tableContainer.querySelectorAll("table thead tr th")
            ).map((el) => {
                return el.textContent;
            });
        }
        console.log(this.tableHeaders);
        this.data = [];
        Array.from(tableBodyItems).forEach((el) => {
            let elChilds = el.children;
            let newTd = {};
            for (let i = 0; i < elChilds.length; i++) {
                newTd[this.tableHeaders[i]] = elChilds[i].textContent;
            }
            this.data.push(newTd);
        });
    }

    renderDataPage(page = null) {
        let start;
        let end;
        if (!page) {
            start = 0;
            end = this.rowsLimit;
        } else {
            start = (+page - 1) * this.rowsLimit;
            end = +page * this.rowsLimit;
        }
        let data = Array.from(this.tableBodyItems).slice(start, end);
        let dataInPage = ``;
        data.forEach((el) => {
            dataInPage += `${el.outerHTML}`;
        });
        this.tableBody.innerHTML = dataInPage;
        this.pagination.renderPagination(page);
    }

    paginationHandler(e) {
        if (e.target.closest(".pagination__item--btn")) {
            let elem = e.target.closest(".pagination__item--btn");
            let page = e.target.closest(".pagination__item--btn").dataset.page;
            if (
                !elem.classList.contains("active") &&
                !elem.classList.contains("disabled")
            ) {
                this.renderDataPage(page);
            }
        }
    }

    addRowsNumber() {}
}
let t1 = performance.now();
let datatable = new DataTable({
    table: ".table-container",
    searchBox: true,
    rowsNumberBox: true,
    pagination: true,
});
let t2 = performance.now();

console.log((t2 - t1) / 1000);
