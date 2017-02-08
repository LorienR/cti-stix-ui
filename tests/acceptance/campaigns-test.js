import { test } from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';




//1. navigate to the list, details, new, and edit pages
moduleForAcceptance('Acceptance | campaigns');

test('router.js should include campaigns', function(assert) {
    visit('/campaigns');

    andThen(function() {
        assert.equal(currentURL(), '/campaigns');
    });
});
// test('router.js should include campaign', function(assert) {
//     visit('/campaign/campaign--id');

//     andThen(function() {
//         assert.equal(currentURL(), '/campaign/campaigns--id');
//     });
// });
test('router.js should include campaign-new', function(assert) {
    visit('/campaign/new');

    andThen(function() {
        assert.equal(currentURL(), '/campaign/new');
    });
});
// test('router.js should include campaign-edit', function(assert) {
//     visit('/campaign-edit');

//     andThen(function() {
//         assert.equal(currentURL(), '/campaign-edit');
//     });
// });




////2. test the header nav for links
// test('header nav bar should link to campaigns "list" page', function(assert) {
//     visit('/');

//     andThen(function() {
//         click('#settings-dropdown-campaigns');
//         assert.equal(currentURL(), '/campaigns');
//     });
// });
// test('side nav bar should link to campaigns "list" page', function(assert) {
//     visit('/');

//     andThen(function() {
//         click('#side-nav-campaigns');
//         assert.equal(currentURL(), '/campaigns');
//     });
// });




//3. test the list page for New and Download
test('campaigns "list" page New button should navigate to the "new" page', function(assert) {
    visit('/campaigns');
    click('#new-item');

    andThen(function() {
        assert.equal(currentURL(), '/campaign/new');
    });
});
test('campaigns "list" page Download button should exist', function(assert) {
    visit('/campaigns');

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
test('campaigns "new" page Save button should exist', function(assert) {
    visit('/campaign/new');

    andThen(function() {
        assert.equal(find('#save').length, 1);
    });
});
test('campaigns "new" page Cancel button should exist', function(assert) {
    visit('/campaign/new');

    andThen(function() {
        assert.equal(find('#cancel').length, 1);
    });
});