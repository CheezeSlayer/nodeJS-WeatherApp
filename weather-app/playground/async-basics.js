console.log('Starting app');

setTimeout(() => {
  console.log('Inside of callback');
}, 2000);

setTimeout(() => {  //This command will render after 'Finishing Up'.  Its how node works
  console.log('Callback 2');
}, 0);

console.log('Finishing up');
