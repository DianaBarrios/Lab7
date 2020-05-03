const mongoose = require("mongoose");

const bookmarksSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

const bookmarksCollection = mongoose.model("bookmarks", bookmarksSchema);

const Bookmarks = {
  createBookmark: function(newBookmark) {
    return bookmarksCollection //db.bookmarks.insert()
      .create(newBookmark)
      .then(createdBookmark => {
        return createdBookmark;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  getAllBookmarks: function() {
    return bookmarksCollection
      .find()
      .then(allBookmarks => {
        return allBookmarks;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  getBookmark: function(bookmarkTitle) {
    return bookmarksCollection
      .find({ title: bookmarkTitle })
      .then(foundBookmark => {
        return foundBookmark;
      })
      .catch(err => {
        console.log(err);
        throw new Error(err);
      });
  },
  deleteBookmark: function(bookmarkId) {
    return bookmarksCollection
      .remove({ id: bookmarkId })
      .then(deletedBookmark => {
        return deletedBookmark;
      })
      .catch(err => {
        console.log(err);
        throw new Error(err);
      });
  },
  updateBookmark: function(bookmarkId, body) {
    return bookmarksCollection
      .update({ id: bookmarkId }, { $set: body })
      .then(updatedBookmark => {
        return updatedBookmark;
      })
      .catch(err => {
        console.log(err);
        throw new Error(err);
      });
  }
};

module.exports = { Bookmarks };
