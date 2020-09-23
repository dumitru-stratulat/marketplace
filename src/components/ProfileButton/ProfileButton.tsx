import React, { useContext } from 'react'
import { AppContext, ContextProps } from 'context/AppContext'
import { User } from 'interfaces/interfaces';
import { Router } from 'next/router';
import Link from 'next/Link';

export default function ProfileButton() {
  const ctx: ContextProps | null = useContext(AppContext);
  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }

  return (
    <Link href='/profile/[id]' as={`/profile/${ctx.userDetails && ctx.userDetails.userId}`}>
      <a >
        Profile
    </a>
    </Link>
  )
}
