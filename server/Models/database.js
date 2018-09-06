const Sequelize = require('sequelize');
const pg = require('pg');
const vizql = require('vizql');

const sequelize = new Sequelize('books', 'ericfithian', null, {
    dialect: 'postgres'
  })

const Book = sequelize.define('book', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: Sequelize.STRING}
});

const User = sequelize.define('users', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING}
});

const Review = sequelize.define('reviews', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    book_id: {type: Sequelize.INTEGER},
    users_id: {type: Sequelize.INTEGER},
    rating: {type: Sequelize.INTEGER},
    comments: {type: Sequelize.STRING}
});

const Pinned = sequelize.define('pinned', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    book_id: {type: Sequelize.INTEGER},
    users_id: {type: Sequelize.INTEGER}
});

sequelize.sync({force: true});

User.belongsToMany(Book, {
    through: {
        model: Pinned,
        unique: false,
        foreignKey: 'users_id',
    }
});

Book.belongsToMany(Review, {
    through: {
        model: Pinned,
        unique: false,
        foreignKey: 'books_id'
    }
});

User.sync({force: true}).then(() => {
    // Table created
    return User.create({
      name: "Eric",
      password: "Rebecca"
    });
});

User.findOne().then(user => {
    console.log(user.get('name'));
});

Book.sync({force: true}).then(() => {
    // Table created
    return Book.create({
      title: "Harry Potter"
    });
});

Book.findOne().then(book => {
    console.log(book.get('name'));
});

Review.sync({force: true}).then(() => {
    // Table created
    return Review.create({
      book_id: 1,
      users_id: 1,
      rating: 5,
      comment: "This is a great book"
    });
});

Pinned.sync({force: true}).then(() => {
    // Table created
    return Pinned.create({
      book_id: 1,
      users_id: 1
    });
});

const database = module.exports = {
    Book,
    User,
    Review,
    Pinned, 
    sequelize
}

// Need to export this