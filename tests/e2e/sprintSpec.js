//test u15 u8 sm6 issue


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
    browser.waitForAngular();

    var backlogButton = element(by.id('test'));
    backlogButton.click();
    browser.waitForAngular();

    var sprint = element(by.id('sprint'));
    sprint.click();
    browser.waitForAngular();
    var newSprint = element(by.id('newSprint'));
    newSprint.click();
    browser.waitForAngular();

    var desc = element(by.id('description'));
    desc.sendKeys('new sprint');
    var dateBegin = element(by.id('dateBegin'));
    var dateEnd = element(by.id('dateEnd'));
    dateBegin.sendKeys('11122017');
    dateEnd.sendKeys('12122017');
    var create = element(by.id('createSprint'));
    create.click();
    browser.waitForAngular();

    var task = element(by.id('task_1'));
    task.click()
    browser.waitForAngular();

    expect(browser.driver.getCurrentUrl()).toMatch('/project/1/Backlog/Sprint/1/Tasks');

  });

  it('modification Sprint', function() {
    browser.waitForAngular();
    var projectButton = element(by.id('projectDropdown'));
    projectButton.click();
    var listeProjectButton = element(by.id('listeProject'));;
    listeProjectButton.click();
    browser.waitForAngular();

    var backlogButton = element(by.id('test'));
    backlogButton.click();
    browser.waitForAngular();

    var sprint = element(by.id('sprint'));
    sprint.click();
    browser.waitForAngular();
    var modifSprint = element(by.id('modifSprint'));
    modifSprint.click();
    browser.waitForAngular();

    var sprint_id = element(by.id('sprint_id'));
    var dateEnd = element(by.id('dateEnd'));
    sprint_id.sendKeys('1');
    dateEnd.sendKeys('12122018');
    var modif = element(by.id('modif'));
    modif.click();
    browser.waitForAngular();
    browser.waitForAngular();

    expect(browser.driver.getCurrentUrl()).toMatch('/project/1/Backlog/SprintList');

  });
});
