//test u2 issue

describe('createProject', function() {

  beforeEach(function() {
    browser.get('http://localhost:4200/profile');
  });

  it('tentative de creation de projet',function(){
    var nameProject = 'test'+Math.random();
    browser.waitForAngular();
    expect(browser.driver.getCurrentUrl()).toMatch('/profile');

    var projectButton = element(by.id('dropdownBasic1'));
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
    browser.pause();
    browser.waitForAngular();

    expect(browser.driver.getCurrentUrl()).toMatch('/projects');

  });

  it('visualiser projet',function(){
    browser.waitForAngular();
    var projectButton = element(by.id('dropdownBasic1'));
    projectButton.click();
    
    var listeProjectButton = element(by.id('listeProject'));;
    listeProjectButton.click();
    browser.waitForAngular();

    expect(browser.driver.getCurrentUrl()).toMatch('/projects');

  });

});
