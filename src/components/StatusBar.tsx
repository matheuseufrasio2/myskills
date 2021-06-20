import React from 'react';

import { StatusBar as StatusBarNative } from 'react-native';

export function StatusBar() {
  return <StatusBarNative backgroundColor='#121015' barStyle='light-content' />;
}