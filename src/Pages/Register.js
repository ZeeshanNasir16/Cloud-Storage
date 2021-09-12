import React from 'react';
import FormLayout from '../Components/layouts/common/FormLayout';
import { RegisterForm } from '../Components/authentication/RegisterForm';
export function Register() {
   return (
      <FormLayout>
         <RegisterForm />
      </FormLayout>
   );
}
