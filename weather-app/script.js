
let lokacija = document.getElementById("location") ; 
let tempIcon = document.getElementById("temp-icon") ; 
let tempValue=document.getElementById("temp-value") ; 
let climate = document.getElementById("climate") ; 
let iconFile ; 

window.addEventListener("load",()=> {
    let long ; 
    let lat ; 

    if(navigator.geolocation){ // ovo znaci da ako je user prihvatio da da svoju lokaciju onda uradi sledece
        navigator.geolocation.getCurrentPosition(position =>{  //getcurrenetpostion ce da vrati trenutnu poziciju korisnika u promenljivu position
            
            long=position.coords.longitude ; 
            lat=position.coords.latitude ; 

          const proxy = "https://cors-anywhere.herokuapp.com/" ; 

            const api= `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5bc1ebf8ec0c931112749db2a7242257&lang=sr`; 
                      //stavicemo sve u tempplate literals sa ovim obrunutim  navodnicima i nakon toga dodajemo dolar ispred lat i long 
                                                                            /*i moracemo da pastujemo nas api key*/
            
            fetch(api)
               .then(response => { 
                   return response.json() ;     //i sada taj odgovor koji dobijemo pretvorimo u Json  
               })
               .then(data =>{ 
                const {name}  = data ;              //name dobija vrednost "Centralna srbija"//ovo {name} je object  destructuring i to ce da napravi const promenljivu name i uzece vrednost atributa name iz objekta data koji je u stavari json koji smo dobili sa svim infomracijama o vremenu 
                const {feels_like} = data.main ;    //felslike dobija vrednost 282    // ovo pravi promenlivu fellslike koja uzima vrednosti atriubuta feelslike u objektu data.main i mora ovo .main jer se feels like nalazi u mainu
                const {id,description} = data.weather[0] ; //id je 800 i main je "clear"     //ovo je napravilo dve promenljive id i main koje su uzele vrednosti iz niza objekata weather sa indexom nula

                
                lokacija.textContent = name ;      //dodeli smo u  htmlu text lokacije
                climate.textContent = description ; 
                tempValue.textContent=Math.round(feels_like-273) ; // ovo round ce da zaokruzi neki broj posto ga prvo oduzmemo sa 273 da bi prebacili u celziuse 
                
                // sto se tice ovog ID-a on ce nam reci kakvu da stavimo ikonicu npr ID koji pocinju sa 2 znace da je grmljavina sa 3 da je suncano itd itd 
                let ikona= "02n" ;  

                if(id<250){
                    tempIcon.src = "images/storm.svg" ; 
                }
                else if(id<350){
                    tempIcon.src = "images/drizzle.svg" ; 
                }
                 else if(id<550){
                    tempIcon.src = "images/rain.svg" ; 
                }
                else if(id<650){
                    tempIcon.src = "images/snow.svg" ; 
                }
                else if(id<800){
                    tempIcon.src = "images/atmosphere.svg" ; 
                }
                else if(id===800){
                    tempIcon.src = "images/sun.svg" ; 
                }
                else if(id>800){
                    tempIcon.src = `http://openweathermap.org/img/wn/${ikona}@2x.png` ; 
                }





                //i sada taj odgovor u jsonu smo stavili u neki parametar data i ispislai u consoli
                   console.log(data);          
                                                //ali ce izaci eror zbog "same origin polici "i to mozemo da resimo tako sto odemo na stajt
                                                //crosanywhere.hirokuapp i kopiramo link od tog sajta i stavimo ga u neku promenljivu proxy
               })                            // i moramo da dodamo taj proxi pre api linka : ${proxy}
    
    
    
                                                }) ; 
    }


}) ; 