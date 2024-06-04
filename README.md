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
### Position class
The class called `Position(note, frets, number)` is the class utilized for the elaboration of the positions of the single notes. It's equipped by a constructor which initialises 3 attributes:
* note: it's the correspondent note
* frets: it's the position relative to the note
* number: it's the code associated to the note

For each attribute `Getter` methods are created. The `getBinaryFrets()` returns the keys of the associated position in binary:
* 0: not pressed key
* 1: pressed key
### Thrills of note
This class associates the note to its relative trill and memorize the information relatives to the correspondent trill. It's initialized by the constructor with the following attributes:
* position: it's an object of the `Position` class of the corresponding note
* dict: it's the trills `JSON` which is a kind of db that contains the information about the trills

The `getThrills()` method returns the complete trill.
The `positionAlterationManager()` method manages the eventual alterations of the corresponding trill position.
### Const `position`
This constant is an array of arrays which contains all the notes positions
### Const `th`
This is an object `JSON` which contains all the information about trills.
### Func `run`
When the function `run(index,isThrill, sup1, sup2, inf1, inf2)` is runned there are two possible results:
* `isThrill===True` returns the trill
* `isThrill===False` returns the corresponding single note position
### Func `choose`
When the function `choose(thrill, type, typeString)` is runned it rules the type of trill: `SUP1`,`SUP2`,`INF1` or `INF2`. 


## PENTACAZZI

### Function `aggiungiNota`

The `aggiungiNota` function is designed to add a musical note representation to an SVG element at a specified position. 

This function handles the rendering of a note on a musical staff, ensuring that any previous accidental symbols or notes are removed before adding the new note.

![Alt text](Pentacazzi/aggiungiNota1.png)

#### Parameters and description

Parameters:

- x (Number) -> The x-coordinate for the position where the note will be placed on the SVG element.
- y (Number) -> The y-coordinate for the position where the note will be placed on the SVG element.

Descriptions:

The function starts by checking if there are any existing accidental symbols (like sharps or flats) represented by elements with the class accidental within the SVG. If found, it removes them.
It also checks if there is an existing note (nota) and removes it to ensure that only the most recent note is displayed.
- The `cx` attribute (x-coordinate) is set to x + 150, which positions the note 150 units to the right of the provided x coordinate.
- The `cy` attribute (y-coordinate) is set to y, positioning the note at the provided y-coordinate.
- The `r` attribute is set to 10, giving the note a radius of 10 units.

The newly created note element is appended to the SVG element and the variable `notaMusicale` is assigned the musical note corresponding to the y-coordinate from the `noteMap` object. 

### Handling accidental notes

This section of the code is responsible for handling accidental notes (sharps and flats) when a button is pressed (`bottonePremuto`) and an accidental note (`notaAccidentale`) is specified. It updates the musical note with the accidental and displays it on the SVG element.

![Alt text](Pentacazzi/handlingAcc.png)

#### Description

The condition `if (bottonePremuto && notaAccidentale)` checks if the button is pressed and an accidental note (either sharp or flat) is specified.

`let stringControl = notaMusicale[0];` extracts the first character of the musical note, representing the base note.

If the accidental note is a flat (♭) and the base note is not 'C' or 'F', the flat is added to the musical note.

If the accidental note is a sharp (♯) and the base note is not 'B' or 'E', the sharp is added to the musical note.

`document.getElementById('notaVisualizzata').textContent = 'Nota: ' + notaMusicale;` updates the text content of an HTML element with the ID notaVisualizzata to display the current musical note.

`aggiungiTagliAddizionaliPermanenti(y);` calls a function to add permanent ledger lines to the musical staff, ensuring the note is properly displayed on the staff.

### Hanlding ledger lines

This part of the script is responsible for adding and removing permanent ledger lines to the musical staff based on the provided y-coordinate. It ensures that additional ledger lines are added or removed dynamically to accommodate notes outside the standard staff range.

![Alt text](Pentacazzi/img4.png)

#### Description

The function first calls `rimuoviTagliAddizionaliPermanenti()` to remove any existing permanent ledger lines from the SVG.

Constants x1 and x2 define the starting and ending x-coordinates for the ledger lines.
If the provided y-coordinate (`y`) is below the starting y-coordinate of the staff (`startY`), additional ledger lines are added above the staff to accommodate lower notes.

If the provided y-coordinate is above the upper limit of the staff (beyond 4 times the line spacing), additional ledger lines are added below the staff to accommodate higher notes.

This function iterates over each permanent ledger line in the `tagliAddizionaliPermanenti` array and removes them from the SVG element.

After removing all lines, the `tagliAddizionaliPermanenti` array is cleared, ensuring it's ready for new lines to be added.

### Function `conversion`

The `conversion` function is responsible for converting a given musical note to its enharmonic equivalent, considering any sharps or flats present in the note. It utilizes a predefined array of musical notes (`noteArray`) for reference.

![Alt text](Pentacazzi/conversion.png)

#### Description

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

The main difficulty I had during the development of this project was to find the best melody and note architecture in order to implement the features we had in mind.\
At first, the code allowed to play only singular-note melodies, then we added chords (but only with the same duration for all notes).\
So, in order to allow the user to add notes of any duration in any time position, I implemented a midi-like representation with the use of a starting time instant (both in tatum-wise terms and in milliseconds).\
Finally, to make the sequence computation time lower, the code I wrote creates a `sorted_data` array and use the recursive calling logic to schedule the next note to be played.
In `sorted_data` all the notes of the melody are sorted by starting time reference (from first to last notes) and all simultaneous notes are clustered together (notes that start at the same time constitutes a multiple-elements array inside `sorted_data`).

Regarding the resulting sounds, the sound quality was another challenge I wanted to deal with.\
The use of low-level functionalities and elements allowed us to write faster code, but didn't lead to very pleasant sounds.
So I tried to develop a more intricate sound processing chain, including compressors, delay and reverb, and tried to resemble a professional-like sound synthesis by using an additive synthesis technique instead of using a single oscillators.

### Cagnetta

From the point of view of the layout, I believe that the most significant challenge found was to represent and position all the elements in a coherent way with the idea proposed initially.
It was not easy above all to stack the different elements (buttons, leds...); this has brought various changes during the development but we can consider ourselves satisfied with the final version obtained.

### Panettieri

My personal challenges dealt with JavaScript functionalities that weren't seen during lectures or just briefly discussed.\
The functionalities I struggled with were: `Blob` object, `FileReader` object and asynchronous functions.\
I managed to overcome the challenges related to `Blob` and `FileReader` objects with a lot of "die-and-retry" logic, YoutTube tutorials and with the help of code snippets delivered by ChatGPT. \
I must thank OpenAI for developing ChatGPT as it was a great tool to quickly obtain code snippets, showing basic uses and writing rules for those functionalities.\
They allowed me to quickly grasp an idea of how to handle and declare such tools, which eventually saved me a lot of time.
I was also able to save a lot of time thanks to the AI Copilot that we were shown during the lectures.
It helped me remember variables, specifities of our program...
It is a great tool that I'll keep using throughout my life.\
However, I must say that extra carefulness is required when using such tools as errors are frequent. 
Using them should never undermine the developer's mind and our thirst of "Do It Yourself".
Instead, they should be considered as sidekicks, helping us facing logic issues or tough challenges.

### Pelazza

## Credits

### Di Lorenzo

I found this project development as an opportunity to put myself on the line (it was my very first serious coding project) and to start learning important soft skills, imposing myself to create a work-like professional workflow.
This process was easily simplified by working with my colleagues Nicola and Ernest, because we all managed to create a balanced, organized and enthusiastic work environment, hopefully leading to other chances of working together.

### Mugnaini

At the conclusion of this project, I would like to thank my colleagues Giuliano and Ernest for the professionalism, dedication and commitment they showed and for conveying a part of themselves within each hour spent at work.\
It is not easy to find people who are so close to one's ideas and for this reason I consider myself very lucky.\
Moreover, this work has given us the opportunity to establish a friendship beyond the working relationship, for which I am extremely grateful.

### Ouali

My biggest pride, even if I had no particuliarly tough challenge implementing it, was developing the grid interaction for our sequence.
Coding it felt like a game, such as debugging.
I really had a great time turning my ideas into working code.\
Moreover, I deeply appreciated working with Giuliano and Nicola.
Thanks to this project, I was able to know them better and a great friendship was born from this project.
I highly consider their seriousness and rigor.
We had a lot of meeting for this project, starting mid-October until the end of December.
We were extremely well organised as Giuliano's milestone checklist really helped us prioritizing features implementation.\
All of us were proactive on our group chat for checking the evolution of our project, showing that each one of us was extremely motivated for the project development.
In my academic experience, it is the first time that I got the chance to work with such reliable people.

---

Project developed by:
* Baldini Giovanni
* Cagnetta Angelica
* Panettieri Francesco
* Pelazza Marco
