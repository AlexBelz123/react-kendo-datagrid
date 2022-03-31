import { useState, useContext } from 'react';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Checkbox } from '@progress/kendo-react-inputs';
import { KendoDialog, FormInput } from '../components';
import UserContext from '../providers/UserContext';
import { nonEmpty, isAlphaNumeric, isUnique } from './utils';

// checkbox label helper
const checkboxLabel = (value) => {
  const text = value ? 'Yes' : 'No';
  const color = value ? 'green' : 'red';
  return (
    <span>
      Enable: <span style={{ color }}>{text}</span>
    </span>
  );
};

// validators
const inputValidator = (value) =>
  nonEmpty(value) ? 'Please enter a text.' : '';

const usernameValidator = (value, users) => {
  // non empty
  if (nonEmpty(value)) return 'Enter a username';

  // alphanumeric
  if (isAlphaNumeric(value))
    return 'Enter only letters, numbers and underscores';

  // unique
  const usernames = users.map((user) => user.Username.toLowerCase());
  console.log(usernames);
  if (!isUnique(value, usernames)) return 'There is a user with this username!';

  return '';
};

const defaultValues = {
  username: '',
  firstname: '',
  lastname: '',
  enabled: false,
};

// reusable form for creating and editing user
const UserForm = ({ label, action, initialValues = defaultValues }) => {
  const max = 20;
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { users } = useContext(UserContext);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    await action(data);
    setSubmitting(false);
    toggleDialog();
  };

  // we can map fields based on initial values, but I did it in this way, cuz there is only one exception - username
  return (
    <>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
        onClick={toggleDialog}
      >
        {label}
      </button>
      <KendoDialog
        title="Please fill all inputs below"
        visible={visible}
        toggleDialog={toggleDialog}
        action={handleSubmit}
      >
        <Form
          initialValues={{ ...initialValues }}
          onSubmit={handleSubmit}
          render={(formRenderProps) => (
            <FormElement
              style={{
                width: 250,
                position: 'absolute',
              }}
            >
              <fieldset className={'k-form-fieldset'}>
                {initialValues.username && (
                  <Field
                    id={'username'}
                    name={'username'}
                    label={'Username:'}
                    max={max}
                    value={formRenderProps.valueGetter('username')}
                    hint={'Hint: Enter your username'}
                    component={FormInput}
                    validator={(value) => usernameValidator(value, users)}
                  />
                )}
                <Field
                  id={'firstname'}
                  name={'firstname'}
                  label={'Firstname:'}
                  max={max}
                  value={formRenderProps.valueGetter('firstname')}
                  hint={'Hint: Enter your firstname'}
                  component={FormInput}
                  validator={inputValidator}
                />
                <Field
                  id={'lastname'}
                  name={'lastname'}
                  label={'Lastname:'}
                  max={max}
                  value={formRenderProps.valueGetter('lastname')}
                  hint={'Hint: Enter your lastname'}
                  component={FormInput}
                  validator={inputValidator}
                />
                <Field
                  id={'enabled'}
                  name={'enabled'}
                  value={formRenderProps.valueGetter('enabled')}
                  label={checkboxLabel(formRenderProps.valueGetter('enabled'))}
                  component={Checkbox}
                />
              </fieldset>
              <div className="k-form-buttons">
                <button
                  onClick={toggleDialog}
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                >
                  Cancel
                </button>
                <button
                  type={'submit'}
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                  disabled={!formRenderProps.allowSubmit}
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </FormElement>
          )}
        />
      </KendoDialog>
    </>
  );
};

export default UserForm;
