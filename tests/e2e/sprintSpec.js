//test u13 u12 issue

var sleep = require('sleep');

describe('Sprint', function() {

  beforeEach(function(){
    browser.get('http://localhost:4200/home');
  });

  it('création Sprint', function() {
    browser.waitForAngular();
    var projectButton = element(by.id('projectDropdown'));
    projectButton.click();

    var listeProjectButton = element(by.id('listeProject'));;
    listeProjectButton.click();
    //browser.waitForAngular();

    var backlogButton = element(by.id('test'));
    sleep.sleep(2);
    backlogButton.click();
    //sleep.sleep(2);
    browser.waitForAngular();
    //sleep.sleep(2);

    var sprint = element(by.id('sprint'));
    sprint.click();
    browser.waitForAngular();
    var newSprint = element(by.id('newSprint'));
    sprint.click();
    browser.waitForAngular();

    var desc = element(by.id('description'));
    desc.sendKeys('new sprint');
    var dateBegin = element(by.id('dateBegin'));
    var dateEnd = element(by.id('dateEnd'));
    dateBegin.sendKeys('20171211');
    dateBegin.sendKeys('20171212');
    var create = element(by.id('createSprint'));
    create.click();
    browser.waitForAngular();

    var task = element(by.id('task_1'));
    browser.waitForAngular();

    expect(browser.driver.getCurrentUrl()).toMatch('/project/1/Backlog/Sprint/1/Tasks');

  });
});
