import React from 'react';
import {
  FaHome,
  FaUserFriends,
  FaFolderOpen,
  FaCalendarAlt,
  FaWpforms,
} from 'react-icons/fa';
export const links = [
  {
    id: 1,
    url: '/dashboard',
    text: 'dashboard',
    icon: <FaHome />,
  },
  {
    id: 2,
    url: '/profile',
    text: 'profile',
    icon: <FaUserFriends />,
  },
  {
    id: 3,
    url: '/sms',
    text: 'sendSmS',
    icon: <FaWpforms />,
  },
  {
    id: 4,
    url: '/fund',
    text: 'fundAccount',
    icon: <FaWpforms />,
  },
  {
    id: 5,
    url: '/transactions',
    text: 'transactions',
    icon: <FaFolderOpen />,
  },
  {
    id: 6,
    url: '/kyc',
    text: 'kyc',
    icon: <FaCalendarAlt />,
  },
  {
    id: 7,
    url: '/setting',
    text: 'setting',
    icon: <FaWpforms />,
  },
  {
    id: 8,
    url: '/support',
    text: 'support',
    icon: <FaWpforms />,
  }
];
