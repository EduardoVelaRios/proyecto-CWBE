const CACHE ='cache-1';
const CACHE_DINAMICO ='dinamico-1';
const CACHE_INMUTABLE ='inmutable-1';


self.addEventListener('install', evento =>{
    const promesa =caches.open(CACHE)
    .then(cache=>{
         return cache.addAll([
             //"/",
             "index.html",
             "css/style.css",
             "img/CWBE.png",
             "img/no-img.jpeg",
             "img/icons",
             "img/img1.jpeg",
             "img/img2.jpeg",
             "img/img3.jpeg",
             "img/img4.jpeg",
             "img/img5.jpeg",
             "img/img6.jpeg",
             "img/img7.jpeg",
             "js/app.js",
             "pages/offline.html"

             
            ]);
        });
        

evento.waitUntil(Promise.all([promesa ]));
});

self.addEventListener('activate', evento =>{
    const respuesta =caches.keys().then(keys =>{
        keys.forEach(key =>{
            if(key !== CACHE && key.includes("cache")){
                return caches.delete(key);
        }
    });
});
evento.waitUntil(respuesta);

});



self.addEventListener('fetch', evento =>{

//2
const respuesta=caches.match(evento.request) 
    .then(res=>{
        if (res) return res;
        console.log('No existe', evento.request.url);
         return fetch(evento.request)
          .then(resWeb=>{
              caches.open(CACHE_DINAMICO)
              .then(cache=>{
                  cache.put(evento.request,resWeb);
                  limpiarCache(CACHE_DINAMICO,50);
                 })
                 return resWeb.clone(); 
                });
            })
                .catch(err => {
                    if(evento.request.headers.get('accept').includes('text/html')){
                        return caches.match('/pages/offline.html');
                    }else{
                        return caches.matchç('img/no-img.jpeg');
                    }

                 });
     evento.respondWith(respuesta);
    });


   
function limpiarCache(nombreCache, numeroItems){
     caches.open(nombreCache)
     .then(cache=>{
         return cache.keys()
          .then(keys=>{
               if (keys.length>numeroItems){
                   cache.delete(keys[0])
                   .then(limpiarCache(nombreCache, numeroItems));
                 }
                });
            });
        }