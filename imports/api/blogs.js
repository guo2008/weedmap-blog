import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Blogs = new Mongo.Collection('blogs');

function checkuser() {
  if (! Meteor.userId()) {
    throw new Meteor.Error('not-authorized');
  }
}

Meteor.methods({
  'blogs.insert'(title, description) {
    // Make sure the user is logged in before inserting a blog
    checkuser();

    check(title, String);
    check(description, String);

    Blogs.insert({
      title,
      description,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'blogs.remove'(blogId) {
    checkuser();
    check(blogId, String);

    Blogs.remove(blogId);
  },
  'blogs.update'(blogId, title, description) {

    // Make sure the user is logged in before updating a blog
    checkuser();

    check(blogId, String);
    check(title, String);
    check(description, String);

    // Update a blog into the collection
    Blogs.update(blogId, {
      $set: {
        title,
        description,
        modifiedAt: new Date(), // current time
      },
    });
  },
});