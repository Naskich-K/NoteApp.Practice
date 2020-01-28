const chalk = require('chalk')
const yargs = require('yargs')

// name from app.js and notes.js are completely independent of one another. I just exported the variables from utils.js so app.js can have access to 
const notesUtils = require('./notes.js')

// Customize Yargs version. Yargs is very useful parsing package. 
yargs.version('1.0.1')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            decribe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            decribe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    // ES6 method def syntax from 'handler: function (argv)'
    handler(argv){ 
        notesUtils.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    decribe: 'Remove a note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notesUtils.removeNote(argv.title)
    }
})

//  Create read command
yargs.command({
    command: 'read',
    decribe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notesUtils.readNote(argv.title)
    }
})

//  Create list command
yargs.command({
    command: 'list',
    decribe: 'List your notes',
    handler(){
        notesUtils.listNotes()
    }
})

// console.log(yargs.argv) is needed since we need yargs to parce. But there is an alternative:
yargs.parse()