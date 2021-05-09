import city from './taiwanCity.js';

const TAIWAN_CITY_SELECT = document.getElementById('taiwanCity');
const TAIWAN_SITE_SELECT = document.getElementById('taiwanSite');
const TAIWAN_ROAD_SELECT = document.getElementById('taiwanRoad');
const ADDRESS = document.getElementById('address');

let cityOption = `<option value="" disabled selected>請選擇市區</option>`;
let siteOption = '';
let roadOption = '';
let address = '';
let tmpAddressCity = '';
let tmpAddressSite = '';
let cityArray = new Set();
let siteArray = new Set();

city.forEach(function (el) {
    cityArray.add(el.city);
    siteArray.add(el.site_id);
});

cityArray.forEach(function (el) {
    cityOption += `<option value="${el}">${el}</option>`;
});

TAIWAN_CITY_SELECT.innerHTML = cityOption;

TAIWAN_CITY_SELECT.addEventListener('change', function () {
    siteOption = `<option value="" disabled selected>請選擇鄉鎮</option>`;
    roadOption = `<option value="" disabled selected>請選擇路名</option>`;
    address = '';
    let vm = this;
    let tmpSiteArray = [];
    siteArray.forEach(function (el) {
        if(el.indexOf(vm.value) !== -1) {
            tmpSiteArray.push(el.substring(vm.value.length));
        }
    });
    tmpSiteArray.forEach(function (el) {
        siteOption += `<option value="${el}">${el}</option>`;
    })
    TAIWAN_SITE_SELECT.innerHTML = siteOption;
    TAIWAN_ROAD_SELECT.innerHTML = roadOption;
    tmpAddressCity = this.value;
    address += this.value;
    ADDRESS.value = address;
});

TAIWAN_SITE_SELECT.addEventListener('change', function () {
    roadOption = `<option value="" disabled selected>請選擇路名</option>`;
    let vm = this;
    city.forEach(function(el) {
        if(el.site_id.indexOf(vm.value) !== -1) {
            roadOption += `<option value="${el.road}">${el.road}</option>`;
        }
    });
    TAIWAN_ROAD_SELECT.innerHTML = roadOption;
    tmpAddressSite = tmpAddressCity + this.value;
    ADDRESS.value = tmpAddressSite;
});

TAIWAN_ROAD_SELECT.addEventListener('change', function () {
    address = tmpAddressSite + this.value;
    ADDRESS.value = address;
});
