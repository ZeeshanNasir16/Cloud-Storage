import React from 'react';
import FormLayout from 'Components/layouts/common/FormLayout';
import { LoginForm } from 'Components/authentication/LoginForm';

export function Login() {
  return (
    <FormLayout>
      <LoginForm />
    </FormLayout>
  );
}
