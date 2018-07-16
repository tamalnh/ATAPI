const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function upadteAuthor(courseID) {
  const course =  await Course.findById(courseID)
  course.author.name = 'Tamal H';
  course.save()
}

async function addAuthor(courseID, author){
  const course = await Course.findById(courseID);
    course.authors.push(author);

    course.save()
}

createCourse('Node Course', [
  new Author({ name: 'Jack' }),
  new Author({ name: 'Smith'})
]);
// upadteAuthor('5b4ce227fb08c204c0c55782');

async function removeAuthor(courseID, authorID){
  const course = await Course.findById(courseID);
  const author = await course.authors.id(authorID);

  author.remove()
  course.save()
}

// addAuthor('5b4ce8fb18441e42f83a78ec', new Author ({name: 'Jhon'}))

removeAuthor('5b4ce8fb18441e42f83a78ec', '5b4cecdea5deb03c0c39947e')
 