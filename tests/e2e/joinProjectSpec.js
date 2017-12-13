//test u14 issue

describe('Issue', function() {

  beforeEach(function(){
    browser.get('http://localhost:4200/home');
  });



    it('join project', function() {
      var deco = element(by.id('deconnexion'));
      deco.click();
      browser.waitForAngular();

      var registerButton = element(by.id('registerBtn'));
      registerButton.click();

      var email = element(by.id('inputEmail'));
      var firstName = element(by.id('inputFirstName'));
      var lastName = element(by.id('inputLastName'));
      var password = element(by.id('inputPassword'));
      var password2 = element(by.id('inputPassword2'));

      email.sendKeys('toto2@gmail.com');
      firstName.sendKeys('toto2');
      lastName.sendKeys('toto2');
      password.sendKeys('azeazeaze');
      password2.sendKeys('azeazeaze');

      var saveButton = element(by.id('createUser'));
      saveButton.click();
      browser.waitForAngular();

      var loginButton = element(by.id('loginBtn'));
      loginButton.click();

      var email = element(by.id('inputEmail'));
      var password = element(by.id('inputPassword'));

      email.sendKeys('toto2@gmail.com');
      password.sendKeys('azeazeaze');

      loginButton = element(by.id('login'));
      loginButton.click();
      browser.waitForAngular();

      var projectButton = element(by.id('projectDropdown'));
      projectButton.click();
      var join = element(by.id('inscriptionProject'));
      join.click();
      browser.waitForAngular();

      var project = element(by.id('inputProject'));
      project.sendKeys('test');
      var participate = element(by.id('participate'));
      participate.click();
      browser.waitForAngular();

      var projectButton = element(by.id('projectDropdown'));
      projectButton.click();
      var listeProjectButton = element(by.id('listeProject'));
      listeProjectButton.click();
      browser.waitForAngular();

      var backlogButton = element(by.id('test'));
      backlogButton.click();
      browser.waitForAngular();
      expect(browser.driver.getCurrentUrl()).toMatch('/project/1/Backlog');

    });
  });
