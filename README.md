# THRILLIZY

## A Graphic Interface To Learn How To Play The Transverse Flute

If you are starting to approach the world of the transverse flute, whether self-taught or not, you're at the right place. 
May you be a self-taught musician and you want to learn the right positions of the instrument, or may you be an already trained flutist and often you've difficulty in remembering right positions, expecially for high octaves and trills, this website is designed for you.

This project is the result of a team work for the course _Advanced Coding Tools and Methodologies_ of the M.S. Degree _Music and Acoustic Engineering_ at Politecnico di Milano.

## How Can I Use It?

The graphic interface allows you to insert notes on the staff, giving you the possibility of choosing whether the note is altered or not and then the relative flute position will appear on the display. Moreover, it's also possible to listen the right sound of that note and verify if the note played by the flutist is correct or not, through a tuner connected to the microphone.

### Video DEMO

Here is a quick video tutorial:
METTERE VIDEO!
<video src="./Video_demo.mp4" controls title="Title"></video

Don't worry, anything shown in the video will be explained below in this page.

### Choosing the note 

The very first step to follow to use this website is to have the flute in hand and a lot of good will. 

The staff which will appear on the display will allow you to select the note whose position you want to know/remember. The reference adopted for the staff is the treble clef without any key signature: for this reason is therefore possible to choose if the note is altered or not by pressing, before the note, one of the two buttons respectively corresponding to sharp `♯` or flat `♭`.

It's also possibile to select notes below or above the staff, thanks to the ledger lines put as a reference while pointing with the mouse on the staff.

After this the note will appear on the staff.
Obviously it will be only possible to choose the notes that are within the range of the transverse flute, therefore from the `C3` to the `C6`.


### Looking at the position

Once you've selected the note on the staff, the relative position will appear on the flute picture put on the left side, in particular the keys to press will be seen in black.

Note that the keys to press with the thumb of the left hand, which are not visible in the view in which the flute has been drawn, are positioned detached from the body of the flute, in correspondence of its real position.

And that's it!
You're done!
Now it's time to play!
### Can I listen to the right position sound?
Yes. As you can see, there is a radio positioned in the top right and by pressing it you will hear the correct sound.
### How can I verify if the note I'm playing is correct?
It's also possible to verify the correct execution of the note by using the `Tuner` box positioned in the bottom right corner. It requires the access to the microphone and then you can check also the tuning of the sound.
### What about trills?
The trill is a musical ornament consisting of a rapid alternation between two adjacent notes, usually a semitone or tone apart. 

On this website a beginner flute can also learn how to play them. 

The steps to follow are very similar to those of the single note positions. After you've selected the note on the staff you can also select the type of trill to play. For each note it's possible to choose between four different trills in the `TRILLS` box: one for a semitone above (`SUP1`), one for a tone above (`SUP2`), one for a semitone below (`INF1`) and one for a tone below (`INF2`).
The flute picture will show the fixed keys to press in black as usual, while the key which will be moved for the execution of the trill will appear colored in red.
### Can I see the trill positions for all the notes?
Not all the notes allow the execution of trills, this depends on the range of the flute: for instance for the `C3`, which is the lowest note for a transverse flute, it's only possible to execute the two upper trills. For this reason, for the notes that are at the edges of the flute range, not all the trill buttons can be pressed.
### Can I also check the correct execution of the trills?
You can obviously listen to the correct execution of each trill, by pressing the radio as for single notes, but it's not possible to use the `Tuner` box, as it works only for one note at time, since you will be playing more than one note simultaneously.
### Is There Anything Else It Can Do?

> It ain't much, but it's honest work.


## How Does It Work?
### Block diagram

This project is composed of one HTML file, one CSS file and four JavaScript files:

* `Script_accordatore.js`: is the management of the tuner.
* `Script.js`: is the management of the staff.
* `Script_agg_aprile.js`: è lo script principale che collega posizioni e suoni.
* `yin.js`: it is a library used for fundamental frequency recognition.



## Script_agg_aprile

### Class: `Position
The `Position` class represents a musical position, containing information about the note, the frets involved, and a numerical identifier. 

![Alt text](staffImages/classPosition.png)

It's equipped by a constructor which initialises 3 attributes:
* `getNote`: Returns the note associated with the position.
* `getFrets`: Returns the frets associated with the position.
* `getNumber`: Returns the numerical identifier of the position.

For each attribute `Getter` methods are created. The `getBinaryFrets()` returns the keys of the associated position in binary:
* 0: not pressed key
* 1: pressed key

The `Position` class encapsulates the concept of a musical position, providing methods to access and manipulate the note, frets, and associated numerical identifier. The class also offers functionality to convert the frets into a binary format and print detailed information about the position.

### Class: `ThrillsOfNote`
The `ThrillsOfNote` class represents the thrills associated with a musical note, containing information about various fret positions and their corresponding notes.

![Alt text](staffImages/getThrills.png)

It's initialized by the constructor with the following attributes:
* `this.position`: it's an object of the `Position` class of the corresponding note
* `this.dict`: it's the trills `JSON` which is a kind of db that contains the information about the trills

The `getThrills()` method returns the complete trill.

The `positionAlterationManager()` method manages the eventual alterations of the corresponding trill position.

![Alt text](staffImages/posManager.png)

### Const: `position`
This constant is an array of arrays which contains all the notes positions
### Const: `th`
This is an object `JSON` which contains all the information about trills.
### Function: `run`

The `run` function determines whether to generate a thrill or a single note based on the `isthrill` parameter. If it is true, it generates a thrill based on the specified superior (`sup1`, `sup2`) or inferior (`inf1`, `inf2`) flags. Otherwise, it generates a single note.

![Alt text](staffImages/run.png)

When the function `run(index,isThrill, sup1, sup2, inf1, inf2)` is runned there are two possible results:
* `isThrill===True` returns the trill
* `isThrill===False` returns the corresponding single note position

### Function: `choose`

The `choose` function updates the state of thrill selection, toggles the thrill mode, and updates the background color of the related buttons. It then calls the `run` function to generate the selected note or thrill and starts or stops the tuner based on the current state.

![Alt text](staffImages/choose.png)
 
## Script_accordatore.js

### Function: `initAudioContext`

The `initAudioContext` function initializes the audio context and sets up microphone input with filtering and analysis capabilities.

![Alt text](staffImages/audioCont.png)

It requests access to the user's microphone using `navigator.mediaDevices.getUserMedia`.
Upon successful permission, it initializes the microphone as a media stream source.

A low-pass filter is created using `createBiquadFilter`, and its type is set to `lowpass`.
The filter's frequency is set to 1000 Hz.

An analyser node is created using `createAnalyser`.
Its FFT size is set to `8192` for frequency analysis, and minimum decibels are set to `-90`.

The microphone input is connected to the low-pass filter, and the filter is connected to the analyser.



### Function: `getFrequency`

The `getFrequency` function is responsible for retrieving the frequency data from the microphone input and performing real-time frequency analysis to determine the current pitch. It then updates the UI elements based on the detected pitch.

![Alt text](staffImages/freq.png)

The function first checks if setTuner is true before proceeding with frequency analysis.
It retrieves frequency data from the microphone input using `analyser.getFloatTimeDomainData`.

Frequency is calculated using the `window.yin` function with the frequency data and the sample rate of the audio context.

The function calculates differences between the target note and the detected frequency using `handleNoteDifferences`.



`const frequencyToNoteDB` -> This array is a correspondence table between frequencies and musical notes. Each element of the array is a sub-array containing the name of the note and its corresponding frequency in hertz.

### Function: `handleNoteDifferences`

The `handleNoteDifferences` function calculates the difference between the detected frequency and the target note, determining whether the detected frequency is lower or higher than the target note and computing the difference in cents accordingly.

![Alt text](staffImages/handleNote.png)

The function determines the notes before and after the target note based on its index in the `frequencyToNoteDB` array.
Based on the comparison between the detected frequency and the neighboring notes, the function determines whether the detected frequency is lower or higher than the target note.

The function returns an array containing the cent difference and the state string ('LOW' or 'HIGH').


### Function: `stopAudioContext`

The `stopAudioContext` function is responsible for stopping the audio context, clearing the frequency interval, and releasing any active media streams associated with microphone input.

![Alt text](staffImages/StopTun.png)



## Script.js
### Function `aggiungiNota`

The `aggiungiNota` function is designed to add a musical note representation to an SVG element at a specified position. 

This function handles the rendering of a note on a musical staff, ensuring that any previous accidental symbols or notes are removed before adding the new note.

![Alt text](staffImages/aggiungiNota1.png)

The function starts by checking if there are any existing accidental symbols (like sharps or flats) represented by elements with the class accidental within the SVG. If found, it removes them.
It also checks if there is an existing note (nota) and removes it to ensure that only the most recent note is displayed.
- The `cx` attribute (x-coordinate) is set to x + 150, which positions the note 150 units to the right of the provided x coordinate.
- The `cy` attribute (y-coordinate) is set to y, positioning the note at the provided y-coordinate.
- The `r` attribute is set to 10, giving the note a radius of 10 units.

The newly created note element is appended to the SVG element and the variable `notaMusicale` is assigned the musical note corresponding to the y-coordinate from the `noteMap` object. 

### Handling accidental notes

This section of the code is responsible for handling accidental notes (sharps and flats) when a button is pressed (`bottonePremuto`) and an accidental note (`notaAccidentale`) is specified. It updates the musical note with the accidental and displays it on the SVG element.

![Alt text](staffImages/handlingAcc.png)

The condition `if (bottonePremuto && notaAccidentale)` checks if the button is pressed and an accidental note (either sharp or flat) is specified.

`let stringControl = notaMusicale[0];` extracts the first character of the musical note, representing the base note.

If the accidental note is a flat (♭) and the base note is not 'C' or 'F', the flat is added to the musical note.

If the accidental note is a sharp (♯) and the base note is not 'B' or 'E', the sharp is added to the musical note.

`document.getElementById('notaVisualizzata').textContent = 'Nota: ' + notaMusicale;` updates the text content of an HTML element with the ID notaVisualizzata to display the current musical note.

`aggiungiTagliAddizionaliPermanenti(y);` calls a function to add permanent ledger lines to the musical staff, ensuring the note is properly displayed on the staff.

### Hanlding ledger lines

This part of the script is responsible for adding and removing permanent ledger lines to the musical staff based on the provided y-coordinate. It ensures that additional ledger lines are added or removed dynamically to accommodate notes outside the standard staff range.

![Alt text](staffImages/img4.png)

The function first calls `rimuoviTagliAddizionaliPermanenti()` to remove any existing permanent ledger lines from the SVG.

Constants x1 and x2 define the starting and ending x-coordinates for the ledger lines.
If the provided y-coordinate (`y`) is below the starting y-coordinate of the staff (`startY`), additional ledger lines are added above the staff to accommodate lower notes.

If the provided y-coordinate is above the upper limit of the staff (beyond 4 times the line spacing), additional ledger lines are added below the staff to accommodate higher notes.

This function iterates over each permanent ledger line in the `tagliAddizionaliPermanenti` array and removes them from the SVG element.

After removing all lines, the `tagliAddizionaliPermanenti` array is cleared, ensuring it's ready for new lines to be added.

### Function `conversion`

The `conversion` function is responsible for converting a given musical note to its enharmonic equivalent, considering any sharps or flats present in the note. It utilizes a predefined array of musical notes (`noteArray`) for reference.

![Alt text](staffImages/conversion.png)

The function initializes the conversion variable with the input `notaMusicale`, assuming no conversion is needed initially.
It extracts the first two characters of the input note and stores it in the `str` variable.

If the input note contains a sharp (♯), it iterates over the `noteArray` to find the corresponding note.

When a match is found, it assigns the enharmonic equivalent note with a flat (♭) to the conversion variable.
The loop breaks as soon as a match is found.

If the input note contains a flat (♭), it directly assigns the input note with a flat (♭) to the conversion variable.

The function returns the converted note.















## GiulianoGianni






### Layout Design

In the course of this project development, various layout models were implemented.
The final version depicts the most intuitive layout, with the greatest visual impact.\
The layout is the result of two files written in HTML and CSS (respectively `GUI.html` and `Style.css`).\
Using HTML, it is possible to describe the layouts from an structural point of view, in terms of visual representation: the graphic parts, such as buttons and LEDs, were placed within `div` elements that could emphasise their own space within the interface.\
In addition, each button was identified by a precise `id` (useful for positioning them within the webpage and for linking them to specific `onclick` functions present in the JavaScript file `Buttons_functions.js`), and by a `class`, where the latter differentiates the different categories of buttons (e.g. whether they are durations or alterations).\
As regards of the grid and the keyboard, a `canvas` object has been used: the reason for this choice is dictated by its incredible flexibility and adaptability, which is specifically relevant for modifying the sequence directly from the grid and with the simple use of the mouse.\
Furthermore, it can be seen how the use of colours makes the whole webpage more interesting, and with a marked harmonisation between `div` and `button` elements.\
CSS provided the opportunity to work from a purely graphical point of view, with the choice of dimensions, contours, actual positioning and colours of the various elements.
The focus was to have the most compact graphics possible, as well as a clear and intuitive interface, to be easily used during the composition of the sequence.\
It is important to emphasise, for the reasons mentioned above, how some `label` elements were inserted precisely to make it easier to use and free of misunderstandings.



## Challenges Encountered

### Baldini



### Cagnetta

From my point of view, the most complicated task was encoding in binary code all the positions of the individual notes and for each note the various trills. The positions shown were chosen to provide all possible options for alternate fingerings for those learning to play the flute. 

Another challenge was recording all the sounds and trills with perfectly tuned pitch, so that users would have a reliable reference to guide their practice.

### Panettieri

I believe the most complex part encountered during the implementation of the staff was the creation of the additional ledger lines. I had never attempted anything like this before, so I had to study the range limits since the flute is an instrument that spans from C3 to C6, and develop our staff accordingly. 

Another complicated part was the linking and communication to ensure that the note entered was read correctly between the staff and the other components of the project.


### Pelazza

## Credits

### Baldini

### Cagnetta

I am truly satisfied with the final result of this project. It stemmed from a need that I encountered on several occasions during my studies as a flutist, and the fact that I can offer this project as an opportunity to future flutists makes me very proud. 

I am extremely grateful to my team, who believed in this idea from the very beginning and without whom this project would never have been realized.

Thank you for all the late-night study sessions, dinners, discussions, and suggestions for mutual improvement. It has been a pleasure working with you, and I hope this will be the first of many projects we develop together.
### Panettieri
### Pelazza

---

Project developed by:
* Baldini Giovanni
* Cagnetta Angelica
* Panettieri Francesco
* Pelazza Marco
