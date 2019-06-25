import { Component } from '@angular/core';
import { log } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  selectedObjectKeys: string;
  result: any;
  all: any;
  seen: any;
  removeDupString: any;
  uniqueArray = [];
  outputArray = [];
  removeDupResult: any;
  reverseString: string;
  reverseStringRes: string;
  reverseStrwithoutSplit: string;
  reverseStringReswithout: string;
  objKeyInput = '{  a: 5, b: { c: { d: 10 } }}';
  removeDupInput = '"hello"' + ',' + '"hi"' + ',' + '"hello"';
  charCountInput = ['hello world', 'hello world'];
  charCount = [];
  charCountRes: any;

  // Object Keys
  showObjectKeys() {
    this.result = this.getKeys();
    console.log(this.result);
  }

  getKeys() {
    let obj = JSON.stringify(eval('(' + this.selectedObjectKeys + ')'));
    this.all = {};
    this.seen = [];
    this.checkValue(JSON.parse(obj), this.all, this.seen);
    return Object.keys(this.all);
  }

  checkValue(value, all, seen) {
    if (Array.isArray(value)) { return this.checkArray(value, all, seen); }
    if (value instanceof Object) { return this.checkObject(value, all, seen); }
  }
  checkArray(array, all, seen) {
    if (seen.indexOf(array) >= 0) { return; }
    seen.push(array);
    for (let i = 0, l = array.length; i < l; i++) {
      this.checkValue(array[i], all, seen);
    }
  }
  checkObject(obj, all, seen) {
    if (seen.indexOf(obj) >= 0) { return; }
    seen.push(obj);
    let keys = Object.keys(obj);
    for (let i = 0, l = keys.length; i < l; i++) {
      let key = keys[i];
      all[key] = true;
      this.checkValue(obj[key], all, seen);
    }
  }

  // Remove Duplicates
  removeDuplicateString() {
    this.uniqueArray = JSON.parse('[' + this.removeDupString + ']');
    this.removeDupResult = this.removeusingSet(this.uniqueArray);
    console.log(this.removeDupResult);
  }
  removeusingSet(arr) {
    let outputArray = Array.from(new Set(arr));
    return outputArray;
  }

  // Reverse string with split and reverse method
  getReverseString() {
    let str = this.reverseString;
    this.reverseStringRes = this.reverseStr(str);
  }

  reverseStr(str) {
    return str.split("").reverse().join("").split(" ").reverse().join(" ")
  }

  // Reverse string without split and reverse method
  getReverseStringwithoutSplit() {
    let str = this.reverseStrwithoutSplit;
    this.reverseStringReswithout = this.reverseStrWithout(str);
  }

  reverseStrWithout(str) {
    let revstr = '';
    for (let i = str.length - 1; i >= 0; i--) {
      revstr = revstr + str[i];
    }
    return revstr;
  }

  // Character count including spaces and special charcters
  getCharacterCount() {
    let str = JSON.parse('[' + this.charCount + ']');
    console.log(str);
    this.charCountRes = this.getOccuranceChar(str.join(''));
    console.log(this.charCountRes);
  }

  getOccuranceChar(string) {
    let acc = {};
    string.split('').forEach(
      (el) => {
        if (acc && acc.hasOwnProperty(el)) {
          acc[el]++;
        } else {
          acc[el] = 1;
        }
      }
    );
    return acc;
  }
}



