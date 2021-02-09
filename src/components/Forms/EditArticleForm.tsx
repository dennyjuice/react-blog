import React from 'react';
// import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
// import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { useTypedSelector } from '../../hooks/useTypedSelector';
// import { getFullArticle } from '../../redux/actions/articles';
import { validationRules } from '../../helpers/constants';
import { IEditArticleForm } from '../../types/user';

import styles from './Forms.module.scss';

const EditArticleForm: React.FC = () => {
  const { isLoading } = useTypedSelector((state) => state.articles);
  const { register, handleSubmit, errors } = useForm<IEditArticleForm>();
  // const dispatch = useDispatch();

  // const { slug }: any = useParams();

  // useEffect(() => {
  //   if (!fullArticle) {
  //     dispatch(getFullArticle(slug));
  //   }
  // }, [slug, dispatch, fullArticle]);

  const onSubmit = () => {};

  return (
    <form className={cn(styles.form, styles.editArticle)} onSubmit={handleSubmit(onSubmit)}>
      <legend>Create new article</legend>

      <label>
        Title
        <input type="text" name="title" placeholder="Title" ref={register(validationRules.title)} />
        {errors.title && <span className={styles.error}>{errors.title.message}</span>}
        {/* {serverError && <span className={styles.error}>{serverError.title}</span>} */}
      </label>

      <label>
        Short description
        <input
          type="text"
          name="description"
          placeholder="Short description"
          ref={register(validationRules.desription)}
        />
        {errors.description && <span className={styles.error}>{errors.description.message}</span>}
        {/* {serverError && <span className={styles.error}>{serverError.description}</span>} */}
      </label>

      <label htmlFor="textarea">Text</label>
      <textarea
        className={styles.flexGrow}
        name="textarea"
        placeholder="Text"
        ref={register(validationRules.textarea)}
      />
      {errors.textarea && <span className={styles.error}>{errors.textarea.message}</span>}
      {/* {serverError && <span className={styles.error}>{serverError.textarea}</span>} */}

      <button type="submit" disabled={!!isLoading}>
        {isLoading ? <span className={styles.loading} /> : 'Send'}
      </button>
    </form>
  );
};

export default EditArticleForm;
