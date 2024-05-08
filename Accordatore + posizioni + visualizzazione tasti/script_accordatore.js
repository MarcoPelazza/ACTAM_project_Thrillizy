document.addEventListener('DOMContentLoaded', () => {
    //const inputFrequency = document.getElementById('inputFrequency');
    const resultDisplay = document.getElementById('result');
    let audioContext;
    

    const initAudioButton = document.getElementById('initAudioButton');
    initAudioButton.addEventListener('click', initAudioContext); //click singolo o casino

    function initAudioContext() {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
         //Creazione contesto audio

        //Input microfono
        navigator.mediaDevices.getUserMedia({audio : true})
        .then(stream => {
            const microphone = audioContext.createMediaStreamSource(stream);
            //Inizializzazione low-pass filter
            const lowpassFilter = audioContext.createBiquadFilter();
            lowpassFilter.type = 'lowpass';
            lowpassFilter.frequency.value = 1000;
            //Inizializzazione analyser
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 8192;
            analyser.minDecibels = -90;
            analyser.maxDecibels = -10;
            analyser.smoothingTimeConstant = 0.8;
            microphone.connect(lowpassFilter);
            lowpassFilter.connect(analyser);
            const bufferLength = analyser.frequencyBinCount;
            var dataArray = new Float32Array(bufferLength);
            var targetNoteIndex = 8;
            var targetNote = frequencyToNoteDB[targetNoteIndex];
            document.getElementById('resultDisplay').innerHTML = 'La nota selezionata è: '+ targetNote[0];

            //Funzione per la frequenza attuale
            function getFrequency(){
                analyser.getFloatTimeDomainData(dataArray);
                var frequency = window.yin(dataArray, audioContext.sampleRate);
                console.log(frequency);

                var diff = handleNoteDifferences(targetNote, frequency, targetNoteIndex);
                console.log(diff);
                if(diff[0] <= 100){
                    console.log('TPAIN')
                    if(diff[1] === 'LOW'){
                        document.getElementById('freqRange').value = 100 - diff[0];
                        console.log('JoeBaldo')
                    }else if(diff[1] === 'HIGH'){
                        document.getElementById('freqRange').value = 100 + diff[0];
                        console.log('JoeBaldo4')
                    }

                }
                
            }
            setInterval(getFrequency,200);
        })
        .catch(error => {
            console.error('Errore apertura microfono', error);
        })
    }
}
)







const frequencyToNoteDB = [
    ['C3', 130.81],
    ['D3', 146.83],
    ['Eb3', 155.56],
    ['E3', 164.81],
    ['F3', 174.61],
    ['Gb3', 185.00],
    ['G3', 196.00],
    ['Ab3', 207.65],
    ['A3', 220.00],
    ['Bb3', 233.08],
    ['B3', 246.94],

    ['C4', 261.63],
    ['D4', 293.66],
    ['Eb4', 311.13],
    ['E4', 329.63],
    ['F4', 349.23],
    ['Gb4', 369.99],
    ['G4', 392.00],
    ['Ab4', 415.30],
    ['A4', 440.00],
    ['Bb4', 466.16],
    ['B4', 493.88],

    ['C5', 523.25],
    ['D5', 587.33],
    ['Eb5', 622.25],
    ['E5', 659.25],
    ['F5', 698.46],
    ['Gb5', 739.99],
    ['G5', 783.99],
    ['Ab5', 830.61],
    ['A5', 880.00],
    ['Bb5', 932.33],
    ['B5', 987.77],

    ['C6', 1046.50]
];

//sceglie indice casuale tra quelli del DB delle note
function noteChooser(){
    length = frequencyToNoteDB.length;
    return Math.floor(Math.random()*length);
}

//restituisce il valore in centesimi di semitono della differenza tra la frequenza della nota di target e quella misurata dal microfono
function handleNoteDifferences(targetNote, frequency, targetNoteIndex){
    var noteBefore = [];
    var noteAfter = [];
    var stateString = '';
    if((targetNoteIndex - 1) >= 0){
        noteBefore = frequencyToNoteDB[targetNoteIndex - 1];
    }else{
        noteBefore = ['B2',123.4708];
    }
    if(targetNoteIndex + 1 <= frequencyToNoteDB.length){
        noteAfter = frequencyToNoteDB[targetNoteIndex + 1];
    }else{
        noteAfter = ['Db6', 1108.731];
    }
    var centDown = (targetNote[1] - noteBefore[1])/100;
    var centUp = (noteAfter[1] - targetNote[1])/100;
    var centDiff = 1010;

    console.log('NoteBefore: ' + noteBefore);
    console.log('NoteAfter: ' + noteAfter);

    console.log('CentDown: ' + centDown);
    console.log('centUp: ' + centUp);

    if(frequency < noteBefore[1]){
        console.log('Napoli1');
        stateString = 'LOW'
    }else if(frequency > noteAfter[1]){
        console.log('Napoli2');
        stateString =  'HIGH'
    }else if(frequency <= targetNote[1]){
        console.log('Napoli3');
        centDiff = (targetNote[1] - frequency)/centDown;
        stateString = 'LOW'
    }else if (frequency > targetNote[1]){
        console.log('Napoli4')
        centDiff = (frequency - targetNote[1])/centUp;
        stateString = 'HIGH'
    }
    return [centDiff, stateString];
}