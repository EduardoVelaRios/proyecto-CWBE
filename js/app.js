if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
   }
   var url=window.location.href;
   var ubicacionSw='/CWBE/sw.js';

   if ( navigator.serviceWorker ) {
    if(url.includes('localhost')){
    ubicacionSw='/sw.js';
    }
    navigator.serviceWorker.register(ubicacionSw);
   }        