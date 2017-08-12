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

    // Insert a blog into the collection
    Blogs.update(Meteor.userId(), {
      $set: {
        title,
        description,
        modifiedAt: new Date(), // current time
      },
    });
  },
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Blogs.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Blogs.remove(this._id);
  },
});