//test dev0 u4 sm4 issue


describe('task', function() {

  beforeEach(function(){
    browser.get('http://localhost:4200/home');
  });

  it('création task', function() {
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

    var task = element(by.id('task_1'));
    task.click()
    browser.waitForAngular();

    var newtask = element(by.id('newTask'));
    newtask.click();
    browser.waitForAngular();

    var desc = element(by.id('description'));
    var cost = element(by.id('cost'));
    var dev = element(by.id('dev'));
    desc.sendKeys('dfspmlgk dsfogk dfpgkdl');
    cost.sendKeys('1');
    dev.sendKeys('t');
    var create = element(by.id('create'));
    create.click();
    browser.waitForAngular();
    browser.waitForAngular();

    expect(browser.driver.getCurrentUrl()).toMatch('/project/1/Backlog/Sprint/1/Tasks');
  });

  it('modification task', function() {
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

    var task = element(by.id('task_1'));
    task.click()
    browser.waitForAngular();

    var modiftask = element(by.id('modifTask'));
    modiftask.click();
    browser.waitForAngular();

    var task_id = element(by.id('task_id'));
    var cost = element(by.id('cost'));
    task_id.sendKeys('1');
    cost.sendKeys('2');
    var modif = element(by.id('modif'));
    modif.click();
    browser.waitForAngular();
    browser.waitForAngular();

    expect(browser.driver.getCurrentUrl()).toMatch('/project/1/Backlog/Sprint/1/Tasks');

  });
});
