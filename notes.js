const fs = require('fs')
const chalk = require('chalk')


// Adding note function
// 
// Try and shorten the syntax e.g arrow function
const addNote = (title, body) => {
    const notes = loadNotes()
// To deal with duplciate notes, check each title has not been used before (I want to return False)
    // const duplicateNotes = notes.filter((note) => note.title === title), the shorter version of:
    // const duplicateNotes = notes.filter(function (note) {
        // return note.title === title
    // })

    // To save computer power, we want to stop searching for duplciates after we find the first one
    const duplicateNote = notes.find((note) => note.title === title)

// Create our "if","else" statement. If there is no match, add the note.
    if (duplicateNote === undefined){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    }
    else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

// Removing note function
// 
const removeNote = (title) => {
    const notes = loadNotes()
// Use the filter to identify which notes to keep (I want to return True)
    const keepNotes = notes.filter((note) => note.title !== title)
// If title already exists, then remove and save changes
    if (notes.length > keepNotes.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(keepNotes)
    }
    else{
        console.log(chalk.red.inverse('No note found!'))
    } 
}

// Listing note function
// 
const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse.bold('Your notes'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

// Reading note function
// 
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse.bold(note.title))
        console.log(chalk.bold(note.body))
    }
    else {
        console.log(chalk.red.inverse.bold('Note not found!'))
    }
}


// Save/Load
// 
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
   try{
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
    }
    // If the JSON files does not exist then we just return with empty string
    catch(err){
        return[]
   } 
}

// To export functions outside my file: module.exports = getNotes
// For multiple ones:
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
