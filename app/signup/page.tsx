'use client';

import { signupSchema } from '@/common/signupSchema';
import { useForm } from 'react-hook-form';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type SignUp = InferType<typeof signupSchema>;

const SignUp = () => {
  const { register, handleSubmit } = useForm<SignUp>({
    resolver: yupResolver(signupSchema),
  });

  return <div>SignUp</div>;
};

export default SignUp;
