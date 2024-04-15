class Position{
    constructor(note, frets, number){
        this.note = note;
        this.frets = frets;
        this.number = number;
    }
    getNote(){
        return this.note;
    }
    getFrets(){
        return this.frets;
    }
    getNumber(){
        return this.number;

    }
    getBinaryFrets(){
        this.binaryFrets = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        for(let element of this.frets){
            this.binaryFrets[element - 1] = 1;
        }
        return this.binaryFrets;
    }
    print(){
        console.log('Note = ' + this.note);
        console.log('Frets = ' + this.frets);
        console.log('Number = ' + this.number);
        this.bFrets = this.getBinaryFrets();
        console.log('Binary Frets = ' + this.bFrets);
    }
}

class ThrillsOfNote{
    constructor(position, dict){
        this.position = position; //oggetto di tipo position
        this.frets1t = dict['frets1t'];
        this.frets2t = dict['frets2t'];
        this.frets3t = dict['frets3t'];
        this.frets4t = dict['frets4t'];
        this.note1t = dict['note1t'];
        this.note2t = dict['note2t'];
        this.note3t = dict['note3t'];
        this.note4t = dict['note4t'];
        this.referenceNote = this.position.getNote();
        this.dict = dict;
    }
    getBinaryFrets(frets){
        let binaryThrill = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        if(frets != null)
        for (let element of frets){
            binaryThrill[element - 1]  = 1;
        }else{
            binaryThrill = null;
        }
        return binaryThrill;
    }
    getThrills(){
       


        const thrills = {
            'reference-note': this.referenceNote,
            'sup-thrill-note1': this.note1t,
            'sup-thrill-note2': this.note2t,
            'inf-thrill-note1': this.note3t,
            'inf-thrill-note2': this.note4t,
            'sup-thrill-frets1': this.frets1t,
            'sup-thrill-frets2': this.frets2t,
            'inf-thrill-frets1': this.frets3t,
            'inf-thrill-frets2': this.frets4t,
            'sup-thrill-frets1-binary': this.getBinaryFrets(this.frets1t),
            'sup-thrill-frets2-binary': this.getBinaryFrets(this.frets2t),
            'inf-thrill-frets1-binary': this.getBinaryFrets(this.frets3t),
            'inf-thrill-frets2-binary': this.getBinaryFrets(this.frets4t),
            'positions': this.positionAlterationManager()
        };
        if (Array.isArray(thrills["sup-thrill-frets1"]) && thrills.positions != null){
            for(let el of thrills["sup-thrill-frets1"]){
                thrills.positions["sup-1"][el - 1]= 2;
            }
        }
        if (Array.isArray(thrills["sup-thrill-frets2"]) && thrills.positions != null){
            for(let el of thrills["sup-thrill-frets2"]){
                thrills.positions["sup-2"][el - 1]= 2;
            }
        }
        
        if (Array.isArray(thrills["inf-thrill-frets1"])){
            for(let el of thrills["inf-thrill-frets1"]){
                thrills.positions["sup-3"][el - 1]= 2;
                
            }
        }
        
        if ( Array.isArray (thrills["inf-thrill-frets2"]) && thrills.positions != null){
            for(let el of thrills["inf-thrill-frets2"]){
                thrills.positions["sup-4"][el - 1]= 2;
            }
        }
        
        return thrills;
    }
    positionAlterationManager(){
        let altered_positions = [];
        if(this.dict['isalt']){
            let i = 1;
            for(let el of this.dict['walt']){
                let b = this.position.getBinaryFrets();
                if(this.dict['alt']['add' + i.toString()] != null){
                    const toAdd = this.dict['alt']['add' + i.toString()];
                    for(const f of toAdd){
                        b[f-1] = 1;
                    }
                }
                if(this.dict['alt']['rem' + i.toString()] != null){
                    const toRemove = this.dict['alt']['rem' + i.toString()];
                    for (const c of toRemove){
                        b[c-1] = 0;
                    }
                }
                altered_positions.push(el);
                altered_positions.push(b);
                i++;
            }
        }
        let obj = {};
        let arr = [1,2,3,4];
        for(let i = 0; i<altered_positions.length; i = i+2){
            if(altered_positions[i] === 1){
                obj['sup-1'] = altered_positions[i+1];
                arr[0] = 0;
            }else if(altered_positions[i] === 2){
                obj['sup-2'] = altered_positions[i+1];
                arr[1] = 0;
            }else if(altered_positions[i] ===3){
                obj['sup-3'] = altered_positions[i+1];
                arr[2] = 0;
            }else if(altered_positions[i] === 4){
                obj['sup-4'] = altered_positions[i+1];
                arr[3] = 0;
            }
        }
        for (let el of arr){
            if (el != 0){
                obj['sup-' + el.toString()] = this.position.getBinaryFrets()
            }
        }
        return obj;
    }
}    

//Fornito il nome della nota, ritorna la posizione corrispondente
function getPositionFromNote(note, positions) {
    for (let i = 0; i < positions.length; i++) {
        if (positions[i].getNote() === note) {
            rt = positions[i].getBinaryFrets();
            return rt;
        }
    }
    alert('The provided note is not in the flute extension');
    return null;
  }

  //Funzione che a partire dagli array delle posizioni e delle note ne crea uno di oggetti Position
function initializePositions(notes, positions){
    let ps = [];
    if (notes.length != positions.length){
        alert('number mismatch between positions and note');
        return null;
    }
    for (let i = 0; i<positions.length; i++){
        const p = new Position(notes[i], positions[i], i);
        ps.push(p)
    }
    return ps;
}


//Funzione che a partire dalle posizioni e dal database dei trilli crea un array di oggetti thrils
function initializeThrills(positions, thrillsDB) {
    let ts = [];
    console.log('positions length: ' + positions.length)
    console.log('thrillsDB length: ' + thrillsDB.length)
    if (positions.length !== thrillsDB.length) {
        alert('Incorrect number of elements in DB');
        return null;
    }
    for (let i = 0; i < positions.length; i++) {
        const t = new ThrillsOfNote(positions[i], thrillsDB[i]);
        ts.push(t);
    }
    return ts;
}


//Array di tutte le posizioni in ordine crecente di altezza delle note
const pos = [
    [1,3,4,5,8,10,12,14,15],
    [1,3,4,5,8,10,12,14],
    [1,3,4,5,8,10,12],
    [1,3,4,5,8,10,12,13],
    [1,3,4,5,8,10,13],
    [1,3,4,5,8,13],
    [1,3,4,5,12,13],
    [1,3,4,5,13],
    [1,3,4,5,6,13],
    [1,3,4,13],
    [1,3,7,13],
    [1,3,13],
    [1,13],
    [13],
    [3,4,5,8,10,12],
    [3,4,5,8,10,12,13],
    [1,3,4,5,8,10,13],
    [1,3,4,5,8,13],
    [1,3,4,5,12,13],
    [1,3,4,5,13],
    [1,3,4,5,6,13],
    [1,3,4,13],
    [1,2,13],
    [1,3,13],
    [1,13],
    [13],
    [3,4,5,13],
    [1,3,4,5,6,8,10,12,13],
    [1,3,4,8,10,13],
    [1,3,5,8,13],
    [1,3,5,12,13],
    [1,4,5,13],
    [4,5,6,13],
    [3,4,8,13],
    [2,8,9],
    [1,3,5,11],
    [1,4,5,6,8]
];


//Array dei nomi di tutte le note in ordine crescente
const notes = ['C3', 'Db3', 'D3', 'E3b', 'E3', 'F3', 'G3b', 'G3', 'A3b', 'A3', 'B3b', 'B3', 'C4', 'D4b', 'D4', 'E4b', 'E4', 'F4', 'G4b', 'G4', 'A4b', 'A4', 'B4b', 'B4', 'C5', 'D5b', 'D5', 'E5b', 'E5', 'F5', 'G5b', 'G5', 'A5b', 'A5', 'B5b', 'B5', 'C6'];

//Array contente i dizionario che definiscono i trilli per ogni nota DA RIVEDERE!
const th = [
    //Prima Ottava
    {
        'frets1t': [14,15],
        'frets2t': null,
        'frets3t': null,
        'frets4t': null,
        'note1t': 'D3',
        'note2t': null,
        'note3t': null,
        'note5t': null,
        'isalt': false
    },
    {
        'frets1t': [14],
        'frets2t': null,
        'frets3t': [15],
        'frets4t': null,
        'note1t': 'D3',
        'note2t': null,
        'note3t': 'C3',
        'note4t': null,
        'isalt': false
    },
    {
        'frets1t': [13],
        'frets2t': [12],
        'frets3t': [14],
        'frets4t': [14, 15],
        'note1t': 'E3b',
        'note2t': 'E3',
        'note3t': 'D3b',
        'note4t': 'C3',
        'isalt': false
    },
    {
        'frets1t': [12],
        'frets2t': [10,12],
        'frets3t': [13],
        'frets4t': null,
        'note1t': 'E3',
        'note2t': 'F3',
        'note3t': 'D3',
        'note4t': null,
        'isalt': false
    },
    {
        'frets1t': [10],
        'frets2t': [8],
        'frets3t': [12],
        'frets4t': [12],
        'note1t': 'F3',
        'note2t': 'G3b',
        'note3t': 'E3b',
        'note4t': 'D3',
        'isalt': true,
        'walt':[4],
        'alt':{
            'add1': null,
            'rem1':[13],
        }
    },
    {
        'frets1t': [8],
        'frets2t': [8],
        'frets3t': [10],
        'frets4t': [10,12],
        'note1t': 'G3b',
        'note2t': 'G3',
        'note3t': 'E3',
        'note4t': 'E3b',
        'isalt': true,
        'walt': [1],
        'alt': {
            'add1': [12],
            'rem1': null,
        }
    },
    {
        'frets1t': [12],
        'frets2t': [6],
        'frets3t': [8],
        'frets4t': [8],
        'note1t': 'G3',
        'note2t': 'A3b',
        'note3t': 'F3',
        'note4t': 'E3',
        'isalt': true,
        'walt': [4],
        'alt': {
            'add1': [10],
            'rem1': [12]
        }
    },
    {
        'frets1t': [6],
        'frets2t': [5],
        'frets3t': [12],
        'frets4t': [8],
        'note1t': 'A3b',
        'note2t': 'A3',
        'note3t': 'G3b',
        'note4t': 'F3',
        'isalt': false
    },
    {
        'frets1t': [5],
        'frets2t': [4],
        'frets3t': [6],
        'frets4t': [6],
        'note1t': 'A3',
        'note2t': 'Bb3',
        'note3t': 'G3',
        'note4t': 'G3b',
        'isalt': true,
        'walt': [2,4],
        'alt': {
            'add1': [2],
            'rem1':[3],
            'add2': [12],
            'rem2': null
        }
    },
    {
        'frets1t': [4],
        'frets2t': [4],
        'frets3t': [5],
        'frets4t': [5],
        'note1t': 'B3',
        'note2t': 'B3b',
        'note3t': 'A3b',
        'note4t': 'G3',
        'isalt': true,
        'walt': [2,3],
        'alt': {
            'add1': [2],
            'rem1': [3],
            'add2': [5,6],
            'rem2': null
        }
    },
    {
        'frets1t': [7],
        'frets2t': [2],
        'frets3t': [4],
        'frets4t': [4],
        'note1t': 'B3',
        'note2t': 'C4',
        'note3t': 'A3',
        'note4t': 'A3b',
        'isalt': true,
        'walt': [2,4],
        'alt': {
            'add1': [2],
            'rem1': [3],
            'add2': [2,4,5,6],
            'rem2': [3,7]
        }
    },
    {
        'frets1t': [3],
        'frets2t': [1,3],
        'frets3t': [7],
        'frets4t': [4],
        'note1t': 'C4',
        'note2t': 'D4b',
        'note3t': 'B3b',
        'note4t': 'A3',
        'isalt': false
    },
    //Seconda Ottava
    {
        'frets1t': [1],
        'frets2t': [9],
        'frets3t': [3],
        'frets4t': [2],
        'note1t': 'D4b',
        'note2t': 'D4',
        'note3t': 'B3',
        'note5t': 'B3b',
        'isalt': false
    },
    {
        'frets1t': [9],
        'frets2t': [11],
        'frets3t': [1],
        'frets4t': [1,3],
        'note1t': 'D4',
        'note2t': 'E4b',
        'note3t': 'C4',
        'note4t': 'B3',
        'isalt': false
    },
    {
        'frets1t': [13],
        'frets2t': [12],
        'frets3t': [9],
        'frets4t': [9],
        'note1t': 'E4b',
        'note2t': 'E4',
        'note3t': 'D4b',
        'note4t': 'C4',
        'isalt': true,
        'walt': [3,4],
        'alt':{
            'add1': [13],
            'rem1': [3,4,5,8,10,12],
            'add2': [1,13],
            'rem2': [3,4,5,8,10,12],
        }
    },
    {
        'frets1t': [12],
        'frets2t': [10,12],
        'frets3t': [13],
        'frets4t': [11],
        'note1t': 'E4',
        'note2t': 'F4',
        'note3t': 'D4',
        'note4t': 'D4b',
        'isalt': true,
        'walt': [4],
        'alt': {
            'rem1': [3,4,5,8,10,12],
            'add1': null
        }
    },
    {
        'frets1t': [10],
        'frets2t': [8],
        'frets3t': [12],
        'frets4t': [12],
        'note1t': 'F4',
        'note2t': 'G4b',
        'note3t': 'E4b',
        'note4t': 'D4',
        'isalt': true,
        'walt': [4],
        'alt':{
            'add1': null,
            'rem1': [13],
        }
    },
    {
        'frets1t': [8],
        'frets2t': [8],
        'frets3t': [10],
        'frets4t': [10,12],
        'note1t': 'G4b',
        'note2t': 'G4',
        'note3t': 'E4',
        'note4t': 'E4b',
        'isalt': true,
        'walt': [1],
        'alt': {
            'add1':[12],
            'rem1':null,
        }
    },
    {
        'frets1t': [12],
        'frets2t': [6],
        'frets3t': [8],
        'frets4t': [8],
        'note1t': 'G4',
        'note2t': 'A4b',
        'note3t': 'F4',
        'note4t': 'E4',
        'isalt': true,
        'walt': [4],
        'alt': {
            'add1': [10],
            'rem1': [12],
        }
    },
    {
        'frets1t': [6],
        'frets2t': [5],
        'frets3t': [12],
        'frets4t': [8],
        'note1t': 'A4b',
        'note2t': 'A4',
        'note3t': 'G4b',
        'note4t': 'F4',
        'isalt': false
    },
    {
        'frets1t': [5],
        'frets2t': [4],
        'frets3t': [6],
        'frets4t': [6],
        'note1t': 'A4',
        'note2t': 'Bb4',
        'note3t': 'G4',
        'note4t': 'G4b',
        'isalt': true,
        'walt': [2,4],
        'alt': {
            'add1': [2],
            'rem1': [3],
            'add2': [12],
            'rem2': null,
        }
    },
    {
        'frets1t': [4],
        'frets2t': [4],
        'frets3t': [5],
        'frets4t': [5],
        'note1t': 'B4',
        'note2t': 'B4b',
        'note3t': 'A4b',
        'note4t': 'G4',
        'isalt': true,
        'walt': [2,3],
        'alt':{
            'add1': [2],
            'rem1': [3],
            'add2': [5,6],
            'rem2': null 
        }
    },
    {
        'frets1t': [7],
        'frets2t': [2],
        'frets3t': [4],
        'frets4t': [4],
        'note1t': 'B4',
        'note2t': 'C5',
        'note3t': 'A4',
        'note4t': 'A4b',
        'isalt': true,
        'walt': [1,4],
        'alt':{
            'add1': [3],
            'rem1': [2],
            'add2': [4,5,6],
            'rem2': null
        }
    },
    {
        'frets1t': [3],
        'frets2t': [1,3],
        'frets3t': [7],
        'frets4t': [4],
        'note1t': 'C5',
        'note2t': 'D5b',
        'note3t': 'Bb4',
        'note4t': 'A4',
        'isalt': false
    },
    //Terza Ottavva
    {
        'frets1t': [1],
        'frets2t': [9],
        'frets3t': [3],
        'frets4t': [2],
        'note1t': 'D5b',
        'note2t': 'D5',
        'note3t': 'B4',
        'note5t': 'B4b',
        'isalt': false
    },
    {
        'frets1t': [9],
        'frets2t': [11],
        'frets3t': [1],
        'frets4t': [1,3],
        'note1t': 'D5',
        'note2t': 'E5b',
        'note3t': 'C5',
        'note4t': 'B4',
        'isalt': false
    },
    {
        'frets1t': [6],
        'frets2t': [5],
        'frets3t': [9],
        'frets4t': [9],
        'note1t': 'E5b',
        'note2t': 'E5',
        'note3t': 'D5b',
        'note4t': 'C5',
        'isalt': true,
        'walt': [3,4],
        'alt':{
            'add1': [9],
            'rem1': [3,4,5],
            'add2': [1,9],
            'rem2': [3,4,5],
        }
    },
    {
        'frets1t': [5],
        'frets2t': [4,5],
        'frets3t': [6],
        'frets4t': [11],
        'note1t': 'E5',
        'note2t': 'F5',
        'note3t': 'D5',
        'note4t': 'D5b',
        'isalt': true,
        'walt': [3,4],
        'alt':{
            'add1': null,
            'rem1': [1,2,6,8,9,10,12],
            'add2': null,
            'rem2': [1,3,4,5,6,8,9,10,12]
        }
    },
    {
        'frets1t': [4],
        'frets2t': [3],
        'frets3t': [5],
        'frets4t': [5],
        'note1t': 'F5',
        'note2t': 'G5b',
        'note3t': 'E5b',
        'note4t': 'D5',
        'isalt': true,
        'walt': [3,4],
        'alt':{
            'add1': [5,6,12],
            'rem1': null,
            'add2': null,
            'rem2': [1,8,10]
        }
    },
    {
        'frets1t': [8],
        'frets2t': [3],
        'frets3t': [4],
        'frets4t': [4,5],
        'note1t': 'G5b',
        'note2t': 'G5',
        'note3t': 'E5',
        'note4t': 'E5b',
        'isalt': true,
        'walt': [1,3,4],
        'alt': {
            'add1': [12],
            'rem1': null,
            'add2': [4,10],
            'rem2': [5],
            'add3': [4,6,10,12],
            'rem3': null,
        }
    },
    {
        'frets1t': [3],
        'frets2t': [1,3],
        'frets3t': [8],
        'frets4t': [3],
        'note1t': 'G5',
        'note2t': 'A5b',
        'note3t': 'F5',
        'note4t': 'E5',
        'isalt': true,
        'walt': [4],
        'alt':{
            'add1':[4,8,10],
            'rem1': [12]
        }
    },
    {
        'frets1t': [9],
        'frets2t': [6,9,11],
        'frets3t': [3],
        'frets4t': [3],
        'note1t': 'A5b',
        'note2t': 'A5',
        'note3t': 'G5b',
        'note4t': 'F5',
        'isalt': true,
        'walt': [3,4],
        'alt':{
            'add1': [12],
            'rem1': [4],
            'add2': [8],
            'rem2': [4]
        }
    },
    {
        'frets1t': [9],
        'frets2t': [9,11],
        'frets3t': [9],
        'frets4t': [1,3],
        'note1t': 'A5',
        'note2t': 'B5b',
        'note3t': 'G5',
        'note4t': 'G5b',
        'isalt': true,
        'walt': [3,4],
        'alt':{
            'add1': [1],
            'rem1':[6],
            'add2': [1,12],
            'rem2': [4,6]

        }
    },
    {
        'frets1t': [4,8],
        'frets2t': [4],
        'frets3t': [9],
        'frets4t': [6,9,11],
        'note1t': 'B5',
        'note2t': 'B5b',
        'note3t': 'A5b',
        'note4t': 'G5',
        'isalt': true,
        'walt': [3,4],
        'alt':{
            'add1': [5,6],
            'rem1': [3,8],
            'add2': [1,5],
            'rem2': [3,8]
        }
    },
    {
        'frets1t': [8,9],
        'frets2t': [2,4],
        'frets3t': [4],
        'frets4t': [9,11],
        'note1t': 'B5',
        'note2t': 'C6',
        'note3t': 'A5',
        'note4t': 'A5b',
        'isalt': true,
        'walt': [2,3,4],
        'alt':{
            'add1': [1,5,11,12,13],
            'rem1': [8,9],
            'add2': [3,4,13],
            'rem2': [2,9],
            'add3': [4,5,6],
            'rem3': [2,8]
        }
    },
    {
        'frets1t': [3],
        'frets2t': null,
        'frets3t': [8,9],
        'frets4t': [4,8],
        'note1t': 'C6',
        'note2t': null,
        'note3t': 'B5b',
        'note4t': 'A5',
        'isalt': true,
        'walt': [3,4],
        'alt':{
            'add1': null,
            'rem1': [11],
            'add2': [12],
            'rem2': [11]
        }
    },
    {
        'frets1t': null,
        'frets2t': null,
        'frets3t': [3],
        'frets4t': [3,4],
        'note1t': null,
        'note2t': null,
        'note3t': 'B5',
        'note4t': 'B5b',
        'isalt': true,
        'walt': [3,4],
        'alt':{
            'add1': [11,12],
            'rem1': [4,6,8],
            'add2': [11,12],
            'rem2': [4,6,8]
        }
    }
];



//TEST
const p = initializePositions(notes,pos);
const c = initializeThrills(p,th);


var noteNames = [];

var i = 0;
//Ciclo per inizializzare il vettore di tutte le note per poi sceglierne una in modo casuale
for(let element of p){
    //element.print();
    noteNames[i] = element.getNote();
    console.log(noteNames[i]);
    i++;
}


 //variabili per la definizione del trillo
var isthrill = false;
var sup1 = false;
var sup2 = false;
var sup3 = false;
var sup4 = false;

var setting = [] //array che definisce cosa deve essere inserito nel vettore delle posizioni
 
function run(){

    if (isthrill === true){
        if(sup1 === false && sup2 === false && sup3 === false && sup4 === false){
            alert('AO SCEGLI UN TRILLO')
        }else{
            const randomThrill = c[Math.floor(Math.random()*c.length)];
            var q = randomThrill.getThrills();

            if (sup1 === true){
                setting = q.positions['sup-1'];
            }

            if (sup2 === true){
                setting = q.positions['sup-2'];
            }
            if (sup3 === true){
                setting = q.positions['sup-3'];
            }
            if (sup4 === true){
                setting = q.positions['sup-4'];
            }

        }
    }else{
        const randomNote = noteNames[Math.floor(Math.random()*noteNames.length)];
        setting = getPositionFromNote(randomNote, p);
    }
    //console.log("Posizione " + randomNote + " è " + setKeys);

    //GIOBALDO
    const img = document.getElementById('image');
    const svg = document.getElementById('svgKeys');

    //image and svg resizing
    img.style.resize='vertical';
    img.height = window.innerHeight;
    H = img.height;
    W = img.width;

    //$(window).resize()
    console.log(flute);
    console.log(img);

    svg.style.height = H;
    svg.style.width = W;
    //
    names = ['key1','key2','key3','key4','key5','key6','key7','key8','key9','key10','key11','key12','key13','key14','key15'];
    //setting = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    //setting = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    for (var n=0; n<15; n++){
        const o = document.getElementById(names[n]);
        if (setting[n] == 1){
            o.style.fill = 'rgba(20, 10, 10, 0.7)';
        } else {
            if (setting[n] == 2){
                o.style.fill = 'rgba(200, 0, 0, 0.8)';
            }
            else {o.style.fill = 'rgba(200, 200, 300, 0.1)';
        }
    }
    }
     //GIOBALDO

}

function choose(thrill, type, typeString){
    console.log("Napoli")
    if(thrill === true){
        isthrill = !isthrill;
    }else{
        if (type === true){
            if(isthrill === false){
                alert("Activate the thrils button");
            }else{
                if(typeString === "sup1"){
                    sup1 = true;
                    sup2 = false;
                    sup3 = false;
                    sup4 = false;
                }
                if(typeString === "sup2"){
                    sup1 = false;
                    sup2 = true;
                    sup3 = false;
                    sup4 = false;
                }
                if(typeString === "sup3"){
                    sup1 = false;
                    sup2 = false;
                    sup3 = true;
                    sup4 = false;
                }
                if(typeString === "sup4"){
                    sup1 = false;
                    sup2 = false;
                    sup3 = false;
                    sup4 = true;
                }
            }
        }
    }
    console.log('Sup1: ' + sup1);
    console.log('Sup2: ' + sup2);
    console.log('Sup3: ' + sup3);
    console.log('Sup4: ' + sup4);
    console.log('Isthrill: ' + isthrill);
}
