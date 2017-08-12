import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Blogs } from '../api/blogs.js';

import './blog.html';

Template.blog.events({
  'submit .update-blog'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const title = target.title.value;
    const description = target.description.value;

    // update the blog
    Meteor.call('blogs.update', this._id, title, description);
  },
  'click .delete'() {
    Meteor.call('blogs.remove', this._id);
  },
});