const Sequelize = require('sequelize');
const pg = require('pg');
const vizql = require('vizql');

const sequelize = new Sequelize('books', 'reader', 'ILikeBooks', {
    dialect: 'postgres'
  })

const Book = sequelize.define('book', {
    title: {type: Sequelize.STRING},
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
});

const User = sequelize.define('user', {
    name: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING},
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
});

const Review = sequelize.define('review', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    books_id: {type: Sequelize.INTEGER},
    users_id: {type: Sequelize.INTEGER},
    rating: {type: Sequelize.INTEGER},
    comments: {type: Sequelize.STRING}
});

const Pinned = sequelize.define('pinned', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
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
    return Book.create({
      title: "Harry Potter"
    });
});

User.findOne().then(user => {
    console.log(user.get('name'));
});

const database = module.exports = {
    Book,
    User,
    Review,
    Pinned, 
    sequelize
}