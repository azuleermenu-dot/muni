import { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { requireSupabase } from '@/lib/supabase';
import { theme } from '@/constants/theme';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signup, setSignup] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!email.trim() || password.length < 6 || (signup && !name.trim())) {
      Alert.alert(
        'Check your details',
        signup
          ? 'Enter your name, email, and a password of at least 6 characters.'
          : 'Enter your email and a password of at least 6 characters.'
      );
      return;
    }

    setBusy(true);
    try {
      const supabase = requireSupabase();

      if (signup) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });
        if (error) throw error;

        if (data.user) {
          const { error: profileError } = await supabase.from('profiles').upsert({
            id: data.user.id,
            full_name: name.trim(),
            school: 'Minuyan National High School',
          });
          if (profileError) throw profileError;
        }

        Alert.alert(
          'Account created',
          data.session ? 'Welcome to MUNI!' : 'Check your email to confirm your account.',
          [{ text: 'OK', onPress: () => router.replace('/') }]
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        router.replace('/');
      }
    } catch (e) {
      Alert.alert('MUNI', e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.logo}>
        <Text style={styles.logoText}>M</Text>
      </View>
      <Text style={styles.brand}>MUNI</Text>
      <Text style={styles.tagline}>Your school. Your schedule. Your progress.</Text>
      <Text style={styles.title}>{signup ? 'Create your account' : 'Welcome back'}</Text>

      {signup && (
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Full name"
          placeholderTextColor={theme.muted}
          style={styles.input}
        />
      )}

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email address"
        placeholderTextColor={theme.muted}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor={theme.muted}
        secureTextEntry
        style={styles.input}
      />

      <Pressable disabled={busy} onPress={submit} style={styles.button}>
        {busy ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>{signup ? 'Create account' : 'Sign in'}</Text>
        )}
      </Pressable>

      <Pressable onPress={() => setSignup((v) => !v)}>
        <Text style={styles.switch}>
          {signup ? 'Already have an account? Sign in' : 'New to MUNI? Create an account'}
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 24,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: theme.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { color: 'white', fontSize: 34, fontWeight: '900' },
  brand: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '900',
    color: theme.ink,
    marginTop: 12,
  },
  tagline: { textAlign: 'center', color: theme.muted, marginBottom: 42 },
  title: { fontSize: 24, fontWeight: '900', color: theme.ink, marginBottom: 16 },
  input: {
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: theme.ink,
    marginBottom: 12,
  },
  button: {
    backgroundColor: theme.accent,
    borderRadius: 14,
    padding: 17,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '900' },
  switch: { textAlign: 'center', color: theme.accent, fontWeight: '800', marginTop: 20 },
});
