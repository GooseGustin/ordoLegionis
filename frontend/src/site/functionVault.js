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


const parseDate = (dateString) => {
    const dateStr = dateString || '';
    const year = dateStr.substring(0, 4); 
    const month = dateStr.substring(5,7)
    const day = dateStr.substring(8); 
    console.log("datenums", year, month, day); 
    return [year, month, day]; 
}

export function getFormattedDate(praesidiumDate) {
    // console.log("In get formatted date", praesidiumDate)
    if (!praesidiumDate) {
        return null;
    }
    let dateOutput = new Date(parseDate(praesidiumDate));
    dateOutput = dateOutput.toUTCString();
    dateOutput = dateOutput.substring(0, 16);
    console.log('Formatted date', dateOutput);
    return dateOutput;
}
