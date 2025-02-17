'use strict';

/**
 * navbar toggle
 */

// const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
// const header = document.querySelector("[data-header]");

// navToggleBtn.addEventListener("click", function() {
//     this.classList.toggle("active");
//     header.classList.toggle("active");
// });


// format time

const formatTime = (time) => {
    return new Date(time).toLocaleString().replace(",", "</br>");
}

// fetch

const serverUrl = "https://ttcs-back-end.onrender.com"

const getMethods = async(url) => {
    const response = await fetch(
        serverUrl + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
    );
    const res = await response.json();
    return res.data;
}

const postMethods = async(url, data) => {
    if (data == null) {
        const response = await fetch(
            serverUrl + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );
        return await response.json();
    } else {
        const response = await fetch(
            serverUrl + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(data)
            }
        );
        return await response.json();
    }
}

const putMethods = async(url, data) => {
    if (data == null) {
        const response = await fetch(
            serverUrl + url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );
        return await response.json();
    } else {
        const response = await fetch(
            serverUrl + url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(data)
            }
        );
        return await response.json();
    }
}

const deleteMethods = async(url) => {
    const response = await fetch(
        serverUrl + url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
    );
    return await response.json();
}

// params

function getParams(url) {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    var obj = {};
    if (queryString) {
        queryString = queryString.split('#')[0];
        var arr = queryString.split('&');
        for (var i = 0; i < arr.length; i++) {
            var a = arr[i].split('=');
            var paramName = a[0];
            var paramValue = typeof(a[1]) === 'undefined' ? true : a[1];
            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
            if (paramName.match(/\[(\d+)?\]$/)) {
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];
                if (paramName.match(/\[\d+\]$/)) {
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    obj[key].push(paramValue);
                }
            } else {
                if (!obj[paramName]) {
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    obj[paramName].push(paramValue);
                }
            }
        }
    }
    return obj;
}