import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppButton, AppTextInput, ScreenContainer } from '../../components';
import { useAppTheme, useAuth } from '../../hooks';
import { RootStackParamList } from '../../types/navigation';
import { isValidEmail } from '../../utils';
import { useAuthStyles } from './styles';

type AuthMode = 'signIn' | 'signUp';
type AuthStep = 'name' | 'email' | 'password';
type AuthScreenProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;

type FormErrors = {
  email?: string;
  name?: string;
  password?: string;
};

type AuthStepContent = {
  buttonTitle: string;
  buttonVariant: 'contrast' | 'primary';
  keyboardType?: 'default' | 'email-address';
  placeholder: string;
  secureTextEntry?: boolean;
  step: AuthStep;
  title: string;
};

const getInitialStep = (mode: AuthMode): AuthStep => (mode === 'signUp' ? 'name' : 'email');

export const Auth = ({ navigation, route }: AuthScreenProps) => {
  const theme = useAppTheme();
  const styles = useAuthStyles(theme);
  const { isSubmitting, signIn, signUp } = useAuth();
  const initialMode = route.params?.mode ?? 'signIn';

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [step, setStep] = useState<AuthStep>(getInitialStep(initialMode));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  const clearErrors = () => {
    setFormError('');
    setFieldErrors({});
  };

  const handleModeChange = (nextMode: AuthMode) => {
    clearErrors();
    setMode(nextMode);
    setStep(getInitialStep(nextMode));
  };

  const getFieldError = (currentStep: AuthStep) => {
    if (currentStep === 'name' && name.trim().length === 0) {
      return 'Informe seu nome.';
    }

    if (currentStep === 'email' && !isValidEmail(email.trim().toLowerCase())) {
      return 'Informe um e-mail valido.';
    }

    if (currentStep === 'password' && password.trim().length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres.';
    }

    return undefined;
  };

  const handleContinue = () => {
    clearErrors();

    const nextError = getFieldError(step);

    if (nextError) {
      setFieldErrors({ [step]: nextError });
      return;
    }

    if (mode === 'signUp') {
      if (step === 'name') {
        setStep('email');
        return;
      }

      if (step === 'email') {
        setStep('password');
      }

      return;
    }

    if (step === 'email') {
      setStep('password');
    }
  };

  useEffect(() => {
    if (!route.params?.mode) {
      return;
    }

    handleModeChange(route.params.mode);
  }, [route.params?.mode]);

  const handleSubmit = async () => {
    clearErrors();

    const nameError = isSignUp ? getFieldError('name') : undefined;
    const emailError = getFieldError('email');
    const passwordError = getFieldError('password');

    if (nameError) {
      setStep('name');
      setFieldErrors({ name: nameError });
      return;
    }

    if (emailError) {
      setStep('email');
      setFieldErrors({ email: emailError });
      return;
    }

    if (passwordError) {
      setFieldErrors({ password: passwordError });
      return;
    }

    const payload = {
      email: email.trim().toLowerCase(),
      name: name.trim(),
      password: password.trim(),
    };

    try {
      if (mode === 'signIn') {
        await signIn({
          email: payload.email,
          password: payload.password,
        });
        return;
      }

      await signUp({
        email: payload.email,
        name: payload.name,
        password: payload.password,
      });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Nao foi possivel concluir a autenticacao.');
    }
  };

  const isSignUp = mode === 'signUp';
  const content: AuthStepContent = isSignUp
    ? step === 'name'
      ? {
          buttonTitle: 'Continuar',
          buttonVariant: 'contrast',
          placeholder: 'John Doe',
          step: 'name',
          title: 'Qual e o seu nome?',
        }
      : step === 'email'
        ? {
            buttonTitle: 'Continuar',
            buttonVariant: 'contrast',
            keyboardType: 'email-address',
            placeholder: 'johndoe@exemplo.com',
            step: 'email',
            title: 'Qual e o seu e-mail?',
          }
        : {
            buttonTitle: 'Criar conta',
            buttonVariant: 'primary',
            placeholder: '********',
            secureTextEntry: true,
            step: 'password',
            title: 'Qual e a sua senha?',
          }
    : step === 'email'
      ? {
          buttonTitle: 'Continuar',
          buttonVariant: 'contrast',
          keyboardType: 'email-address',
          placeholder: 'johndoe@exemplo.com',
          step: 'email',
          title: 'Qual e o seu e-mail?',
        }
      : {
          buttonTitle: 'Entrar',
          buttonVariant: 'primary',
          placeholder: '********',
          secureTextEntry: true,
          step: 'password',
          title: 'Qual e a sua senha?',
        };

  const currentValue = content.step === 'name' ? name : content.step === 'email' ? email : password;
  const currentError = fieldErrors[content.step];

  const handleBack = () => {
    clearErrors();

    if (isSignUp && step === 'password') {
      setStep('email');
      return;
    }

    if (isSignUp && step === 'email') {
      setStep('name');
      return;
    }

    if (!isSignUp && step === 'password') {
      setStep('email');
      return;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleChangeText = (value: string) => {
    clearErrors();

    if (content.step === 'name') {
      setName(value);
      return;
    }

    if (content.step === 'email') {
      setEmail(value);
      return;
    }

    setPassword(value);
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <View style={styles.screenContent}>
          <View style={styles.topSection}>
            <Pressable onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>{'<'}</Text>
            </Pressable>

            <View style={styles.heroCard}>
              <Text style={styles.title}>{content.title}</Text>
            </View>

            <View style={styles.fields}>
              <AppTextInput
                autoCapitalize={content.step === 'name' ? 'words' : 'none'}
                autoFocus
                errorMessage={currentError}
                key={content.step}
                keyboardType={content.keyboardType}
                label=''
                onChangeText={handleChangeText}
                onSubmitEditing={content.step === 'password' ? handleSubmit : handleContinue}
                placeholder={content.placeholder}
                returnKeyType={content.step === 'password' ? 'done' : 'next'}
                secureTextEntry={content.secureTextEntry}
                value={currentValue}
                variant='minimal'
              />
            </View>
          </View>

          <View style={styles.footer}>
            {formError ? <Text style={styles.formError}>{formError}</Text> : null}

            <AppButton
              loading={isSubmitting}
              onPress={content.step === 'password' ? handleSubmit : handleContinue}
              title={content.buttonTitle}
              variant={content.buttonVariant}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};
