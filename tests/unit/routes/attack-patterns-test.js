import { moduleFor, test } from 'ember-qunit';

//if the test if for 'route:xyz' then the routes folder needs to contain a file named xyz.js

moduleFor('route:attack-patterns', 'Unit | Route | attack patterns', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
});

test('it exists', function(assert) {
    let route = this.subject();
    assert.ok(route);
});