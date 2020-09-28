import React, { useState } from 'react';
import Link from 'next/link';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FileUploader from 'react-firebase-file-uploader';
import moment from 'moment';

import Dashboard from '../components/dashboard';

/**
 * material-ui
 */
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormLabel from '@material-ui/core/FormLabel';

/**
 * formik-material-ui
 */
import { TextField, Switch } from 'formik-material-ui';
import { DatePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from 'date-fns/locale/ja';

/**
 * firebase
 */
import firebase from '../firebase/clientApp';

/**
 * ラジオボタンをFormikで使うには一工夫
 */
const FormikRadioGroup = ({ field, form: { touched, errors }, name, options, ...props }) => {
  const fieldName = name || field.name;
  return (
    <>
      <RadioGroup {...field} {...props} name={fieldName} row>
        {options.map((option) => (
          <FormControlLabel value={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
      {touched[fieldName] && errors[fieldName] && <React.Fragment>{errors[fieldName]}</React.Fragment>}
    </>
  );
};

const WorkCRUDCreate = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avator, setAvator] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  //db登録
  const handleOnSubmit = async (values, actions) => {
    alert(JSON.stringify(values, null, 2));
    const docId = firebase.firestore().collection('members').doc().id;
    await firebase
      .firestore()
      .collection('members')
      .doc(docId)
      .set({
        docId: docId,
        email: values.email,
        area: values.area,
        gender: values.gender,
        birthday: firebase.firestore.Timestamp.fromDate(new Date(values.birthday)),
        avatarUrl: values.avatarUrl,
        agree: values.agree,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    actions.setSubmitting(false);
    alert('登録しました。');
  };

  //upload
  const handleUploadStart = () => {
    setIsUploading(true);
    setProgress(0);
  };
  const handleUploadError = (error) => setIsUploading(false);
  const handleUploadSuccess = async (filename) => {
    await setAvator(filename);
    await setIsUploading(false);
    const url = await firebase.storage().ref('images').child(filename).getDownloadURL();
    await setAvatarUrl(url);
    return url;
  };
  const handleProgress = (progress) => setProgress(progress);

  return (
    <Dashboard>
      <Typography component='h2' variant='h6'>
        新規登録
      </Typography>
      <Link href='/work-crud'>
        <Button color='primary'>一覧へ戻る</Button>
      </Link>
      <Paper>
        <Box p={2}>
          <Formik
            initialValues={{
              email: '',
              area: '',
              gender: '',
              birthday: moment(new Date()).format('YYYY/MM/DD'),
              avatarUrl: '',
              agree: '',
            }}
            onSubmit={(values, actions) => {
              handleOnSubmit(values, actions);
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email().required(),
              area: Yup.string().oneOf(['関東', '関西']).required(),
              gender: Yup.string().oneOf(['男', '女']).required(),
              avatarUrl: Yup.string().required(),
              agree: Yup.boolean().oneOf([true]).required(),
            })}>
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue, isSubmitting }) => (
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
                <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  {/* Emailとお住まいの地域 */}
                  <Box display='flex' flexWrap='wrap' alignItems='flex-start'>
                    <Box margin={1} width={250}>
                      <Field
                        component={TextField}
                        name='email'
                        type='email'
                        label='Email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                      />
                    </Box>
                    <Box margin={1} flexGrow={1}>
                      <Field
                        component={TextField}
                        label='お住まいの地域'
                        name='area'
                        helperText={errors.area}
                        value={values.area}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={Boolean(touched.area && errors.area)}
                        fullWidth
                      />
                    </Box>
                  </Box>

                  {/* 生年月日と性別 */}
                  <Box display='flex' flexWrap='wrap' alignItems='flex-start'>
                    <Box margin={1} display='inline-block'>
                      <Field
                        component={DatePicker}
                        name='birthday'
                        label='生年月日'
                        format='yyyy/MM/dd'
                        value={values.birthday}
                        onChange={(date) => setFieldValue('birthday', moment(date).format('YYYY/MM/DD'))}
                        okLabel='決定'
                        cancelLabel='キャンセル'
                      />
                    </Box>
                    <Box m={1} display='inline-block'>
                      <FormLabel component='legend'>性別</FormLabel>
                      <Field name='gender' component={FormikRadioGroup} options={['男', '女', 'その他']} />
                    </Box>
                  </Box>

                  {/* プロファイル画像 */}
                  <Box mx={1} my={2}>
                    <FormLabel component='legend' style={{ marginBottom: 5 }}>
                      プロファイル画像
                    </FormLabel>
                    {/* <FileUploader
                      accept='image/*'
                      name='avatarUrl'
                      randomizeFilename
                      storageRef={firebase.storage().ref('images')}
                      onUploadStart={handleUploadStart}
                      onUploadError={handleUploadError}
                      onUploadSuccess={async (filename) => {
                        const path = await handleUploadSuccess(filename); //ここもawaitにしないとurl取得できない
                        setFieldValue('avatarUrl', path); //値のセットとエラーの削除
                      }}
                      onProgress={handleProgress}
                    /> */}
                    <span className='text-danger small'>
                      {touched.avatarUrl && errors.avatarUrl ? errors.avatarUrl : null}
                    </span>
                    {isUploading ? <p>Uploading... {progress}%</p> : null}
                    {avatarUrl ? <img src={avatarUrl} width='120' alt='' className='my-2' /> : null}
                  </Box>

                  {/* 規約同意 */}
                  <Box m={1}>
                    <FormLabel component='legend'>規約に同意して下さい。</FormLabel>
                    <FormControlLabel
                      control={<Field component={Switch} type='checkbox' name='agree' onChange={handleChange} />}
                      label='同意します。'
                    />
                    {touched.agree && errors.agree ? errors.agree : null}
                  </Box>

                  {/* 登録ボタン */}
                  <Box m={1}>
                    <Button type='submit' variant='contained' color='primary' disabled={isSubmitting}>
                      {isSubmitting && <CircularProgress color='inherit' size={14} style={{ marginRight: 5 }} />}
                      登録する
                    </Button>
                  </Box>
                </Form>
              </MuiPickersUtilsProvider>
            )}
          </Formik>
        </Box>
      </Paper>
    </Dashboard>
  );
};

export default WorkCRUDCreate;
