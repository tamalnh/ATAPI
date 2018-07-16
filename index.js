const mongoose = require('mongoose');
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/test')
    .then(() => console.log('conneted to mongoDB'))
    .catch(error => console.log('eroro detected ' + error))


const courseShcema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    price: Number,
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseShcema);

async function createCourse() {

    const course = new Course({
        name: 'React Course',
        author: 'Tamal',
        tags: ['node', 'backend', 'react'],
        price: 15,
        isPublished: true,
    });

    const result = await course.save()
}
createCourse() // create course


async function getCourses() {

    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in (in)
    // nin (not in)
    // or (logical)
    // and (logical)

    //** basic sorting*/
    // const courses = await Course
    // .find({author: 'Mosh', isPublished: true})
    // .limit(2)
    // .sort ({name: -1 })
    // .select({name: 1,  tags: 1});

    //** **********************************  */

    // .find({price: { $gt: 10,  $lte : 20}})****
    // .find({price: { $in: [10, 15, 20] }})


    //** ************ regular expression ******* */
    // .find({author: /^Mosh/}) // **starts with Mosh
    // .find({author: /Howlader$/i}) // **ends with holader 'i' is case sensitive or not 
    // .find({author: /.*Mosh.*/i}) // **contains mosh 

    //** */

    const pageNumber = 2;
    const pageSize = 1;
    // /api/course?pageNumber=2&pageSize=10

    const courses = await Course
        .find({
            author: 'Mosh',
            isPublished: true
        })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({
            name: 1
        })
        .select({
            name: 1,
            tags: 1
        })
    // .count()

    console.log(courses);
}
getCourses() // get all course