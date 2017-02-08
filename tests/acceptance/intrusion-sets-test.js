import { test } from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';




//1. navigate to the list, details, new, and edit pages
moduleForAcceptance('Acceptance | intrusion sets');

test('router.js should include instrusion-sets', function(assert) {
    visit('/intrusion-sets');

    andThen(function() {
        assert.equal(currentURL(), '/intrusion-sets');
    });
});
// test('router.js should include instrusion-set', function(assert) {
//     visit('/intrusion-sets/intrusion-set--id');

//     andThen(function() {
//         assert.equal(currentURL(), '/intrusion-sets/intrusion-set--id');
//     });
// });
test('router.js should include instrusion-set-new', function(assert) {
    visit('/intrusion-set/new');

    andThen(function() {
        assert.equal(currentURL(), '/intrusion-set/new');
    });
});
// test('router.js should include instrusion-set-edit', function(assert) {
//     visit('/intrusion-set-edit');

//     andThen(function() {
//         assert.equal(currentURL(), '/intrusion-set-edit');
//     });
// });




////2. test the header nav for links
// test('header nav bar should link to intrusion sets "list" page', function(assert) {
//     visit('/');

//     andThen(function() {
//         click('#settings-dropdown-intrusion-sets');
//         assert.equal(currentURL(), '/intrusion-sets');
//     });
// });
// test('side nav bar should link to intrusion sets "list" page', function(assert) {
//     visit('/');

//     andThen(function() {
//         click('#side-nav-intrusion-sets');
//         assert.equal(currentURL(), '/intrusion-sets');
//     });
// });




//3. test the list page for New and Download
test('intrusion sets "list" page New button should navigate to the "new" page', function(assert) {
    visit('/intrusion-sets');
    click('#new-item');

    andThen(function() {
        assert.equal(currentURL(), '/intrusion-set/new');
    });
});
test('intrusion sets "list" page Download button should exist', function(assert) {
    visit('/intrusion-sets');

    andThen(function() {
        assert.equal(find('#download-items').length, 1);
    });
});
// test('"new" intrusion set page should create record on Save and redirect to intrusion sets "list page', function(assert) {
//     visit('/intrusion-set/new');
//     fillIn('.item-name', 'New Intrusion Set');
//     click('#save');

//     andThen(function() {
//         assert.equal(currentURL(), '/intrusion-sets');
//         assert.notEqual(find('.collection-item').length, 0);
//     });
// });



//4. test the new page for Save and Cancel
test('intrusion-sets "new" page Save button should exist', function(assert) {
    visit('/intrusion-set/new');

    andThen(function() {
        assert.equal(find('#save').length, 1);
    });
});
test('intrusion-sets "new" page Cancel button should exist', function(assert) {
    visit('/intrusion-set/new');

    andThen(function() {
        assert.equal(find('#cancel').length, 1);
    });
});