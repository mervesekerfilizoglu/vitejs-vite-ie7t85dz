import React, { useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Form için başlangıç değerleri
const initialForm = {
  email: '',
  password: '',
  terms: false,
};

// Hata mesajları için constant
const errorMessages = {
  email: 'Please enter a valid email address',
  password: 'Password must be at least 4 characters long',
};

export default function Login() {
  const [form, setForm] = useState(initialForm); // Form verilerini tutan state
  const [errors, setErrors] = useState({}); // Hata mesajlarını tutan state
  const [isValid, setIsValid] = useState(false); // Formun geçerli olup olmadığını kontrol eden state
  const history = useHistory(); // Sayfa yönlendirmelerini yönetmek için kullanılır

  // Form değişikliklerini işleyen fonksiyon
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  // Form geçerliliğini kontrol eden fonksiyon
  const validateForm = () => {
    const newErrors = {};

    // E-posta validasyonu
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      newErrors.email = errorMessages.email; // Geçersiz e-posta durumu
    }

    // Şifre validasyonu
    if (form.password.length < 4) {
      newErrors.password = errorMessages.password; // Geçersiz şifre durumu
    }

    // Terms checkbox validasyonu
    if (!form.terms) {
      newErrors.terms = 'You must agree to the terms of service'; // Terms kabul edilmedi durumu
    }

    setErrors(newErrors); // Yeni hata mesajlarını güncelle
    setIsValid(Object.keys(newErrors).length === 0); // Eğer hata yoksa form geçerli sayılır
  };

  // Her form değişikliğinde validasyonu kontrol ediyoruz
  useEffect(() => {
    validateForm();
  }, [form]); // form değiştiğinde validasyonu yeniden kontrol et

  // Formu gönderme işlemi
  const handleSubmit = (event) => {
    event.preventDefault(); // Sayfa yeniden yüklenmesin diye önlüyoruz

    // Form geçerliyse API'ye istek gönder
    if (isValid) {
      axios
        .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
        .then((res) => {
          const user = res.data.find(
            (item) =>
              item.password === form.password && item.email === form.email
          );
          if (user) {
            setForm(initialForm); // Formu sıfırlıyoruz
            history.push('/main'); // Başarıyla giriş yaptıysa main sayfaya yönlendiriyoruz
          } else {
            setErrors({ ...errors, general: 'Invalid email or password' }); // Hata mesajı göster
          }
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Email inputu */}
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          value={form.email}
          onChange={handleChange}
          invalid={!!errors.email} // Hata varsa input geçersiz olacak
        />
        {/* Email hatası varsa göster */}
        {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
      </FormGroup>

      {/* Password inputu */}
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password"
          type="password"
          value={form.password}
          onChange={handleChange}
          invalid={!!errors.password} // Hata varsa input geçersiz olacak
        />
        {/* Password hatası varsa göster */}
        {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
      </FormGroup>

      {/* Terms of Service checkbox */}
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          type="checkbox"
          checked={form.terms}
          onChange={handleChange}
          invalid={!!errors.terms} // Terms hatası varsa checkbox geçersiz olacak
        />
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      {/* Terms hatası varsa göster */}
      {errors.terms && <FormFeedback>{errors.terms}</FormFeedback>}

      {/* Sign In butonunun etkinleştirilmesi */}
      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isValid}>
          {' '}
          {/* isValid false ise buton disabled */}
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
