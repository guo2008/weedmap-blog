/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';

import { Blogs } from './blogs.js';

if (Meteor.isServer) {
  describe('Blogs', () => {
    describe('methods', () => {
      const userId = Random.id();
      let blogId;

      beforeEach(() => {
        Blogs.remove({});
        blogId = Blogs.insert({
          title: 'test title',
          description: 'test desc',
          createdAt: new Date(),
          owner: userId,
          username: 'tmeasday',
        });
      });
      it('can delete owned blog', () => {

        // TODO: stub Meteor.userId, we can use sinon.factory to restor the stub automatically
        sinon.stub(Meteor, 'userId', () => userId);
        // Find the internal implementation of the blog method so we can
        // test it in isolation
        const deleteBlog = Meteor.server.method_handlers['blogs.remove'];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        // Run the method with `this` set to the fake invocation
        deleteBlog.apply(invocation, [blogId]);

        // Verify that the method does what we expected
        assert.equal(Blogs.find().count(), 0);

        // restore stub
        Meteor.userId.restore();
      });

      // TODO: add more tests
    });
  });
}