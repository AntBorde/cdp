describe('inscription', function() {

  beforeEach(function(){
    browser.get('http://localhost:4200/home');
  });
  it('tentative de register', function() {
    var registerButton = element(by.id('registerBtn'));
    registerButton.click();
    var email = element(by.id('inputEmail'));
    var firstName = element(by.id('inputFirstName'));
    var lastName = element(by.id('inputLastName'));
    var password = element(by.id('inputPassword'));
    var password2 = element(by.id('inputPassword2'));

    email.sendKeys('toto@gmail.com');
    firstName.sendKeys('toto');
    lastName.sendKeys('toto1');
    password.sendKeys('blablabla');
    password2.sendKeys('blablabla');

    var saveButton = element(by.id('createUser'));
    saveButton.click();

  });


  it('tentative de login',function(){
    var loginButton = element(by.id('loginBtn'));
    loginButton.click();

    var email = element(by.id('inputEmail'));
    var password = element(by.id('inputPassword'));

    email.sendKeys('toto@gmail.com');
    browser.pause();
    password.sendKeys('blablabla');

    loginButton = element(by.id('login'));
    loginButton.click();
  });


});
