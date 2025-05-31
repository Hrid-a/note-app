import { LucideSettings } from 'lucide-react';
import * as React from 'react';
import styles from './Settings.module.css';
import clsx from 'clsx';

function Settings({className}: {className?: string}) {
  return <div className={clsx(styles.wrapper, className)}>
    <LucideSettings />
  </div>;
}

export default Settings;
