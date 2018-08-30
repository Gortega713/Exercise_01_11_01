/*  Exercise 01_11_01

    Whole Spectrum Energy Solutions
    Author: Gabriel Ortega
    Date: 8.28.18  

    Filename: script.js
*/

"use strict";

// global variables
var selectedCity = "Tucson, AZ"; // Default Location
var weatherReport = null;

// Variable to hold our XHR object
var httpRequest = false;

// Function to get a request object

function getRequestObject() {
    // Instantiate an XHR object
    try {
        httpRequest = new XMLHttpRequest();
        
    } catch (errorMessage) {
        document.querySelector("p.error").innerHTML = "Forecast not supported by your browser.";
        document.querySelector("p.error").style.display = "block";
        return false;
    }
    return httpRequest;
}

// Function which gets the weather in response to click event on city location and for default city on page load

function getWeather(evt) {
    var latitude = null;
    var longitude = null;
    if (evt.type !== "load") {
        if (evt.target) {
            selectedCity = evt.target.innerHTML;
        } else if (evt.srcElement) {
            selectedCity = evt.srcElement.innerHTML;
        }
    }
    if (selectedCity === "Tucson, AZ") {
        latitude = 37.7577;
        longitude = -122.4376;
    } else if (selectedCity === "Chicago, IL") {
        latitude = 41.8337329;
        longitude = -87.7321555;
    } else if (selectedCity === "Montreal, QC") {
        latitude = 45.5601062;
        longitude = -73.7120832;
    }

    // Test for XHR object

    if (!httpRequest) {
        httpRequest = getRequestObject();
        alert(httpRequest);
    }
    
    // Protect against an open request
    httpRequest.abort();
    
    // Target request
    httpRequest.open("get", "solar.php?" + "lat=" + latitude + "&lng=" + longitude, true);
    httpRequest.send(null);
}

// Retrieve "li" elements holding city location choices
var locations = document.querySelectorAll("section ul li");

// Add click event listeners to each city location elements
// Event handler will be getWeather()
for (var i = 0; i < locations.length; i++) {
    if (locations[i].addEventListener) {
        locations[i].addEventListener("click", getWeather, false);
    } else if (locations[i].attachEvent) {
        locations[i].attachEvent("onclick", getWeather);
    }
}

// Add load event listeners to get weather for default location (Tuscon, AZ)
// Event handler is getWeather()
if (window.addEventListener) {
    window.addEventListener("load", getWeather, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", getWeather);
}
