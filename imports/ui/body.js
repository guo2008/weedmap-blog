import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Blogs } from '../api/blogs.js';

import './blog.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.body.helpers({
  blogs() {
    const instance = Template.instance();
    // TODO: remove the comments
/*    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Blogs.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }*/
    // TODO: need pagination
    if (Meteor.userId()) {
      return Blogs.find({owner: Meteor.userId()}, { sort: { createdAt: -1 }});
    }
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
  // TODO: remove comments
  /*'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },*/
});