import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import cn from 'classnames';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { validationRules } from '../../helpers/constants';
import { IEditArticleForm } from '../../types/user';

import styles from './Forms.module.scss';
import { createArticle, getFullArticle, successCreate, updateArticle } from '../../redux/actions/articles';

const EditArticleForm: React.FC<{ edit?: boolean; slug: string }> = ({ edit, slug }) => {
  const { isLoading, fullArticle, isSuccess } = useTypedSelector((state) => state.articles);
  const { register, handleSubmit, errors, setValue } = useForm<IEditArticleForm>();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (edit && fullArticle) {
      setValue('title', fullArticle.title, { shouldValidate: true });
      setValue('description', fullArticle.description, { shouldValidate: true });
      setValue('body', fullArticle.body, { shouldValidate: true });
    }
    if (edit && !fullArticle) {
      dispatch(getFullArticle(slug));
    }
  }, [dispatch, edit, fullArticle, setValue, slug]);

  useEffect(() => {
    if (isSuccess) {
      history.push(`/article/${fullArticle.slug}`);
      dispatch(successCreate(false));
    }
  }, [dispatch, fullArticle, history, isSuccess]);

  const onSubmit = (data: IEditArticleForm) => {
    const body = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
      } as IEditArticleForm,
    };

    if (!edit) dispatch(createArticle(body));
    if (edit) dispatch(updateArticle(body, slug));
  };

  return (
    <form className={cn(styles.form, styles.editArticle)} onSubmit={handleSubmit(onSubmit)}>
      <legend>Create new article</legend>

      <label>
        Title
        <input type="text" name="title" placeholder="Title" ref={register(validationRules.title)} />
        {errors.title && <span className={styles.error}>{errors.title.message}</span>}
      </label>

      <label>
        Short description
        <input
          type="text"
          name="description"
          placeholder="Short description"
          ref={register(validationRules.description)}
        />
        {errors.description && <span className={styles.error}>{errors.description.message}</span>}
      </label>

      <label htmlFor="textarea">Text</label>
      <textarea className={styles.flexGrow} name="body" placeholder="Text" ref={register(validationRules.textarea)} />
      {errors.body && <span className={styles.error}>{errors.body.message}</span>}

      <button type="submit" disabled={!!isLoading}>
        {isLoading ? <span className={styles.loading} /> : 'Send'}
      </button>
    </form>
  );
};

export default EditArticleForm;
