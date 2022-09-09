console.log('Init');

setTimeout(() => {
    console.log('First Timeout');
}, 3000);

setTimeout(() => {
    console.log('Second Timeout');
}, 0);

setTimeout(() => {
    console.log('Third Timeout');
}, 0);

console.log('End');
