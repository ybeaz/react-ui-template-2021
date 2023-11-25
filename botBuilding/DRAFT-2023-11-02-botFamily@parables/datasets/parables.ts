type ParableType = {
  bookTitle: string
  bookAuthor: string
  title: string
  content: string
}

const parables: ParableType[] = [
  {
    bookTitle: 'Zen Flesh Zen Bones',
    bookAuthor: 'Paul Repl',
    title: '',
    content: '',
  },
  // A Cup of Tea
  {
    bookTitle: 'Zen Flesh Zen Bones',
    bookAuthor: 'Paul Repl',
    title: 'A Cup of Tea',
    content: `
    Nan-in, a Japanese master during the Meiji era (1868-1912) received a university professor who came to inquire about Zen.
    Nan-in saved tea. He poured his visitor's cup full, and then kept on pouring.
    The professor watched the overflow until he no longer could restrain himself. 'It is overfull. No more will go in!'
    ‘Like this cup,' Nan-in said. ‘You are full of your own opinions and speculations. How can I show you Zen unless you first empty your cup?'
    `,
  },
]
