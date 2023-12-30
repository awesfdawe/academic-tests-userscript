// ==UserScript==
// @name         Academic Tests
// @namespace    https://github.com/awesfdawe
// @version      0.1
// @updateURL    https://raw.githubusercontent.com/awesfdawe/academic-tests-userscript/main/AcademicTests.user.js
// @description  Блокирует отслеживание переключений между вкладками и программами, а также добавляет кнопку для быстрого копирования промпта в чат боты
// @author       awesfdawe
// @match        https://academtest.ru/tests
// @grant        none
// ==/UserScript==

'use strict';

window.addEventListener('blur', function(event) {
    event.stopImmediatePropagation();
}, true);

window.addEventListener('focus', function(event) {
    event.stopImmediatePropagation();
}, true);


var newButton = document.createElement("button");

newButton.classList.add("copyPrompt");
newButton.innerHTML = "Скопировать промпт";
newButton.id = "copyPromptButton";
newButton.style.userSelect = "none";
newButton.style.cursor = "pointer";
newButton.style.fontSize = "15px";
newButton.style.color = "#ffffff";
newButton.style.padding = "5px 20px";
newButton.style.margin = "0px 200px 4px 0px";
newButton.style.background = "#1e1e2e";
newButton.style.borderRadius = "6px";
newButton.style.border = "none";
newButton.style.order = 1;

function handleClick() {
    var elements = document.getElementsByClassName("oknootveta");

    for (var i = 0; i < elements.length; i++) {
        var displayStyle = window.getComputedStyle(elements[i]).display;

        if (displayStyle === "block") {
            let id = elements[i].id;
            console.log("ID элемента, который сейчас отображается: " + id);

            var element = document.getElementById(id);
            var pTags = element.getElementsByTagName("p");
            var data = [];

            for (var j = 0; j < pTags.length; j++) {
                data.push(pTags[j].textContent);
            }

            data = data.map((item, index) => { // Добавляет запятые
                if (index >= 2 && index < data.length - 1) {
                    return item + ",\n";
                }
                return item;
            });

            data[0] = data[0] + "\n"; // Добавляет перенос строки
            data[1] = data[1].replace(/Вес:\d+/, '').trim() + "."; // Убирает вес, добавляет точку
            data.splice(1 + 1, 0, "Ответьте только ответами, без дополнительных объяснений и т.д.:\n"); // Для нормального промпта

            let result = data.join(' ');

            navigator.clipboard.writeText(result); // Копировать в буфер обмена
            console.log(result);
        }
    }
}

newButton.addEventListener("click", handleClick);

var intervalId;

function addButton() {
    var lineFlexElements = document.querySelectorAll('.LineFlex');
    if (lineFlexElements.length >= 2 && !document.getElementById("copyPromptButton")) {
        document.querySelector("#save").style.order = "3";
        document.querySelector("#dalee").style.order = "2";

        lineFlexElements[1].appendChild(newButton);
        clearInterval(intervalId);
    }
}

// Провера каждую секу
intervalId = setInterval(addButton, 500);
