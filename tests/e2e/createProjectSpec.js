//test u2 u10 issue

describe('createProject', function() {

  beforeEach(function() {
    browser.get('http://localhost:4200/home');
  });
var nameProject = 'test';
  it('tentative de creation de projet',function(){

    browser.waitForAngular();

    var projectButton = element(by.id('projectDropdown'));
    projectButton.click();
    var createProjectButton = element(by.id('createProject'));
    createProjectButton.click();

    var name = element(by.id('inputName'));
    var desc = element(by.id('inputDescription'));
    var git = element(by.id('inputgit'));

    name.sendKeys(nameProject);
    desc.sendKeys('blablablabla');
    git.sendKeys('github');

    createProjectButton = element(by.id('createProjectBtn'));
    createProjectButton.click();
    browser.waitForAngular();

  });

  it('visualiser projet',function(){
    browser.waitForAngular();
    var projectButton = element(by.id('projectDropdown'));
    projectButton.click();

    var listeProjectButton = element(by.id('listeProject'));;
    listeProjectButton.click();
    browser.waitForAngular();

    expect(browser.driver.getCurrentUrl()).toMatch('/projects');

    var backlogButton = element(by.id(nameProject));

  });

});
