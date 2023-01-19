// In your Javascript (external .js resource or <script> tag)

$(document).ready(function() {
    fetch("./tournaments.json").then((response) => response.json()).then((data) => {
        keys = Object.keys(data);
        keys.forEach(id => {
            var option = new Option(data[id]['name'], id)
            $('.tournament-select').append(option).trigger('change')
        });
    })
    $('.tournament-select').select2();
});

$(document).ready(function() {
    $('.player-select').select2();
});

$('.tournament-select').on('select2:select', function(e){
    $(".player-select").find('option').remove().end()
    var data = e.params.data
    var filename = "./tournaments/" + data.id + '.json'
    fetch(filename).then((response) => response.json()).then((data) => {
        keys = Object.keys(data);
        keys.forEach(id =>{
            var option = new Option(data[id]['tag'], id)
            $('.player-select').append(option).trigger('change')
        });
    })
})

async function submit(){
    
    var tournament = $('.tournament-select').select2('data')[0].id
    var filename = "./tournaments/" + tournament+ '.json'
    var selected = $('.player-select').select2('data');
    const t_parts = await (await fetch(filename)).json()
    
    cal = ics()

    for (const player of selected){
        var tag = t_parts[player.id]['tag']
        var entrants = t_parts[player.id]['entrants']
        for (const entrant of entrants){
            eventFile = './events/' + entrant['event'] + '.json'
            phaseFile = './event_phases/' + entrant['event'] + 'PhaseGroups.json'
            event_data = await (await fetch(eventFile)).json()
            phase_data = await (await fetch(phaseFile)).json()
            tournament_data = await (await fetch("./tournaments.json")).json()
            
            eventName = tournament_data[tournament]['events'][entrant['event']]
            phaseId = event_data[entrant['id']]
            phase = phase_data[phaseId]
            console.log(phase['groupTime'])
            pool = phase['name']
            time = Number(phase['groupTime'])
            phaseName = phase['phaseName']
            var newDate = new Date(time * 1000)
            console.log(newDate)
            event_name = tag + " "+ eventName + " " + phaseName + " " +  pool
            cal.addEvent(event_name, event_name, '', newDate, newDate)


        }
    }
    var tournament_name = $('.tournament-select').select2('data')[0].text
    cal.download(tournament_name)
}


