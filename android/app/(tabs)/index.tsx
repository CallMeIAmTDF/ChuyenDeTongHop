import * as React from 'react';
import MyTabs from '@/components/navigation/bottomTap.navigation';
import AppNavigation from '@/components/navigation/app.navigation';
import UserInfoScreen from './layout/userInfo';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google"
import { Button, Platform } from 'react-native';
import { makeRedirectUri } from 'expo-auth-session';
import { TextEncoder } from 'text-encoding'

const androidClientID = '830574544930-4dmbrvrteas9kamsu3s42scgn1ll08um.apps.googleusercontent.com';
globalThis.TextEncoder = TextEncoder;
WebBrowser.maybeCompleteAuthSession();

export default function App() {


  return (
    // <MyTabs/>
    <AppNavigation />
  );
}



