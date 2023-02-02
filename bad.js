async function loadTournaments(){
    fetch("./tournaments.json").then((response) => response.json()).then((data) => {
       keys = Object.keys(data)
       var arr = []
       keys.forEach(element => {
           arr.push(data[element]['name'])
       })
       console.log(arr)
   
       const select = document.createElement("select")
       select.className = "tournament-select"
       select.name = "tournament"
       select.style = "width: 50%"
       keys.forEach(id => {
           const option = document.createElement("option")
           option.value = id
           option.innerText = data[id]["name"]
           select.appendChild(option)
       })
       const newDiv = document.createElement("div")
       newDiv.appendChild(select)
       document.body.appendChild(newDiv)
       // In your Javascript (external .js resource or <script> tag)
       $(document).ready(function() {
           $('.tournament-select').select2();
       });
   
   
       $('.tournament-select').on('select2:select', function(e){
           var data = e.params.data;
           console.log(data.id);
          
           if($(".player-select").length === 0){
               console.log("YEAAYA")
           }
           else{
               $('.player-select').val(null).trigger('change');
           }
   
   
           var filename = "./tournaments/" + data.id + ".json"
           fetch(filename).then((response) => response.json()).then((data) =>{
               
               
               console.log(data)
               const select = document.createElement("select")
               select.className = "player-select"
               select.name = "players"
               select.multiple="multiple"
               select.style = "width: 50%"
               keys = Object.keys(data)
               keys.forEach(id => {
                   const option = document.createElement("option")
                   option.value = id
                   option.innerText = data[id]["tag"]
                   select.appendChild(option)
               }) 
               const element = document.getElementsByClassName("tournament_select")
               document.body.appendChild(select)
   
               $(document).ready(function() {
                   $('.player-select').select2();
               });
           })
           const select = "player"
           $(document).ready(function() {
               $('.player-select').select2();
           });
       })
   
   
       
   });
   
   }
   
   async function main(){
       await loadTournaments().then(() => {
       console.log($('#tournament-select').select2('data'));
       })
   }

   main()
   
   
   
   
   
   
   

   fetch(filename).then((response) => response.json()).then((data) => {
       
       cal = ics()
       var cal_events = []
       var addEvents = new Promise((resolve, reject) => {
       selected.forEach(e =>{
           var entrants = data[e.id]['entrants']
           var tag = data[e.id]['tag']
           entrants.forEach(entrant => {
               eventFile = './events/' + entrant['event'] + '.json'
               phaseFile = './event_phases/' + entrant['event'] + 'PhaseGroups.json'
               Promise.all([
                   fetch('./tournaments.json').then((resp => resp.json())),
                   fetch(eventFile).then((resp => resp.json())),
                   fetch(phaseFile).then((resp => resp.json()))
               ]).then(texts =>{
                   thing = Object()
                   eventName = texts[0][tournament]['events'][entrant['event']]
                   phaseId = texts[1][entrant['id']]
                   phase = texts[2][phaseId]
                   pool = phase['name']
                   time = Number(phase['groupTime'])
                   phaseName = phase['phaseName']
                   date = Date(time * 1000)
                   event_name = tag + " "+ eventName + " " + phaseName + " " +  pool
                   cal.addEvent(event_name, " ", " ", date, date)
                   thing['event_name'] = event_name
                   thing['date'] = date
                   cal_events.push(thing)
                   

               })
               
           })
           
           
   })
   })

   }
   )
   