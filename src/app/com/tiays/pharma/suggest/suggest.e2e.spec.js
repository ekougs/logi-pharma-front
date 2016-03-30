// TODO create component using autocomplete directive and a minimal page using autocomplete feature

// TODO create test specs testing different state induced by autocomplete directive
// focusin, focusout
// elements
// template for elements
// selected element on click, selected element on arrow and enter

describe('Autocomplete directive', function () {

    it('should show the popup on focus', function () {
        browser.get('http://localhost:3000/app/com/tiays/pharma/suggest/suggest.e2e.html');
        element(by.id('test')).click();

        expect(element(by.css('ul')).isDisplayed()).toBeTruthy();
    });

    it('should hide the popup when out of focus', function () {
        browser.get('http://localhost:3000/app/com/tiays/pharma/suggest/suggest.e2e.html');
        element(by.id('test')).click();
        element(by.id('outside')).click();

        expect(element(by.css('ul')).isDisplayed()).toBeFalsy();
    });

    it('should select element on mouse click', function () {
        browser.get('http://localhost:3000/app/com/tiays/pharma/suggest/suggest.e2e.html');
        element(by.id('test')).click();

        element(by.css('li[title="Mr Cassius Clay"')).click();

        element(by.id('test')).getAttribute('value').then(function (testValue) {
            expect(testValue).toEqual('Mr Cassius Clay');
        });
    });

    // Test highlight on hover
    //it('should highlight element on mouse hover', function () {
    //    browser.get('http://localhost:3000/app/com/tiays/pharma/suggest/suggest.e2e.html');
    //    element(by.id('test')).click();
    //
    //    browser.actions().mouseMove(browser.findElement(by.css('li[title="Mr Cassius Clay"'))).perform().then(function () {
    //        return element(by.css('li[title="Mr Cassius Clay"')).getAttribute('class');
    //    }).then(function (liClass) {
    //        expect(classes.split(' ').indexOf('highlighted')).not.toEqual(-1);
    //    });
    //});
    // Test highlight on up/down
    // Test highlight 0 after end and down
    // Test highlight end after 0 and up
    // Test select on enter
    // Test after select on enter and up highlighted is on element
    // Test after select on enter and down highlighted is on element
    // Test esc hide
    // Test click on input after hide, show and no highlighted
    // Test on elements change (button to add a person ?)
});