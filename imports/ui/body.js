import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Blogs } from '../api/blogs.js';

import './blog.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('blogs');
});

Template.body.helpers({
  blogs() {
    // TODO: need pagination
    return Blogs.find({}, { sort: { createdAt: -1 }});
  },
  blogCount() {
    if (Meteor.userId()) {
      return Blogs.find({owner: Meteor.userId()}).count();
    }
    return Blogs.find({}).count();
  },
});

Template.body.events({
  'submit .new-blog'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const title = target.title.value;
    const description = target.description.value;

    // Insert a blog into the collection
   Meteor.call('blogs.insert', title, description);

    // Clear form
    target.title.value = '';
    target.description.value = '';
  }
});