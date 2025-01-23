//İlk Test Senaryosu: Başarılı Form GönderimiFormun doğru şekilde doldurulup gönderildiğinde, başarı sayfasına yönlendirilip yönlendirilmediğini kontrol edeceğiz.

describe('Login Form Test', () => {
    it('should submit successfully when form is valid', () => {
      // Login sayfasına gidiyoruz
      cy.visit('http://localhost:5173');  // Burada, kendi sayfanızın URL'sini yazın.
      
      // Formu doğru bilgilerle dolduruyoruz
      cy.get('input[name="email"]').type('valid@example.com');
      cy.get('input[name="password"]').type('strongpassword');
      cy.get('input[name="terms"]').check();  // Terms onay kutusunu işaretliyoruz
      
      // Gönder butonuna tıklıyoruz
      cy.get('button[type="submit"]').click();
      
      // Başarı sayfasına yönlendirilip yönlendirilmediğimizi kontrol ediyoruz.
      cy.url().should('include', '/main');  // Eğer kullanıcı başarıyla yönlendirilirse URL "/main" olmalı.
    });
  });
  
  //İkinci Test Senaryosu: Hatalı Form Gönderimi: Bu test, hatalı e-posta veya şifre girildiğinde, hata mesajlarının doğru şekilde görünüp butonun devre dışı kalıp kalmadığını kontrol eder.
  
  describe('Login Form Error Test', () => {
    it('should show error when email is invalid', () => {
      // Login sayfasına gidiyoruz
      cy.visit('http://localhost:5173');
      
      // Hatalı email ve şifre giriyoruz
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('input[name="password"]').type('123'); // Şifre de kısa
      
      // Butonun devre dışı kalıp kalmadığını kontrol ediyoruz
      cy.get('button[type="submit"]').should('be.disabled');
      
      // Hata mesajının göründüğünü kontrol ediyoruz
      cy.contains('Please enter a valid email address');  // Email hata mesajı
    });
  
    it('should show error when password is invalid', () => {
      // Login sayfasına gidiyoruz
      cy.visit('http://localhost:5173');
      
      // Geçerli email, geçersiz şifre
      cy.get('input[name="email"]').type('valid@example.com');
      cy.get('input[name="password"]').type('123');  // Şifre kısa
      
      // Butonun devre dışı kalıp kalmadığını kontrol ediyoruz
      cy.get('button[type="submit"]').should('be.disabled');
      
      // Hata mesajının göründüğünü kontrol ediyoruz
      cy.contains('Password must be at least 4 characters long');  // Şifre hata mesajı
    });
  
    it('should show error when terms are not accepted', () => {
      // Login sayfasına gidiyoruz
      cy.visit('http://localhost:5173');
      
      // Geçerli email ve şifre ile formu dolduruyoruz
      cy.get('input[name="email"]').type('valid@example.com');
      cy.get('input[name="password"]').type('strongpassword');
      
      // Terms kutusunu işaretlemiyoruz
      cy.get('button[type="submit"]').should('be.disabled');
      
      // Hata mesajının göründüğünü kontrol ediyoruz
      cy.contains('You must agree to the terms of service');  // Terms kabul edilmediği için hata mesajı
    });
  });
  
  //6. Cypress Testini Çalıştırmak: Cypress GUI'den testinizi çalıştırabilirsiniz. Ayrıca terminal üzerinden de çalıştırabilirsiniz: npx cypress run