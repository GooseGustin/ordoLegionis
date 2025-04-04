export function findAll(arr, x) {
    var results = [], 
    len = arr.length,
    pos = 0; 
    while(pos < len) { 
        pos = arr.indexOf(x, pos); 
        if (pos === -1) break; 
        results.push(pos); 
        pos = pos + 1; 
    }
    return results;
}

export function removeRepeatedFromArray(arr) {
    let arrCopy = [];
    for (let i=0; i<arr.length; i++) {
        const item = arr[i];
        const allIndices = findAll(arr, item);
        if (allIndices.length < 1 && !arrCopy.includes(item)) {
            arrCopy.push(item);
        } else if (!arrCopy.includes(item)) {
            arrCopy.push(arr[allIndices[0]]);
        }
    } 
    return arrCopy;
}

export function removeRepeatedObjectsFromArray(arr) {
    const seen = new Set();
    const unique = [];

    for (const item of arr) {
        const key = JSON.stringify(item); // Convert object to string key
        if (!seen.has(key)) {
            seen.add(key);
            unique.push(item);
        }
    }

    return unique;
}

export function isAnEmptyObject(value) {
    return typeof value === 'object' && 
           value !== null && 
           !Array.isArray(value) && 
           Object.keys(value).length === 0;
}

export function isAnEmptyArray(value) {
    return Array.isArray(value) && value.length === 0;
}

export function parseObjectKeys(someObj) {
    let keys = []; 
    if (!isAnEmptyObject(someObj)) {
        for (let key in someObj) {
            keys.push(key); 
        }
    }
    return keys; 
}


export function getFormattedDate(praesidiumDate) {
    // console.log("In get formatted date", praesidiumDate)
    if (!praesidiumDate) {
        return null;
    }
    let dateOutput = new Date(praesidiumDate); //.split('-'));
    dateOutput = dateOutput.toUTCString();
    dateOutput = dateOutput.substring(0, 16);
    // console.log('Formatted date', dateOutput);
    return dateOutput;
}
