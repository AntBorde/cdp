//test u13 u12 issue

describe('Issue', function() {

  beforeEach(function(){
    browser.get('http://localhost:4200/home');
  });

/*  var deco = element(by.id('deconnexion'));
  deco.click();
  browser.waitForAngular();*/

  it('création issue', function() {
    browser.waitForAngular();
    var projectButton = element(by.id('projectDropdown'));
    projectButton.click();

    var listeProjectButton = element(by.id('listeProject'));;
    listeProjectButton.click();
    browser.waitForAngular();

    var backlogButton = element(by.id('test'));
    backlogButton.click();
    browser.waitForAngular();

    var newIssueButton = element(by.id('newIssue'));
    newIssueButton.click();
    browser.waitForAngular();

    var story = element(by.id('story'));
    var priority = element(by.id('priority'));
    var diff = element(by.id('difficulty'));
    var create = element(by.id('create'));

    story.sendKeys('test de creation issue');
    priority.sendKeys('4');
    diff.sendKeys('4');
    create.click();

  });

  it('modification issue', function() {
    browser.waitForAngular();
    var projectButton = element(by.id('projectDropdown'));
    projectButton.click();

    var listeProjectButton = element(by.id('listeProject'));;
    listeProjectButton.click();
    browser.waitForAngular();

    var backlogButton = element(by.id('test'));
    backlogButton.click();
    browser.waitForAngular();

    var modifIssueButton = element(by.id('modifIssue'));
    modifIssueButton.click();
    browser.waitForAngular();

    var idIssue = element(by.id('idIssue'));
    var diff = element(by.id('difficulty'));
    var modif = element(by.id('modif'));

    idIssue.sendKeys('1');
    diff.sendKeys('8');
    modif.click();

  });


});
