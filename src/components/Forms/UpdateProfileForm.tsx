import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import { updateProfile } from '../../redux/actions/user';
import { validationRules } from '../../helpers/constants';
import { IUpdateProfileForm } from '../../types/user';
import styles from './Forms.module.scss';

const UpdateProfileForm = () => {
  const { register, errors, handleSubmit, setValue } = useForm<IUpdateProfileForm>();
  const { isFetching, isLogged, user, error: serverError } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setValue('username', user.username, { shouldValidate: true });
      setValue('email', user.email, { shouldValidate: false });
      setValue('image', user.image, { shouldValidate: false });
    }
  }, [setValue, user]);

  // TODO Другие варианты?
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (!isFetching && !serverError) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
  }, [isFetching, serverError]);

  const onSubmit = async (data: IUpdateProfileForm) => {
    const body = {
      user: {
        username: data.username,
        email: data.email.toLowerCase(),
        password: data.password,
      } as IUpdateProfileForm,
    };
    if (data.image) body.user.image = data.image;

    await dispatch(updateProfile(body));
  };

  return (
    isLogged && (
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <legend>Edit profile</legend>

        <label>
          Username
          <input type="text" name="username" placeholder="Username" ref={register(validationRules.username)} />
          {errors.username && <span className={styles.error}>{errors.username.message}</span>}
          {serverError && <span className={styles.error}>{serverError.username}</span>}
        </label>

        <label>
          Email address
          <input type="text" name="email" placeholder="Email address" ref={register(validationRules.email)} />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
          {serverError && <span className={styles.error}>{serverError.email}</span>}
        </label>

        <label>
          New password
          <input type="password" name="password" placeholder="New password" ref={register(validationRules.password)} />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </label>

        <label>
          Avatar image (url)
          <input type="text" name="image" placeholder="Avatar image" ref={register(validationRules.image)} />
          {errors.image && <span className={styles.error}>{errors.image.message}</span>}
        </label>

        <button type="submit" disabled={!!isFetching || !!success}>
          {isFetching ? <span className={styles.loading} /> : 'Save'}
        </button>
        {success && <span className={styles.success}>Success saved!</span>}
      </form>
    )
  );
};

export default UpdateProfileForm;
