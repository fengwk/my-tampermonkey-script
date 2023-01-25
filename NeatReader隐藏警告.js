// ==UserScript==
// @name         Neat Reader 隐藏警告
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Neat Reader 隐藏警告
// @author       fengwk
// @match        https://www.neat-reader.cn/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

function hideElement(element) {
    if (element) {
        element.style.display = 'none'
        if (element.children) {
            for (var child of element.children) {
                hideElement(child)
            }
        }
    }
}

(function() {
    'use strict';

    hideElement(document.querySelector('.data-overdose-waring'))
})();
